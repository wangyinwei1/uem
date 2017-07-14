import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import {
    Menu,
    Crumb,
    HeaderBar
} from '../components/Common';

@inject('frameStore', 'appListStore', 'settingStore')
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
                    <div className="content" key={`${appId}${platform}${timeType.type}${timeType.units}`}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Frame);