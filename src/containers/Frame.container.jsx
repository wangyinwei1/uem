import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import {
    Menu,
    Crumb,
    HeaderBar,
    SidePanel,
} from '../components/Common';

@inject('frameStore', 'sidePanelStore', 'appListStore', 'settingStore')
@observer
class Frame extends React.Component {
    componentDidMount() {
        const { onGetApps } = this.props.appListStore;
        const { onGetAppInfomation } = this.props.frameStore;
        onGetApps({
            pageSize: 100,
        }, 'appListMenu');
        onGetAppInfomation();
    }
    componentWillReceiveProps(nextProps) {
    }
    takeModuleName(path) {
        return path.substr(1, path.length - 1);
    }
    render() {
        const module = this.takeModuleName(this.props.location.pathname);
        const {
            appId,
            appInfo,
            platform,
            timeType,
            appAllVersions,
            onChooseApp,
            appVersion,
            onChoosePlatform,
            onChooseTimeType,
            onChooseVersion,
            onGetAppVersion,
        } = this.props.frameStore;
        const { appListMenu, onAddApp } = this.props.appListStore;
        const { panelList } = this.props.sidePanelStore;
        const { versionSettings, getVersionSettings } = this.props.settingStore;
        return (
            <div id="Frame">
                <Menu
                    appId={appId}
                    addApp={onAddApp}
                    platform={platform}
                    appList={appListMenu}
                    chooseApp={onChooseApp}
                    choosePlatform={onChoosePlatform}
                    appInfo={appInfo}
                />
                <div className="container">
                    <Crumb
                        module={module}
                    />
                    <HeaderBar
                        module={module}
                        timeType={timeType}
                        chooseTimeType={onChooseTimeType}
                        appAllVersions={appAllVersions}
                        onGetAppVersion={onGetAppVersion}
                        onChooseVersion={onChooseVersion}
                        platform={platform}
                    />
                    <div className="content" key={`${appId}_${platform}_${JSON.stringify(timeType)}_${appVersion}`}>
                        {this.props.children}
                    </div>
                    <SidePanel
                        module={module}
                        panelList={panelList}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Frame);