import React from 'react';
import styles from './index.scss';

export default class BaseInfo extends React.Component {
    renderUserDefined() {
        const { userDefined = [] } = this.props.data;
        if (userDefined.length === 0) {
            return null;
        }
        return (
            <div className={styles['base']}>
                {userDefined.map(item => <div className={styles['base-item']} key={item.name} title={item.value}>{`${item.name}：${item.value}`}</div>)}
            </div>
        );
    }
    renderIcons() {
        const {
            browser = '',
            platform = '',
            os = ''
        } = this.props.data;
        const _platform = platform;
        const _os = (() => {
            const _os = os.toLowerCase();
            if (_os.indexOf('windows') >= 0) {
                return 'windows';
            }
            if (_os.indexOf('android') >= 0) {
                return 'android';
            }
            if (_os.indexOf('ios') >= 0) {
                return 'ios';
            }
        })();
        const _browser = (() => {
            const _browser = browser.toLowerCase();
            if (_browser.indexOf('safari') >= 0) {
                return 'safari';
            }
            if (_browser.indexOf('chrome') >= 0) {
                return 'google';
            }
            if (_browser.indexOf('firefox') >= 0) {
                return 'huohu';
            }
            if (_browser.indexOf('internet') >= 0) {
                return 'ie';
            }
            if (_browser.indexOf('opera') >= 0) {
                return 'opera';
            }
        })();
        return (
            <div className={styles['icons']}>
                <i className={cls('iconfont', `icon-${_platform}`)} title={platform}></i>
                <i className={cls('iconfont', `icon-${_os}`)} title={os}></i>
                <i className={cls('iconfont', `icon-${_browser}`)} title={browser}></i>
            </div>
        );
    }
    renderInfo() {
        const {
            ip,
            area,
            isp
        } = this.props.data;
        return (
            <div className={styles['info']}>
                <div className={styles['base-item']}>
                    IP：{ip}
                </div>
                <div className={styles['base-item']}>
                    区域：{area}
                </div>
                <div className={styles['base-item']}>
                    运营商：{isp}
                </div>
                {this.renderIcons()}
            </div>
        );
    }
    render() {
        const { userDefined } = this.props.data;
        return (
            <div className={styles['base-info-wrap']}>
                {this.renderUserDefined()}
                {this.renderInfo()}
            </div>
        );
    }
}