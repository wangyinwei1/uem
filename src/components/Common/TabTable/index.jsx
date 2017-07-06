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
    changeTab(key) {
        const tagType = key === '0'
            ? 'marked'
            : 'unmarked';
        this.props.onChangeTagType({
            tagType
        });
    }
    render() {
        const { type, dataList } = this.props;
        return (
            <Tabs defaultActiveKey="0" onChange={this.changeTab.bind(this)}>
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
                                dataList={dataList}
                            />
                        </TabPane>
                    );
                })}
            </Tabs>
        );
    }
}