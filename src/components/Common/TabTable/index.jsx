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
    render() {
        const { type } = this.props;
        return (
            <Tabs defaultActiveKey="0" onChange={null}>
                {config[type].map((item, index) => {
                    return (
                        <TabPane tab={item.tabName} key={index}>
                            <ControlBar 
                                type={type}
                                index={index}
                            />
                            <Table 
                                type={type}
                                tabIndex={index}
                            />
                        </TabPane>
                    );
                })}
            </Tabs>
        );
    }
}