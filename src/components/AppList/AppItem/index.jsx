import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import styles from './index.scss';

export default class AppItem extends React.PureComponent {
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        showDelAppModal: false
    }
    statusText = {
        '-1': '未部署',
        '0': '未监控',
        '1': '监控中'
    }
    constructor(props) {
        super(props);
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
    toggleDelAppModal(e) {
        this.noEvent(e);
        this.setState({
            showDelAppModal: !this.state.showDelAppModal
        });
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
        this.props.delApp({
            appId: this.props.currentAppId
        }).then(res => {
            this.setState({
                showDelAppModal: false
            });
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
        const { showDelAppModal } = this.state;
        return (
            <li className={styles['app-item']} onClick={this.enterApp.bind(this)}>
                <Link to='/overview'>
                    <dl>
                        <dt className={styles['title']}>
                            <i className={cls(
                                styles['tag'],
                                styles[`tag-${this.props.status}`]
                            )}>{this.statusText[this.props.status]}</i>
                            <span>{this.props.title}</span>
                            <i className={cls('fa fa-cog', styles['option'], {
                                [styles['active']]: this.props.currentAppId === this.props.itemAppId
                            })} onClick={this.toggleOptionList.bind(this, this.props.itemAppId)}></i>
                            <ul className={cls(styles['list'], {
                                [styles['active']]: this.props.currentAppId === this.props.itemAppId
                            })}>
                                <li onClick={this.toggleDelAppModal.bind(this)}>删除应用</li>
                                <li onClick={this.updateApp.bind(this, this.props.status)}>
                                    {this.props.status === 1
                                        ? '停止监控'
                                        : '启动监控'}
                                </li>
                                <li onClick={this.deployApp.bind(this)}>应用部署</li>
                            </ul>
                        </dt>
                        <dd className={styles['content']}>
                            <dl>
                                <dt>访问用户</dt>
                                <dd>{this.props.uv}</dd>
                            </dl>
                            <dl>
                                <dt>点击数</dt>
                                <dd>{this.props.clickNum}</dd>
                            </dl>
                            <dl>
                                <dt>错误数</dt>
                                <dd>{this.props.errorCount}</dd>
                            </dl>
                        </dd>
                    </dl>
                </Link>
                <Modal footer={null} visible={showDelAppModal} onCancel={this.toggleDelAppModal.bind(this)}>
                    <div className={styles['del-app-wrap']}>
                        <p>删除应用之后数据无法恢复，您确认删除该应用吗？</p>
                        <div className={cls('btn')} onClick={this.delApp.bind(this)}>确定</div>
                        <div className={cls('btn')} onClick={this.toggleDelAppModal.bind(this)}>取消</div>
                    </div>
                </Modal>
            </li>
        );
    }
}
