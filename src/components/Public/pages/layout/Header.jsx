import React from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd'
import QueueAnim from 'rc-queue-anim';
import UserInfo from '../../pages/user/UserInfo.jsx'
import Menus from '../../pages/toolMenus/Menus.jsx'
let ProductMenu = require('../../config/product.json').data;

let Header = React.createClass({
    getInitialState: function () {
        return {
            lists: null,
            show: false,
            isClick: false,
            username: null
        }
    },
    handleMouseOver: function () {
        this.setState({isHover: true});
    },
    handleMouseOut: function () {
        this.setState({isHover: false});
    },
    handleExpand: function (e) {
        this.setState({
            isClick: !this.state.isClick,
            show: !this.state.show
        });
    },
    isActive: function (index) {
        return this.props.productId == index ? 'active' : '';
    },
    componentDidMount: function () {
        $.ajax({
            url: '/tenant/api/v1/user/details/view',
            data: {userId: $.cookie('userId')},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                this.setState({username: data.data.realname})
            }.bind(this)
        });
        $.ajax({
            url: '/tenant/api/v1/product/listAll',
            //url: 'mock/product.json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                this.setState({lists: data.data})
            }.bind(this)
        })
    },
    _getDescription: function (productNum) {
        var description;
        switch (parseInt(productNum)) {
            case 1001:
                description = '系统监控';
                break;
            case 1002:
                description = 'Web应用体验监控';
                break;
            case 1003:
                description = '移动端APP体验监控';
                break;
            case 1004:
                description = '配置管理库';
                break;
            case 1005:
                description = '自动化交付';
                break;
            case 1006:
                description = '应用性能监测';
                break;
            default:
                description = '';
                break;
        }
        return description;
    },
    render: function () {
        const list = this.state.show ? <div key="a">
            <ul className="product">
                {_.map(this.state.lists, function (list, index) {
                    const description = this._getDescription(list.productNum);
                    if (list.productNum == '1004') {
                        return null;
                    } else if (list.productNum == '1005') {
                        return null;
                    } else {
                        return <li key={index} className={this.isActive(list.productNum)}><a href={list.productUrl}><h2>{list.productName}</h2><p>{description}</p></a></li>;
                    }
                }.bind(this))}
            </ul>
        </div> : null;
        const current = !this.state.show ?  _.map(this.state.lists, function (item, index) {
            if (item.productNum == this.props.productId) {
                return <div key={index} className="current"><h2>{item.productName}</h2><p>{this._getDescription(item.productNum)}</p></div>
            }
        }.bind(this)) : null;
        return (
            <header id="header" className="header">
                <div id="logo-group" className={this.state.isClick ? 'click' : 'un-click'}>
                    <a id="logo" href="https://uyun.cn/tenant/#/"></a>
                    <span className="arrow-right" onClick={this.handleExpand}></span>
                </div>
                {current}
                <QueueAnim type={['left', 'left']}
                           ease={['easeOutQuart', 'easeInOutQuart']}>
                    {list}
                </QueueAnim>
                {this.state.username ? <UserInfo username={this.state.username} menu={this.props.menu}/> : null }
                {this.state.username ? <Menus /> : null }
            </header>
        );
    }
});

export default Header;