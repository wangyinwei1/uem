import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import {
    Menu,
    Crumb
} from '../components/Frame';

@inject('frameStore')
@observer
class Frame extends React.Component {
    render() {
        return (
            <div id="Frame">
                <Menu 
                    appId={this.props.frameStore.appId}
                    platform={this.props.frameStore.platform}
                    choosePlatform={this.props.frameStore.choosePlatform}
                />
                <div className="container">
                    <Crumb
                        path={this.props.location.pathname}
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