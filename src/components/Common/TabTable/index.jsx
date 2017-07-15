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
    render() {
        const {
            loading,
            type,
            rows,
            tagType,
            columns,
            dataList,
            apdexTime,
            total
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
                        total={total}
                        changeRows={this.props.changeRows}
                    />
                </Spin>
                {dataList.length === 0 &&
                <div className={styles['tab-placeholder']}>
                    <h2>你还没有进行可视化埋点，无法查看埋点数据</h2>
                </div>}
            </div>
        );
    }
}