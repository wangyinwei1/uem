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
            metrics: sessionStorage.getItem('UEM_paltform') == 'pc' ? JSON.stringify(["avgRspTime","avgNetworkTime","avgServerTime","avgClientTime"]) : JSON.stringify(["avgUiRspTime","avgRspTime","thruput"])
        });
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        let platform = this.props.platform;
        let keyIndicator = this.props.keyIndicator;
        const indicatorEnum = [{
            name: '平均响应时间',
            key: 'avgRspTime',
            value: _.isNull(keyIndicator['avgRspTime']) ? '--' : window.timeFormat(keyIndicator['avgRspTime'])
        }, {
            name: '平均与服务端建立网络连接时间',
            key: 'avgNetworkTime',
            value: _.isNull(keyIndicator['avgNetworkTime']) ? '--' : window.timeFormat(keyIndicator['avgNetworkTime'])            
        }, {
            name: '平均服务端处理请求和数据传输时间', // ?
            key: 'avgServerTime',
            value: _.isNull(keyIndicator['avgServerTime']) ? '--' : window.timeFormat(keyIndicator['avgServerTime'])                        
        }, {
            name: '平均客户端和渲染时间',
            key: 'avgClientTime',
            value: _.isNull(keyIndicator['avgClientTime']) ? '--' : window.timeFormat(keyIndicator['avgClientTime'])                                    
        }];
        
        const indicatorEnumMobile = [{
                name: '平均UI响应时间',
                key: 'avgUiRspTime',
                value: _.isNull(keyIndicator['avgUiRspTime']) ? '--' : window.timeFormat(keyIndicator['avgUiRspTime'])                                                    
            }, {
                name: '平均HTTP响应时间',
                key: 'avgRspTime',
                value: _.isNull(keyIndicator['avgRspTime']) ? '--' : window.timeFormat(keyIndicator['avgRspTime'])                                                                    
            }, {
                name: '吞吐率',
                key: 'thruput',
                value: _.isNull(keyIndicator['thruput']) ? '--' : parseFloat(keyIndicator['thruput'] * 100).toFixed(1) + '%'                                                                                    
        }];

        // indicatorEnumMobile.map((item, index) => {
        //     switch(item.key){
        //         case "avgRspTime" : if(keyIndicator['avgRspTime'] == null) {
        //             item.value = '--';
        //         }else { item.value = window.timeFormat(keyIndicator['avgRspTime']); }
        //         break;
        //         case "avgUiRspTime" : if(keyIndicator['avgUiRspTime'] == null) {
        //             item.value = '--';
        //         }else { item.value = window.timeFormat(keyIndicator['avgUiRspTime']); }
        //         break;
        //         case "thruput" : if(keyIndicator['thruput'] == null) {
        //             item.value = '--';
        //         }else { item.value = parseFloat(keyIndicator['thruput'] * 100).toFixed(1) + '%' }
        //         break;
        //     }
        // })

        // indicatorEnum.map((item, index) => {
        //     switch(item.key){
        //         case "avgRspTime" : if(keyIndicator['avgRspTime'] == null) {
        //             item.value = '--';
        //         }else { item.value = window.timeFormat(keyIndicator['avgRspTime']); }
        //         break;
        //         case "avgNetworkTime" : if(keyIndicator['avgNetworkTime'] == null) {
        //             item.value = '--';
        //         }else { item.value = window.timeFormat(keyIndicator['avgNetworkTime']); }
        //         break;
        //         case "avgServerTime" : if(keyIndicator['avgServerTime'] == null) {
        //             item.value = '--';
        //         }else { item.value = window.timeFormat(keyIndicator['avgServerTime']); }
        //         break;
        //         case "avgClientTime" : if(keyIndicator['avgClientTime'] == null) {
        //             item.value = '--';
        //         }else { item.value = window.timeFormat(keyIndicator['avgClientTime']); }
        //         break;
        //     }
        // })
        //  console.log('111111111111111',indicatorEnum, indicatorEnumMobile);
        return (
            <div className={styles['key-indicator']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        { platform == 'pc' ?
                            indicatorEnum.map(item => (
                                <li key={item.name} className={styles['item']}>
                                    <div className={styles['key']}>{locale(item.name)}</div>
                                    <div className={cls('toe', styles['value'])}>{item.value}</div>
                                </li>
                            )) :
                            indicatorEnumMobile.map(item => (
                                <li key={item.name} className={styles['item-mobile']}>
                                    <div className={styles['key']}>{locale(item.name)}</div>
                                    <div className={cls('toe', styles['value'])}>{item.value}</div>
                                </li>
                            ))
                        
                        }

                    </ul>
                </div>
            </div>
        );
    }
}

export default KeyIndicator;