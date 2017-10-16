import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import styles from './index.scss';
import DelAppModal from './DelAppModal';

export default class AppItem extends React.PureComponent {
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        showDelAppModal: false,
        // 倒计时的秒数
        seconds: 5
    }
    statusText = {
        '-1': '未部署',
        '0': '未监控',
        '1': '监控中'
    }
    timer = null;
    constructor(props) {
        super(props);
        this.toggleDelAppModal = this.toggleDelAppModal.bind(this)
    }
    noEvent(e) {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }
    toggleOptionList(appId, e) {
        this.noEvent(e);
        this.props.toggleOptionList(appId);
    }
    toggleDelAppModal(visible, e) {
        this.noEvent(e);
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
    updateApp(status, e) {
        this.noEvent(e);
        this.props.updateApp({
            appId: this.props.currentAppId,
            status: status === 1 ? 0 : 1
        });
    }
    deployApp(e) {
        this.noEvent(e);
    }
    delApp() {
        const { delApp, setAppInfo } = this.props;
        delApp({
            appId: this.props.currentAppId
        }).then(res => {
            this.setState({
                showDelAppModal: false
            });
            setAppInfo(null)
        });
    }
    deployApp(e) {
        this.noEvent(e);
        this.context.router.history.push('/setting');
    }
    enterApp() {
        const { itemAppId, appUse, chooseApp, choosePlatform } = this.props;
        chooseApp({
            appId: itemAppId
        });
        switch (true) {
            case appUse['pc']:
                choosePlatform({
                    platform: 'pc'
                });
                break;
            case appUse['ios']:
                choosePlatform({
                    platform: 'ios'
                });
                break;
            case appUse['android']:
                choosePlatform({
                    platform: 'android'
                });
                break;
            default:
                choosePlatform({
                    platform: 'pc'
                });
        }
    }
    render() {
        const { showDelAppModal, seconds } = this.state;
        return (
            <li className={styles['app-item']} onClick={this.enterApp.bind(this)}>
                <Link to='/overview'>
                    <dl>
                        <dt className={styles['title']}>
                            <i className={cls(
                                styles['tag'],
                                styles[`tag-${this.props.status}`]
                            )}>{locale(this.statusText[this.props.status])}</i>
                            <span>{this.props.title}</span>
                            <i className={cls('fa fa-cog', styles['option'], {
                                [styles['active']]: this.props.currentAppId === this.props.itemAppId
                            })} onClick={this.toggleOptionList.bind(this, this.props.itemAppId)}></i>
                            <ul className={cls(styles['list'], {
                                [styles['active']]: this.props.currentAppId === this.props.itemAppId
                            })}>
                                <li onClick={(e) => this.toggleDelAppModal(true, e)}>{locale('删除应用')}</li>
                                <li onClick={this.updateApp.bind(this, this.props.status)}>
                                    {this.props.status === 1
                                        ? locale('停止监控')
                                        : locale('启动监控')}
                                </li>
                                <li onClick={this.deployApp.bind(this)}>{locale('应用部署')}</li>
                            </ul>
                        </dt>
                        <dd className={styles['content']}>
                            <dl>
                                <dt>{locale('访问用户')}</dt>
                                <dd>{this.props.uv}</dd>
                            </dl>
                            <dl>
                                <dt>{locale('点击数')}</dt>
                                <dd>{this.props.clickNum}</dd>
                            </dl>
                            <dl>
                                <dt>{locale('错误数')}</dt>
                                <dd>{this.props.errorCount}</dd>
                            </dl>
                        </dd>
                    </dl>
                </Link>
                {/* <Modal footer={null} visible={showDelAppModal} onCancel={this.toggleDelAppModal.bind(this)}>
                    <div className={styles['del-app-wrap']}>
                        <p>{locale('删除应用之后数据无法恢复，您确认删除该应用吗？')}</p>
                        <div className={cls('btn')} onClick={this.delApp.bind(this)}>{locale('确定')}</div>
                        <div className={cls('btn')} onClick={this.toggleDelAppModal.bind(this)}>{locale('取消')}</div>
                    </div>
                </Modal> */}
                <DelAppModal
                    showDelAppModal={showDelAppModal}
                    seconds={seconds}
                    toggleDelAppModal={this.toggleDelAppModal}
                    delApp={this.delApp.bind(this)}
                />
            </li>
        );
    }
}
