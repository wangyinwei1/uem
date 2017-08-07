import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.scss';

/**
 * 接收两个参数
 * data、showBaseInfo
 * 
 * @export
 * @class UserTrace
 * @extends {React.Component}
 */
export default class UserTrace extends React.Component {
    legends = [{
        label: '不满意',
        color: 'red'
    }, {
        label: '可接受',
        color: 'yellow'
    }, {
        label: '满意',
        color: 'green'
    }, {
        label: '出错',
        color: 'gray'
    }];
    tips = [{
        label: '请求时间：',
        value: 'reqTime'
    }, {
        label: '请求类型：',
        value: 'reqType'
    }, {
        label: '请求URL：',
        value: 'reqUrl'
    }, {
        label: '响应时间：',
        value: 'rspTime'
    }]; 
    detailInfo = [{
        label: '入口来源：',
        value: 'referrer'
    }, {
        label: '会话时间：',
        value: 'sessionTime'
    }, {
        label: '入口来源：',
        value: 'landingPage'
    }, {
        label: '点击数：',
        value: 'clickNum'
    }, {
        label: '平均响应时间：',
        value: 'avgRspTime'
    }];
    state = {
        toggleShow: true
    }
    renderTimeline() {
        const {
            traceInfo
        } = this.props.data;
        return traceInfo.map(item => {
            return (
                <div className={styles['trace-box-wrap']}>
                    <div>{item.page}</div>
                    <div>{item.path}</div>
                    <div className={styles['trace-time']}>
                        <div>{moment(item.time).format('YYYY-MM-DD')}</div>
                        <div>{moment(item.time).format('HH:mm:ss')}</div>
                    </div>
                    <div className={styles['trace-list']}>
                        {this.renderTrace(item.trace)}
                    </div>
                </div>
            );
        });
    }
    renderIcon(type) {
        let icon = '', title = '';
        switch (type) {
            case 'link':
                icon = 'icon-click2';
                break;
            case 'form':
                icon = 'icon-submit';
                break;
            case 'xhr':
                icon = 'icon-click';
                break;
            case 'redirect':
                icon = 'icon-shuaxin';
                break;
            default:
                return '';
        }
        return <i className={cls('iconfont', icon, styles['icon'])}></i>;

    }
    renderTrace(trace) {
        return trace.map(item => {
            const content = (
                <ul className={styles['tooltip']}>
                    {this.tips.map(tip => <li key={tip.value}>{`${tip.label}${item[tip.value]}`}</li>)}
                </ul>
            );
            return (
                <Tooltip placement="right" title={content}>
                    <div className={cls(styles[`color-${item.apdex.toLowerCase()}`], styles['trace-item'], {
                        [styles['trace-item-ajax']]: item.operType === 'xhr'
                    })}>
                        {this.renderIcon(item.operType)}
                        <span>{item.operName}</span>
                    </div>
                </Tooltip>
            );
        });
    }
    renderIcons() {
        const {
            browser = '',
            platform = '',
            os = ''
        } = this.props.data.browserBaseInfo;
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
        } = this.props.data.browserBaseInfo;
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
    toggle() {
        this.setState({
            toggleShow: !this.state.toggleShow
        });
    }
    render() {
        const { showBaseInfo = true } = this.props;
        const {
            browserBaseInfo,
            detailInfo,
            traceInfo
        } = this.props.data;      
        return (
            <div className={styles['user-trace']}>
                <div className={styles['legend']}>
                    {this.legends.map(item => <span key={locale(item.label)}>
                        <i className={cls(styles['icon'], styles[`${item.color}`])}></i>
                        <span>{locale(item.label)}</span>
                    </span>)}
                </div>
                <div className={cls(styles['trace-wrap'], {
                    [styles['toggle-show']]: this.state.toggleShow
                })}>
                    <div className={styles['trace-box-wrap']}>
                        {showBaseInfo && this.renderInfo()}
                        <div className={cls(styles['base-info'], styles['trace-box'])}>
                            {this.detailInfo.map(item => <div key={item.value} className={styles['base-li']} title={detailInfo[item.value]}>{`${locale(item.label)}${detailInfo[item.value]}`}</div>)}
                        </div>
                        <i className={cls('iconfont', styles['toggle-btn'], {
                            'icon-shanjian': this.state.toggleShow,
                            'icon-xinzeng': !this.state.toggleShow
                        })} onClick={this.toggle.bind(this)}></i>
                    </div>
                    {this.renderTimeline()}
                </div>
            </div>
        );
    }
}

// 模拟数据
UserTrace.mockData = {
    "browserBaseInfo": {
        "area": "- 保留地址 保留地址",
        "browser": "Chrome 58",
        "ip": "10.1.11.28",
        "isp": "-",
        "os": "Windows 7",
        "platform": "pc",
        "sessionId": "ffb9443a-ee7a-4a6c-a11c-dc30281ec251",
        "timestamp": 0,
        "userDefined": {},
        "userId": ""
    },
    "detailInfo": {
        "avgRspTime": 0.49,
        "clickNum": 13,
        "landingPage": "http://10.1.51.113:8080/kb/dashboard.action",
        "referrer": "http://web.uyundev.cn/buriedPoint/visual.html?protocol=http&theme=blue",
        "sessionTime": 22605.021
    },
    "traceInfo": [
        {
            "page": "主页面 - 优云软件知识共享系统",
            "path": "http://10.1.51.113:8080/kb/dashboard.action",
            "time": 1499948915200,
            "trace": [
                {
                    "apdex": "D",
                    "dataChanel": "browser",
                    "operName": "主页面 - 优云软件知识共享系统",
                    "operType": "redirect",
                    "reqTime": 1499948915200,
                    "reqType": "GET",
                    "reqUrl": "http://10.1.51.113:8080/kb/dashboard.action",
                    "rspTime": 0.662,
                    "txIds": [
                        "15d3babe5389700448fd3ae5b244474f0820"
                    ]
                }
            ]
        },
        {
            "page": "主页面 - 优云软件知识共享系统",
            "path": "http://10.1.51.113:8080/kb/dashboard.action",
            "time": 1499936450071,
            "trace": [
                {
                    "apdex": "D",
                    "dataChanel": "browser",
                    "operName": "主页面 - 优云软件知识共享系统",
                    "operType": "redirect",
                    "reqTime": 1499936450071,
                    "reqType": "GET",
                    "reqUrl": "http://10.1.51.113:8080/kb/dashboard.action",
                    "rspTime": 0.816,
                    "txIds": [
                        "15d3a9c2585dad071879678f5bfd474f0820"
                    ]
                }
            ]
        },
        {
            "page": "主页面 - 优云软件知识共享系统",
            "path": "http://10.1.51.113:8080/kb/dashboard.action",
            "time": 1499926705058,
            "trace": [
                {
                    "apdex": "S",
                    "dataChanel": "browser",
                    "operName": "主页面 - 优云软件知识共享系统",
                    "operType": "redirect",
                    "reqTime": 1499926705058,
                    "reqType": "GET",
                    "reqUrl": "http://10.1.51.113:8080/kb/dashboard.action",
                    "rspTime": 0.421,
                    "txIds": [
                        ""
                    ]
                }
            ]
        },
        {
            "page": "主页面 - 优云软件知识共享系统",
            "path": "http://10.1.51.113:8080/kb/dashboard.action",
            "time": 1499926525060,
            "trace": [
                {
                    "apdex": "S",
                    "dataChanel": "browser",
                    "operName": "主页面 - 优云软件知识共享系统",
                    "operType": "redirect",
                    "reqTime": 1499926525060,
                    "reqType": "GET",
                    "reqUrl": "http://10.1.51.113:8080/kb/dashboard.action",
                    "rspTime": 0,
                    "txIds": [
                        "15d3a96f7c51af804f073abc6ac2d474f0820"
                    ]
                }
            ]
        },
        {
            "page": "主页面 - 优云软件知识共享系统",
            "path": "http://10.1.51.113:8080/kb/dashboard.action",
            "time": 1499926505057,
            "trace": [
                {
                    "apdex": "S",
                    "dataChanel": "browser",
                    "operName": "主页面 - 优云软件知识共享系统",
                    "operType": "redirect",
                    "reqTime": 1499926505057,
                    "reqType": "GET",
                    "reqUrl": "http://10.1.51.113:8080/kb/dashboard.action",
                    "rspTime": 0,
                    "txIds": [
                        "15d3a969094594034623f645815e474f0820"
                    ]
                }
            ]
        },
        {
            "page": "主页面 - 优云软件知识共享系统",
            "path": "http://10.1.51.113:8080/kb/dashboard.action",
            "time": 1499926420083,
            "trace": [
                {
                    "apdex": "S",
                    "dataChanel": "browser",
                    "operName": "主页面 - 优云软件知识共享系统",
                    "operType": "redirect",
                    "reqTime": 1499926420083,
                    "reqType": "GET",
                    "reqUrl": "http://10.1.51.113:8080/kb/dashboard.action",
                    "rspTime": 0,
                    "txIds": [
                        "15d3a9553ba26e9099cc174ea10bb474f0820"
                    ]
                }
            ]
        },
        {
            "page": "主页面 - 优云软件知识共享系统",
            "path": "http://10.1.51.113:8080/kb/dashboard.action",
            "time": 1499926310179,
            "trace": [
                {
                    "apdex": "S",
                    "dataChanel": "browser",
                    "operName": "主页面 - 优云软件知识共享系统",
                    "operType": "redirect",
                    "reqTime": 1499926310179,
                    "reqType": "GET",
                    "reqUrl": "http://10.1.51.113:8080/kb/dashboard.action",
                    "rspTime": 0.504,
                    "txIds": [
                        ""
                    ]
                }
            ]
        }
    ]
};