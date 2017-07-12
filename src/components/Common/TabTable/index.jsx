import React from 'react';
import { Tabs } from 'antd';
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
        this.props.changeTagType(tagType);
    }
    render() {
        const { 
            type, 
            tagType, 
            dataList
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
            </div>
            // <Tabs defaultActiveKey='0' onChange={this.changeTagType.bind(this)}>
            //     {config[type].map((item, index) => {
            //         return (
            //             <TabPane tab={item.tabName} key={`${index}`}>
            //                 <ControlBar 
            //                     type={type}
            //                     index={index}
            //                     changeColOptions={this.props.changeColOptions}
            //                 />
            //                 <Table
            //                     type={type}
            //                     tabIndex={index}
            //                     dataList={dataList}
            //                 />
            //             </TabPane>
            //         );
            //     })}
            // </Tabs>
        );
    }
}