import React from 'react';
import { Tabs } from 'antd';
import { DeployInstruction, ParamSetting, UserDataModel } from '../components/Setting';
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
        const { appInfo, updateAppInfo, updateAppInfoOnFront, sendEmail } = this.props.settingStore;
        const deployProps = { appInfo, updateAppInfo, updateAppInfoOnFront, sendEmail };
        const platform = sessionStorage.getItem('UEM_platform');
        return (
            <div id="Setting">
                <Tabs defaultActiveKey="2" animated={false}>
                    <TabPane tab="部署说明" key="1">
                        {platform === 'pc' ? <DeployInstruction {...deployProps} /> : null}
                    </TabPane>
                    <TabPane tab="参数设置" key="2">
                        {platform === 'pc' ? <ParamSetting /> : null}
                    </TabPane>
                    <TabPane tab="用户数据模型" key="3">
                        {platform === 'pc' ? <UserDataModel /> : null}
                    </TabPane>
                    {
                        platform === 'pc' ? null :
                            <TabPane tab="版本设置" key="4"></TabPane>
                    }
                </Tabs>
            </div>
        );
    }
}