import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Message, Select } from 'antd';
import i18n from './locale';
import config from './config';
import styles from './index.scss';

const Option = Select.Option;
// @inject('frameStore') 
// @observer
export default class Menu extends React.Component {
    // 通过context取router，暂时没用到
    // static contextTypes = {
    //     router: React.PropTypes.object.isRequired
    // }
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
            Message.error(locale('请先选择应用'));
            this.noEvent(e);
        }
    }
    // 创建菜单列表
    makeMenus = (menus) => {
        const { platform } = this.props;
        return menus.map(menu => (
            <ul className={styles['menu-list']} key={menu.name}>
                <li>{i18n[menu.name][localStorage.getItem('UEM_lang')]}</li>
                {
                    menu.list.map(item => {
                        if (item.pcOnly && platform.toLowerCase() !== 'pc') {
                            return null;
                        }
                        return (
                            <li key={item.name}>
                                <NavLink exact onClick={this.checkApp.bind(this)} activeClassName={styles['current']} replace to={item.to}>
                                    <i className={cls('iconfont', item.icon)}></i><span>{locale(item.name)}</span>
                                </NavLink>
                            </li>
                        );
                    })
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
            Message.error(locale('请先选择应用'));
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
        $win.trigger('resize');
    }

    setTheme(){
        // const { theme, onChangeTheme } = this.props.frameStore;
        localStorage.setItem('UEM_skin', localStorage.getItem('UEM_skin') && localStorage.getItem('UEM_skin') == 'blue' ? 'white' : 'blue');
        document.getElementsByTagName("html")[0].className = localStorage.getItem('UEM_skin');
        // action 改变theme，被监听.
        // onChangeTheme(localStorage.getItem('UEM_skin'));
    }
    render() {
        const { appId } = this.props;
        return (
            <div className={styles['menu']} id='Menu'>
                <NavLink exact activeClassName={styles['current']} replace to='/app_list'><i className='iconfont icon-qiehuanyingyong'></i>{locale('所有应用')}</NavLink>
                {this.appSelect()}
                <ul className={styles['platform']}>
                    {config.platform.map(item => {
                        return (
                            <Link to='/overview' 
                                className={cls({
                                    [styles['active']]: item.name === this.props.platform
                                })}
                                key={item.name}
                            >
                                <li onClick={this.choosePlatform.bind(this, item.name)}
                                    title={item.name === 'android'
                                        ? 'Android'
                                        : item.name.toUpperCase()}
                                >
                                    <i className={cls('iconfont', item.icon)}></i>
                                </li>
                            </Link>
                        );
                    })}
                </ul>
                {this.makeMenus(config.menus)}
                <div className={styles['setting-other-wrap']}>
                    <div className={styles['setting-expand']}><i className='fa fa-fw fa-chevron-left' onClick={this.expand.bind(this)}></i></div>
                    <div onClick={this.setTheme.bind(this)} className={styles['changeTheme']}> <i className='iconfont icon-xiugaishanchuyibiaopankong'></i>换肤</div>
                    <NavLink exact onClick={this.checkApp.bind(this)} activeClassName={styles['current']} replace to='/setting'><i className='iconfont icon-xiugaishanchuyibiaopankong'></i>{locale('设置')}</NavLink>
                    <a href='./src/help/index.html' target='_blank'><i className='iconfont icon-bangzhu'></i>{locale('帮助')}</a>
                </div>
            </div>
        );
    }
}
