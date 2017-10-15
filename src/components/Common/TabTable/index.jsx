import React from 'react';
import { Tabs, Spin } from 'antd';
import config from './config';
import ControlBar from './ControlBar';
import Table from './Table';

import styles from './index.scss';

const TabPane = Tabs.TabPane;

export default class TabTable extends React.Component {
    constructor(props) {
        super(props);
    }
    changeTagType(tagType) {
        const { tagType: oldTagType } = this.props;
        if (oldTagType === tagType) {
            return false;
        }
        this.props.changeTagType(tagType);
    }

    click(){
        return $('#pointButton')[0].click()
    }
    noData() {
        const { type } = this.props;
        switch(type) {
            case 'ErrorTable':
                return (
                    <div className={styles['tab-placeholder']}>
                        <h2>{locale('暂时没发现错误哦，我们也支持自定义错误接入，请查阅帮助文档二次开发API的相关说明')}</h2>
                        <div className={styles['pointButton']}>
                            {/* <i className={cls("iconfont icon-maidian")}></i> */}
                            <a href={"src/help/23001_er_ci_kai_fa_xu_qiu.html"} target="_blank">{locale('查阅帮助')}</a>   
                        </div>
                    </div>
                );
            case 'UserTable':
                return (
                    <div className={styles['tab-placeholder']}>
                        <h2>{locale('暂时没有用户哦，我们也支持接入真实用户，请查阅帮助文档二次开发API的相关说明')}</h2>
                        <div className={styles['pointButton']}>
                            {/* <i className={cls("iconfont icon-maidian")}></i> */}
                            <a href={'src/help/1apishuo_ming.html'} target="_blank">{locale('查阅帮助')}</a>   
                        </div>
                    </div>
                );
            default: 
                return (
                    <div className={styles['tab-placeholder']}>
                        <h2>{locale('你还没有进行可视化埋点，无法查看埋点数据')}</h2>
                        <div className={styles['pointButton']} onClick={this.click.bind(this)} >
                        <a onclick="document.querySelector('#pointButton').click()">{locale('马上埋点')}</a>
                        </div>
                    </div>
                );   
        }
        
    }
    render() {
        const {
            loading,
            type,
            rows,
            tagType,
            columns,
            dataList,
            apdexTime,
            total,
            pageIndex,
            pageSize,
        } = this.props;
        return (
            <div className={styles['tab-table']}>
                <div className={styles['tab-header']}>
                    {config[type].map((item, index) =>
                        <a href="javascript:;" key={item.tabName} className={cls('btn', {
                            [styles['tab-active']]: tagType === index
                        })} onClick={this.changeTagType.bind(this, index)}>{item.tabName}</a>
                    )}
                </div>
                <Spin spinning={loading}>
                    <ControlBar
                        type={type}
                        columns={columns}
                        apdexTime={apdexTime}
                        rows={rows}
                        tagType={tagType}
                        changeColOptions={this.props.changeColOptions}
                        changeResTime={this.props.changeResTime}
                        resolveRow={this.props.resolveRow}
                        search={this.props.search}
                    />
                    <Table
                        type={type}
                        columns={columns}
                        tagType={tagType}
                        dataList={dataList}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        total={total}
                        changeRows={this.props.changeRows}
                        changePanelList={this.props.changePanelList}
                        changePage={this.props.changePage}
                    />
                </Spin>
                {dataList.length === 0 && this.noData()}
            </div>
        );
    }
}