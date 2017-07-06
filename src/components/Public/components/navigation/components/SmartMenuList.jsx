import React from 'react'

import classnames from 'classnames'
import NavigationActions from './../actions/NavigationActions.js'
import SmartMenuItem from './SmartMenuItem.jsx'
import _ from 'lodash'


let SmartMenuList = React.createClass({
    componentDidMount: function () {
        window.addEventListener("hashchange", function () {
            //var router = location.hash.match("\/{1}[^:\/]*|\/{1}").toString();
            _.map(this.props.items, function (item) {
                if (location.hash.indexOf(item.route)>-1) {
                    NavigationActions.activate(item);
                }
            });
        }.bind(this));
    },
    render: function () {
        return (
            <ul>
                {_.map(this.props.items, function (item) {
                    return <SmartMenuItem item={item} key={item._id}/>
                }.bind(this))}
            </ul>
        )
    }
});

export default SmartMenuList