import React from 'react'

import Header from './Header.jsx'
import Navigation from './Navigation.jsx'

import '../../styles/less/monitor.less';

let Layout = React.createClass({
    render: function () {
        return (
            <div className={this.props.className}>
                <Header logo={this.props.logo} productId={this.props.productId} userId={this.props.userId} menu={this.props.userMenu ? this.props.userMenu : []}/>
                {this.props.sysMenu ? <Navigation rawItems={this.props.sysMenu}/> : null}
                <div id="main" ref="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default Layout;