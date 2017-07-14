import React from 'react';
import { NavLink } from 'react-router-dom';
import { Message, Select } from 'antd';
import i18n from './locale';
import config from './config';
import styles from './index.scss';

const Option = Select.Option;

export default class Menu extends React.Component {
    state = {
        collapsed: false
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    noEvent(e) {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }
    checkApp(e) {
        const { appId } = this.props;
        if (!appId) {
            Message.error('请先选择应用');
            this.noEvent(e);
        }
    }
    // 创建菜单列表
    makeMenus = (menus) => {
        return menus.map(menu => (
            <ul className={styles['menu-list']} key={menu.name}>
                <li>{i18n[menu.name][localStorage.getItem('UEM_lang')]}</li>
                {
                    menu.list.map(item => (
                        <li key={item.name} >
                            <NavLink exact onClick={this.checkApp.bind(this)} activeClassName={styles['current']} replace to={item.to}>
                                <i className={cls('iconfont', item.icon)}></i><span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        ));
    }
    chooseApp(appId) {
        const { chooseApp } = this.props;
        chooseApp({
            appId
        });
    }
    choosePlatform(platform, e) {
        const { appId, choosePlatform } = this.props;
        if (!appId) {
            Message.error('请先选择应用');
            return false;
        }

        choosePlatform({
            platform
        });
    }
    appSelect() {
        const { appId, appList } = this.props;
        if (!appId) {
            return null;
        }
        return (
            <div className={styles['apps-select']}>
                <Select value={appId} style={{ width: 120 }} onChange={this.chooseApp.bind(this)} getPopupContainer={() => document.getElementById('Menu')}>
                    {appList.map(item =>
                        <Option key={item.appId}>{item.appName}</Option>
                    )}
                </Select>
            </div>
        );
    }
    expand() {
        const $body = $('body');
        const $win = $(window);
        $body.toggleClass('unexpand');
        $win.trigger("resize");
    }
    render() {
        const { appId } = this.props;
        return (
            <div className={styles['menu']} id="Menu">
                <NavLink exact activeClassName={styles['current']} replace to="/app_list"><i className="iconfont icon-qiehuanyingyong"></i>{i18n.apps[localStorage.getItem('UEM_lang')]}</NavLink>
                {this.appSelect()}
                <ul className={styles['platform']}>
                    {config.platform.map(item => {
                        return (
                            <li className={cls({
                                [styles['active']]: item.name === this.props.platform
                            })}
                                onClick={this.choosePlatform.bind(this, item.name)}
                                key={item.name}
                                title={item.name === 'android'
                                    ? 'Android'
                                    : item.name.toUpperCase()}
                            >
                                <i className={cls('iconfont', item.icon)}></i>
                            </li>
                        );
                    })}
                </ul>
                {this.makeMenus(config.menus)}
                <div className={styles['setting-other-wrap']}>
                    <div className={styles['setting-expand']}><i className="fa fa-fw fa-chevron-left" onClick={this.expand.bind(this)}></i></div>
                    <NavLink exact onClick={this.checkApp.bind(this)} activeClassName={styles['current']} replace to="/setting"><i className="iconfont icon-xiugaishanchuyibiaopankong"></i>{i18n.setting[localStorage.getItem('UEM_lang')]}</NavLink>
                    <a href="./src/help/index.html" target="_blank"><i className="iconfont icon-bangzhu"></i>帮助</a>
                </div>
            </div>
        );
    }
}
