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
        onGetApps({
            pageSize: 100,
        }, 'appListMenu');
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
            platform,
            timeType,
            onChooseApp,
            onChoosePlatform,
            onChooseTimeType
        } = this.props.frameStore;
        const { appListMenu } = this.props.appListStore;
        const { panelList } = this.props.sidePanelStore;
        return (
            <div id="Frame">
                <Menu
                    appId={appId}
                    platform={platform}
                    appList={appListMenu}
                    chooseApp={onChooseApp}
                    choosePlatform={onChoosePlatform}
                />
                <div className="container">
                    <Crumb
                        module={module}
                    />
                    <HeaderBar
                        module={module}
                        timeType={timeType}
                        chooseTimeType={onChooseTimeType}
                    />
                    <div className="content" key={`${appId}_${platform}_${JSON.stringify(timeType)}`}>
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