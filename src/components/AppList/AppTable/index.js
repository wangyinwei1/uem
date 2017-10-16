import { Table, Menu, Dropdown, Modal } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import './index.scss';
import moment from 'moment';
import styles from './index';
import DelAppModal from '../AppItem/DelAppModal';
import {toJS} from 'mobx'
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
    constructor(props) {
        super(props);
        this.state = {
            showDelModal: false,
            // countDown: 3,
            confirmLoading: false,
            seconds: 5
        };
        this.toggleDelAppModal = this.toggleDelAppModal.bind(this)
        let currentRecord = {};
        this.timer = null;
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    toggleDelAppModal(visible) {
        this.setState({
            showDelAppModal: visible,
            seconds: 5
        });
        if (visible) {
            let seconds = 5;
            this.timer = setInterval(() => {
                if (seconds > 0) {
                    this.setState({
                        seconds: --seconds
                    })
                } else {
                    clearInterval(this.timer)
                }
            }, 1000)

        } else {
            this.timer && clearInterval(this.timer)
        }
    }
    getColumns() {
        return [{
            title: locale('应用名称'),
            dataIndex: 'appName',
            key: 'appName',
            render: function (appName) {
                const type = typeof appName
                let show = (type === 'number' || type === 'string') ? appName : '--'
                return <span>{show}</span>;
            }
        }, {
            title: locale('访问用户'),
            dataIndex: 'uv',
            key: 'uv',
            render(uv) {
                const type = typeof uv;
                let show = (type === 'number' || type === 'string') ? uv : '--';
                return <span>{show}</span>;
            }
        }, {
            title: locale('操作数'),
            dataIndex: 'operCount',
            key: 'operCount',
            render(operCount) {
                const type = typeof operCount
                let show = (type === 'number' || type === 'string') ? operCount : '--'
                return <span>{show}</span>;
            }
        },
        {
            title: locale('错误数'),
            dataIndex: 'errorCount',
            key: 'errorCount',
            render(errorCount) {
                const type = typeof errorCount;
                let show = (type === 'number' || type === 'string') ? errorCount : '--'
                return <span>{show}</span>;
            }
        },
        {
            title: locale('状态'),
            dataIndex: 'status',
            key: 'status',
            render(status) {
                const statusMap = {
                    '-1': locale('未部署'),
                    '0': locale('未监控'),
                    '1': locale('监控中')
                }
                return <span>{statusMap[status]}</span>;
            }
        },
        {
            title: locale('创建时间'),
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                const type = typeof createTime;
                let show = (type === 'number' || type === 'string') ? moment(createTime).format("YYYY/MM/DD") : '--'
                return <span>{show}</span>;
            }
        },
        {
            title: locale('操作'),
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
                                        <div className="set-list" key={val.action} action={val.action} onClick={this.handelByApp.bind(this, action, dataIndex, record)}>{locale(val.name)}</div>
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

    confirmDeleteApp() {
        // this.props.delApp({ appId: this.currentRecord.appId }).then(res => { setTimeout( ()=> {
        //         this.setState({
        //         showDelModal: false
        //     });}, 5000)  
        // })

        // if(this.state.showDelModal){
        //     setInterval( () => {
        //     if(this.state.countDown > 0) {
        //           this.setState({countDown: --this.state.countDown})
        //     }else {
        //           this.setState({ showDelModal: false })
        //           clearInterval()
        //     }
        // },1000)}
        const { delApp, setAppInfo } = this.props;
        delApp({
            appId: this.currentRecord.appId
        }).then(res => {
            this.setState({
                showDelAppModal: false
            });
            setAppInfo(null)
        });
        // this.setState({ confirmLoading: true })
        // setTimeout(() => {
        //     this.setState({
        //         showDelModal: false,
        //         confirmLoading: false,
        //     }, () => this.props.delApp({ appId: this.currentRecord.appId }));
        // }, 1000);
    }

    cancelDeleteApp() {
        this.setState({
            showDelModal: false,
        });
    }

    handelByApp(action, index, record, e) {
        /**
         *  '删除应用','停止监控','应用部署'，'启动监控'
         */

        this.currentRecord = record;
        if (action === 'deleteAppConfirm') {
            // this.setState({
            //     showDelModal: true
            // });
            this.toggleDelAppModal(true)
        }
        if (action === 'startApp' || 'stopApp') {
            // stopPropagation();
            this.props.updateApp({
                appId: record.appId,
                status: record.status == 0 ? 1 : 0
            })
        }
        if (action === 'deployApp') {
            this.context.router.history.push('/setting');
        }
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
    }
    saveAccessRecord(data) {

    }
    render() {
        const { data } = this.props;
        return (
            <div>
                <Table
                    dataSource={toJS(data)}
                    onRowClick={this.onRowClick.bind(this)}
                    columns={this.getColumns()}
                    pagination={false}
                    rowKey={record => record.appId}
                />
                {/* <Modal
                    className={styles['confirm_modal']}  
                    title={locale('确认删除？')}
                    visible={this.state.showDelModal}  
                    onCancel={this.cancelDeleteApp.bind(this)}
                    onOk={this.confirmDeleteApp.bind(this)}
                    confirmLoading={this.state.confirmLoading} 
                    okText={locale('确认')}
                    cancelText={locale('取消')}
                    >
                    <div className='info-wrapper'>
                        
                    </div>
                </Modal>     */}
                <DelAppModal
                    showDelAppModal={this.state.showDelAppModal}
                    seconds={this.state.seconds}
                    toggleDelAppModal={this.toggleDelAppModal}
                    delApp={this.confirmDeleteApp.bind(this)}
                />
            </div>
        )
    }
    componentDidMount() {

    }
}
AppTable.contextTypes = {
    router: React.PropTypes.object.isRequired
};
module.exports = AppTable;
