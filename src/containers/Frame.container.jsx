import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import {
    Menu,
    Crumb,
    HeaderBar
} from '../components/Common';

@inject('frameStore')
@observer
class Frame extends React.Component {
    takeModuleName(path) {
        return path.substr(1, path.length - 1);
    }
    render() {
        const module = this.takeModuleName(this.props.location.pathname);
        const {
            appId,
            platform,
            timeType,
            onChoosePlatform,
            onChooseTimeType
        } = this.props.frameStore;
        return (
            <div id="Frame">
                <Menu 
                    appId={appId}
                    platform={platform}
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
                    <div className="content" key={`${platform}${timeType.type}${timeType.units}`}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Frame);