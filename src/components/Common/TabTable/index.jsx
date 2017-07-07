import React from 'react';
import { Tabs } from 'antd';
import config from './config';
import ControlBar from './ControlBar';
import Table from './Table';

const TabPane = Tabs.TabPane;

export default class TabTable extends React.Component {
    constructor(props) {
        super(props);
    }
    changeTagType(key) {
        this.props.changeTagType(key);
    }
    render() {
        const { type, dataList } = this.props;
        return (
            <Tabs defaultActiveKey='0' onChange={this.changeTagType.bind(this)}>
                {config[type].map((item, index) => {
                    return (
                        <TabPane tab={item.tabName} key={index}>
                            <ControlBar 
                                type={type}
                                index={index}
                                changeColOptions={this.props.changeColOptions}
                            />
                            <Table 
                                type={type}
                                tabIndex={index}
                                dataList={dataList}
                            />
                        </TabPane>
                    );
                })}
            </Tabs>
        );
    }
}