import React from 'react';
import styles from '../Analysis/index.scss';

export default class BaseInfo extends React.Component {

    renderUserDefined() {
        const { userDefined={} } = this.props.sampleInfo;
        if (Object.keys(userDefined).length == 0 || undefined) {
            return null;
        }
        return (
            <div className={styles['base']}>
                {/* {userDefined.map(item => <div className={styles['base-item']} key={item.name} title={item.value}>{`${item.name}：${item.value}`}</div>)} */}
                {_.forIn(userDefined,(value,key) => <div className={styles['base-item']} key={key} title={value}>{`${key}：${value}`}</div> )}
            </div>
        );
    }
    renderIcons() {
        const {
            ip = '',
            area = '',
            isp = '',
            browser = '',
            os = '',
            platform = ''
        } = this.props.sampleInfo;
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
            if (_browser.indexOf('ie') >= 0) {
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
            isp,
            browser,
            os,
            platform
        } = this.props.sampleInfo;
        return (
            <div className={styles['info']}>
                <div className={styles['base-item']}>
                    IP：{ip}
                </div>
                <div className={styles['base-item']}>
                    {locale('区域')}：{area}
                </div>
                <div className={styles['base-item']}>
                    {locale('运营商')}：{isp}
                </div>
                {this.renderIcons()}
                {/* <div className={styles['base-item']}>
                    {locale('浏览器')}：{browser}
                </div>
                <div className={styles['base-item']}>
                    {locale('操作系统')}：{os}
                </div>
                <div className={styles['base-item']}>
                    {locale('平台')}：{platform}
                </div> */}
            </div>
        );
    }
    render() {
        const { userDefined } = this.props.sampleInfo;
        return (
            <div className={styles['base-info-wrap']}>
                {this.renderUserDefined()}
                {this.renderInfo()}
            </div>
        );
    }
}