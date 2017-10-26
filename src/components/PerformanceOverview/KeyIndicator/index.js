import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss'; 

class KeyIndicator extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getKeyIndicator } = this.props;
        getKeyIndicator({
            metrics: sessionStorage.getItem('UEM_platform') == 'pc' ? JSON.stringify(["avgRspTime","avgNetworkTime","avgServerTime","avgClientTime"]) : JSON.stringify(["avgUiRspTime","avgRspTime","thruput"])
        });
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        let platform = this.props.platform;
        let keyIndicator = this.props.keyIndicator;
        const indicatorEnumPC = [{
            name: locale('平均响应时间'),
            key: 'avgRspTime',
            value: _.isNull(keyIndicator['avgRspTime']) ? '--' : window.timeFormat(keyIndicator['avgRspTime']),
            tooltip: false
        }, {
            name: locale('平均与服务端建立网络连接时间'),
            key: 'avgNetworkTime',
            value: _.isNull(keyIndicator['avgNetworkTime']) ? '--' : window.timeFormat(keyIndicator['avgNetworkTime']),
            tooltip: true,
            tooltipText: locale('平均与服务端建立网络连接时间 = 重定向时间 + DNS时间 + 建立连接时间')            
        }, {
            name: locale('平均服务端处理请求和数据传输时间'), // ?
            key: 'avgServerTime',
            value: _.isNull(keyIndicator['avgServerTime']) ? '--' : window.timeFormat(keyIndicator['avgServerTime']),
            tooltip: true,
            tooltipText: locale('平均服务端处理请求和数据传输时间 = 请求文档时间 + 响应并传输数据时间')                        
        }, {
            name: locale('平均客户端和渲染时间'),
            key: 'avgClientTime',
            value: _.isNull(keyIndicator['avgClientTime']) ? '--' : window.timeFormat(keyIndicator['avgClientTime']),
            tooltip: true,
            tooltipText:locale('平均客户端加载和渲染时间 = Dom 加载时间 + DOM 内容加载时间 + 页面渲染时间')                                    
        }];
        
        const indicatorEnumMobile = [{
                name: locale('平均UI响应时间'),
                key: 'avgUiRspTime',
                value: _.isNull(keyIndicator['avgUiRspTime']) ? '--' : window.timeFormat(keyIndicator['avgUiRspTime'])                                                    
            }, {
                name: locale('平均HTTP响应时间'),
                key: 'avgRspTime',
                value: _.isNull(keyIndicator['avgRspTime']) ? '--' : window.timeFormat(keyIndicator['avgRspTime'])                                                                    
            }, {
                name: locale('吞吐率'),
                key: 'thruput',
                value: _.isNull(keyIndicator['thruput']) ? '--' : parseFloat(keyIndicator['thruput'] * 100).toFixed(1) + '%'                                                                                    
        }];
        const indicatorEnum = platform == 'pc' ? indicatorEnumPC : indicatorEnumMobile;
        return (
            <div className={styles['key-indicator']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                            {indicatorEnum.map(item => (
                                <li key={item.name} className={ platform == 'pc' ? styles['item'] : styles['item-mobile']}>
                                    <div className={styles['key']}>{item.name}
                                    {
                                    item.tooltip && <Tooltip placement="bottom" title={item.tooltipText}>
                                        <i className={cls('iconfont icon-bangzhu')}></i>
                                    </Tooltip>
                                    }
                                    </div>
                                    <div className={cls('toe', styles['value'])}>{item.value}</div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default KeyIndicator;