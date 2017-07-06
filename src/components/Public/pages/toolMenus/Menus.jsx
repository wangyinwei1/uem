import React from 'react'
import {Link} from 'react-router';
import { Menu, Dropdown, Badge} from 'antd';
require('../../common/jquery.cookie');
require('../../components/MomentPicker/FormatDate');

export default React.createClass({
    getInitialState() {
        return {
            menuList: [{
                icon:'message-icon',
                url:'javascript:void(0)',
                m:""
            },{
                icon:'quest-answer-icon',
                url:'javascript:void(0)',
                 m:(<Menu>
                    <Menu.Item key="0">
                        <a target="_blank" href="/workorder/request/new/">提问题</a>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <a target="_blank" href='/workorder/request/listview/'>查看问题列表</a>
                    </Menu.Item>
                </Menu>)
            },{
                icon:'home-icon',
                url:'/portal/index.html',
                 m:(<Menu></Menu>)
            }],
            count:10,
            list:[],
            mesgWords:'查看全部消息'
        }
    },

    componentWillMount() {
        //查询指定用户的未读收信记录数量
        //
        let userId = $.cookie('userId');

        $.ajax({
            url: '/notify/api/v1/imsgs/unread/'+userId+'/count',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'get',
            dataType: 'json',
            success: function (data) {
               this.setState({
                    count:data
               });
                if (data > 0) {
                    $.ajax({
                        url: '/notify/api/v1/imsgs/received/'+userId,
                        data: {
                            status:'UNREAD',
                            pageNum:1,
                            pageSize:5
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        type: 'get',
                        dataType: 'json',
                        success: function (data) {
                            this.setState({
                                list:data.dataList
                            });
                            if(data.dataList.length == 0)
                                this.setState({
                                    mesgWords:'暂无新消息'
                                });
                        }.bind(this)
                    });
                }
            }.bind(this)
        });
    },

    formate(value) {
        var description;
        switch (value) {         
          case 1001:
          description = "Monitor";
          break;
          case 1002:
          description = "Web";
          break;
          case 1003:
          description = "Mobile";
          break;
          case 1004:
          description = "CMDB";
          break;
          case 1005:
          description = "Automation";
          break;
          case 1006:
          description = "APM";
          break;
          case 9999:
          description = "站点消息";
          break;
        }
        return description;
    },

    goAhead() {
        window.location.href = "/tenant/#/newsList";
    },

    render() {
        const menu = (
            <Menu>
                {
                    this.state.list.map(function(value,_index){
                        return <Menu.Item key={_index}>
                                    <Link to="https://uyun.cn/tenant/#/newsList">
                                        <div target="_blank" className="mesg-content" onClick={this.goAhead}>
                                            <div>
                                                <span>{value.content}</span>
                                                <span className="detail">查看详情</span>
                                            </div>
                                            <div>
                                                <span className="left">{this.formate(value.source)}</span>
                                                <span className="right">{new Date(value.sendDate).Format("YYYY/MM/dd hh:mm")}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                    }.bind(this))
                }
                <Menu.Item key="5">
                   <div target="_blank" className="mesg-content-more" onClick={this.goAhead} >{this.state.mesgWords}</div>
                </Menu.Item>
            </Menu>
        );
        return (
            <ul>
                {
                    this.state.menuList.map(function(v,_index){
                        return <li key={_index}>
                                <Dropdown overlay={v.m || menu} getPopupContainer={parent => parent}>
                                    <a target="_blank" className="menu-list" href={v.url}>
                                        {_index == 0 ? this.state.count > 0?<Badge count={this.state.count}><i className={v.icon}></i></Badge>
                                        :<i className={v.icon}></i>
                                        :<i className={v.icon}></i>}
                                    </a>
                                </Dropdown>
                            </li>
                    }.bind(this))
                }
            </ul>
        )
    }
});