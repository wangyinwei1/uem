import React from 'react';
import { NavLink } from 'react-router-dom';
import { Message } from 'antd';
import i18n from './locale';
import config from './config';
import styles from './index.scss';

export default class Menu extends React.Component {
    state = {
        collapsed: false
    };
    constructor(props) {
        super(props);
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
            <ul key={menu.name}>
                <li>{i18n[menu.name][localStorage.getItem('UEM_lang')]}</li>
                {
                    menu.list.map(item => (
                        <li key={item.name} >
                            <NavLink exact onClick={this.checkApp.bind(this)} activeClassName={styles['current']} replace to={item.to}>
                                <i className={cls('iconfont', item.icon)}></i>{item.name}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        ));
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
    render() {
        return (
            <div className={styles['menu']}>
                <NavLink exact activeClassName={styles['current']} replace to="/app_list">{i18n.apps[localStorage.getItem('UEM_lang')]}</NavLink>
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
                <NavLink exact onClick={this.checkApp.bind(this)} activeClassName={styles['current']} replace to="/setting"><i className="iconfont icon-xiugaishanchuyibiaopankong"></i>{i18n.setting[localStorage.getItem('UEM_lang')]}</NavLink>
            </div>
        );
    }
}
