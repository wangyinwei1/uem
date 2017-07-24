import { Table, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import './index.scss';
import moment from 'moment';
const setList = {
    0: [{
        name: '删除应用',
        action: 'deleteAppConfirm'
    }, {
        name: '启动监控',
        action: 'startApp'
    }, {
        name: '应用部署',
        action: 'deployApp'
    }],
    1: [{
        name: '删除应用',
        action: 'deleteAppConfirm'
    }, {
        name: '停止监控',
        action: 'stopApp'
    }, {
        name: '应用部署',
        action: 'deployApp'
    }]
};
function stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
    }
}
class AppTable extends React.Component {
    defaultProps = {
        data: []
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    getColumns() {
        return [{
            title: '应用名称',
            dataIndex: 'appName',
            key: 'appName',
            render: function (appName) {
                const type = typeof appName
                let show = (type === 'number' || type === 'string') ? appName : '--'
                return <span>{show}</span>;
            }
        }, {
            title: '访问用户',
            dataIndex: 'uv',
            key: 'uv',
            render(uv) {
                const type = typeof uv;
                let show = (type === 'number' || type === 'string') ? uv : '--';
                return <span>{show}</span>;
            }
        }, {
            title: '操作数',
            dataIndex: 'operCount',
            key: 'operCount',
            render(operCount) {
                const type = typeof operCount
                let show = (type === 'number' || type === 'string') ? operCount : '--'
                return <span>{show}</span>;
            }
        },
        {
            title: '错误数',
            dataIndex: 'errorCount',
            key: 'errorCount',
            render(errorCount) {
                const type = typeof errorCount;
                let show = (type === 'number' || type === 'string') ? errorCount : '--'
                return <span>{show}</span>;
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                const statusMap = {
                    '-1': '未部署',
                    '0': '未监控',
                    '1': '监控中'
                }
                return <span>{statusMap[status]}</span>;
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                const type = typeof createTime;
                let show = (type === 'number' || type === 'string') ? moment(createTime).format("YYYY/MM/DD") : '--'
                return <span>{show}</span>;
            }
        },
        {
            title: '操作',
            key: 'oper',
            render: function (oper, record, dataIndex) {
                const status = record.status;
                const curSetList = setList[status];
                const menu = (
                    <Menu className='app-table-dropdown'>
                        {
                            /* 给设置加入选项 */
                            curSetList.map((val, index) => {
                                const { action } = val;
                                return (
                                    <Menu.Item key={index}>
                                        <div className="set-list" key={val.action} action={val.action} onClick={this.handelByApp.bind(this, action, dataIndex)}>{val.name}</div>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                )
                return (
                    <div onClick={stopPropagation}>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <div className='oper-wrapper'>
                                <div className='set'>
                                    <i className='fa fa-cog'></i>
                                    <i className='fa fa-caret-down'></i>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                )
            }.bind(this)
        }]
    }
    handelByApp(action, index, e) {
        /**
         *  '删除应用','停止监控','应用部署'
         *  返回索引
         */
    }
    componentWillUnmount() {
        $('body').unbind('.appTableOperDropdown');
    }
    handelopenByApp(e) {
        e.preventDefault();
        let $target = $(e.target), $operWrapper;
        $operWrapper = $target.hasClass('oper-wrapper') ? $target : $target.closest('.oper-wrapper');
        const isHasClass = $operWrapper.hasClass('active');
        $('.oper-wrapper.active').removeClass("active");
        isHasClass ? $operWrapper.removeClass("active") : $operWrapper.addClass("active");
    }
    componentWillMount() {
        $('body').on('click.appTableOperDropdown', function (e) {
            let $target = $(e.target);
            if ($target.hasClass('oper-wrapper') || $target.closest('.oper-wrapper').length > 0) {
                return;
            } else {
                $('.oper-wrapper.active').removeClass("active");
            }

        }.bind(this))
    }
    componentDidMount() {

    }
    onRowClick(record, index) {   
        const { chooseApp, choosePlatform } = this.props;
        chooseApp({
            appId: record.appId
        });
        switch (true) {
            case record.appUse['pc']:
                choosePlatform({
                    platform: 'pc'
                });
                break;
            case record.appUse['ios']:
                choosePlatform({
                    platform: 'ios'
                });
                break;
            case record.appUse['android']:
                choosePlatform({
                    platform: 'android'
                });
                break;
            default:
                choosePlatform({
                    platform: 'pc'
                });
        }
        this.context.router.history.push('/overview');
        console.log('[this.context.router]:',this.context.router);
    
        // this.context.router.push({
        //     pathname: '/overview',
        //     query: {
        //         appId: record.appId,
        //         module: 'overview',
        //         theme: 'blue'
        //     }
        // });


    }
    saveAccessRecord(data) {

    }
    render() {
        const data = this.props.data;
        return (
            <Table
                dataSource={data}
                onRowClick={this.onRowClick.bind(this)}
                columns={this.getColumns()}
                pagination={false}
                rowKey={record => record.appId}
                className='common-tab apps-table' />
        )
    }
    componentDidMount() {

    }
}
AppTable.contextTypes = {
    router: React.PropTypes.object.isRequired
};
module.exports = AppTable;
