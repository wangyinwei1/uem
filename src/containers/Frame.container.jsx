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
        return (
            <div id="Frame">
                <Menu 
                    appId={this.props.frameStore.appId}
                    platform={this.props.frameStore.platform}
                    choosePlatform={this.props.frameStore.onChoosePlatform}
                />
                <div className="container">
                    <Crumb
                        module={module}
                    />
                    <HeaderBar 
                        module={module}
                        timeType={this.props.frameStore.timeType}
                        chooseTimeType={this.props.frameStore.onChooseTimeType}
                    />
                    <div className="content" key={this.props.frameStore.platform}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Frame);