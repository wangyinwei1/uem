import React from 'react';
import { Tabs } from 'antd';
import { DeployInstruction } from '../components/Setting';
import { observer, inject } from 'mobx-react';

const TabPane = Tabs.TabPane;

@inject('settingStore')
@observer
export default class Setting extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getAppInfo } = this.props.settingStore;
        getAppInfo();
    }

    render() {
        const { appInfo, updateAppInfo, updateAppInfoOnFront } = this.props.settingStore;
        const deployProps = { appInfo, updateAppInfo, updateAppInfoOnFront };
        return (
            <div id="Setting">
                <Tabs defaultActiveKey="1" animated={false}>
                    <TabPane tab="部署说明" key="1">
                        <DeployInstruction {...deployProps} />
                    </TabPane>
                    <TabPane tab="参数设置" key="2">2</TabPane>
                    <TabPane tab="用户数据模型" key="3">3</TabPane>
                </Tabs>
            </div>
        );
    }
}