import React from 'react'
import {Link} from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
require('../../common/jquery.cookie');

let LoginInfo = React.createClass({
    handleLogout: function () {

    },
    render: function () {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a target="_blank" href={`/tenant/#/userProfile/${$.cookie('userId')}`}>用户信息</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <a  href='/tenant/#/logout'>退出</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu} getPopupContainer={parent => parent}>
                <a className="user-group" id="user" href="#">
                    <i className="user-icon"></i>
                    <span className="user-name">{this.props.username}</span>
                    <i className="fa fa-lg fa-angle-down"></i>
                </a>
            </Dropdown>
        )
    }
});

export default LoginInfo;