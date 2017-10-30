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
        this.state = {
            tagType : 0
        }
    } 

    //这里的作用是，每次切换左侧导航栏时，都回到tabTable的第一个( 已标记 等等)
    componentDidMount(){
        // 不发送pageIndex，避免出现两次请求列表
        this.props.changeTagType(0);
    }

    changeTagType(tagType) {
        const { tagType: oldTagType, type } = this.props;
        if (oldTagType === tagType) {
            return false;
        }
        if(type == 'UserTable'){
            // 切换的时候，将searchKey还原成 'display_name'初始状态(只在用户轨迹列表的时候)
            this.props.onChangeSearchKey('display_name');
        }
        // 每次切换，表格都要取第一页的数据
        const pageIndex = 1 ;
        this.props.changeTagType(tagType,pageIndex);
        this.setState({
            tagType : tagType
        })
    }

    click(){
        return $('#pointButton')[0].click()
    }
    noData() {
        const { type } = this.props;
        switch(type) {
            case 'ErrorTable':
                if(this.state.tagType == 1){
                    // 已解决
                    return (
                        <div className={styles['tab-placeholder']}>
                            <h2>{locale('暂无数据')}</h2>
                        </div>
                    )
                }
                return (
                    <div className={styles['tab-placeholder']}>
                        <h2>{locale('暂时没发现错误哦，我们也支持自定义错误接入，请查阅帮助文档二次开发API的相关说明')}</h2>
                        <div className={styles['pointButton']}>
                            {/* <i className={cls("iconfont icon-maidian")}></i> */}
                            <a href={"/uem/help/23001_er_ci_kai_fa_xu_qiu.html"} target="_blank">{locale('查阅帮助')}</a>   
                        </div>
                    </div>
                );
            case 'UserTable':
                if(this.state.tagType == 1){
                    // 未登录
                    return (
                        <div className={styles['tab-placeholder']}>
                            <h2>{locale('暂无数据')}</h2>
                        </div>
                    )
                }
                return (
                    <div className={styles['tab-placeholder']}>
                        <h2>{locale('暂时没有用户哦，我们也支持接入真实用户，请查阅帮助文档二次开发API的相关说明')}</h2>
                        <div className={styles['pointButton']}>
                            {/* <i className={cls("iconfont icon-maidian")}></i> */}
                            <a href={'/uem/help/1apishuo_ming.html'} target="_blank">{locale('查阅帮助')}</a>   
                        </div>
                    </div>
                );
            default: 
                if(this.state.tagType == 1){
                    // 未标记
                    return (
                        <div className={styles['tab-placeholder']}>
                            <h2>{locale('暂无数据')}</h2>
                        </div>
                    )
                }
                return (
                    <div className={styles['tab-placeholder']}>
                        <h2>{locale("你还没有进行可视化埋点，无法查看埋点数据")}</h2>
                        <div className={styles['pointButton']} onClick={this.click.bind(this)} >
                        <a>{locale('马上埋点')}</a>
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
            dataStatus,
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
                        searchKey={this.props.searchKey}
                        getUserDefineColumn={this.props.getUserDefineColumn}
                        userDefinedColumn={this.props.userDefinedColumn}
                        onChangeSearchKey={this.props.onChangeSearchKey}
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
                        onChangeSortkey={this.props.onChangeSortkey}
                    />
                </Spin>
                {dataStatus === true && this.noData()}
            </div>
        );
    }
}