import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss';

class Crux extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getRealTimeData, getApdex } = this.props;
        getRealTimeData();
        getApdex();


    }
    componentWillReceiveProps(nextProps) {
        this.hackProgress();
    }
    hackDashboard() {
        const title = (
            <div>
                <p>对真实用户操作的响应时间进行采样。</p>
                <p>采集一定时间之后，经过计算可以得出 Apdex 指数。</p>
                <p>计算公式为：</p>
                <p>Apdex 指数 = [满意数量 + (可容忍数量 / 2)] / 总样本数。</p>
                <p>从公式可以看出，Apdex指数越接近于1，代表应用性能越好。</p>
            </div>
        );
        return (
            <span id="dashboard-text" className={cls(styles['dashborad-text'])}>
                <span>Apdex</span>
                <Tooltip placement="bottom" title={title}>
                    <i className={cls('iconfont icon-bangzhu')}></i>
                </Tooltip>
            </span>
        );
    }
    hackProgress() {
        const apdex = this.apdex;
        const dashboardText = apdex === null
            ? locale('暂无数据')
            : apdex === 0
                ? '0'
                : `${apdex.toFixed(2) || locale('暂无数据')}`;

        $('.ant-progress-text-hack').remove();
        $('.ant-progress-text').hide();
        $('.ant-progress-text').after(`<span class="ant-progress-text-hack">${dashboardText}</span>`);
    }
    render() {
        const { realTimeData = {}, apdex: apdexT = 2000 } = this.props;
        const T = apdexT / 1000;
        const apdex = realTimeData['apdex'];
        this.apdex = apdex;

        const dashboardText = apdex === null
            ? locale('暂无数据')
            : apdex === 0
                ? '0'
                : `${apdex.toFixed(2) || locale('暂无数据')}`;
        let dashboardClass;
        switch (true) {
            case apdex === null:
                dashboardClass = styles['nodata'];
                break;
            case apdex >= 0.85:
                dashboardClass = styles['high'];
                break;
            case apdex >= 0.5:
                dashboardClass = styles['middle'];
                break;
            default:
                dashboardClass = styles['low'];
        }
        // $('.ant-progress-text').html(dashboardText);
        window.$ = $;
        const dataEnum = [{
            name: '浏览量PV',
            key: 'pv',
            value: _.isNull(realTimeData['pv']) ? '--' : realTimeData['pv']            
        }, {
            name: '平均访问页数',
            key: 'avgNoPv',
            value: _.isNull(realTimeData['avgNoPv']) ? '--' : realTimeData['avgNoPv'] 
        }, {
            name: '点击数', // ?
            key: 'clickNum',
            value: _.isNull(realTimeData['clickNum']) ? '--' : realTimeData['clickNum']
        }, {
            name: '平均响应时间',
            key: 'avgRspTime',
            value: _.isNull(realTimeData['avgRspTime']) ? '--' : window.timeFormat(realTimeData['avgRspTime'])            
        }, {
            name: '访问量UV', // ? 
            key: 'uv',
            value: _.isNull(realTimeData['uv']) ? '--' : realTimeData['uv']
        }, {
            name: '平均访问时长', // ? 
            key: 'avgUseTime',
            value: _.isNull(realTimeData['avgUseTime']) ? '--' : window.timeFormat(realTimeData['avgUseTime'])            
        }, {
            name: '平均点击数',
            key: 'avgClickNum',
            value: _.isNull(realTimeData['avgClickNum']) ? '--' : realTimeData['avgClickNum']
        }, {
            name: '用户错误率',
            key: 'errorRate',
            value: _.isNull(realTimeData['errorRate']) ? '--' : parseFloat(realTimeData['errorRate'] * 100).toFixed(1) + '%'            
        }];
        // dataEnum.map((item, index) => {
        //     switch (item.key) {
        //         case "pv": if (realTimeData['pv'] == null) {
        //             item.value = '--'
        //         } else {
        //             item.value = realTimeData['pv']
        //         }
        //             break;
        //         case 'avgNoPv': if (realTimeData['avgNoPv'] == null) {
        //             item.value = '--';
        //         } else {
        //             item.value = parseFloat(realTimeData['avgNoPv']).toFixed(1);
        //         }
        //             break;
        //         case 'clickNum': if (realTimeData['clickNum'] == null) {
        //             item.value = '--';
        //         } else {
        //             item.value = realTimeData['clickNum'];
        //         }
        //             break;
        //         case 'uv': if (realTimeData['uv'] == null) {
        //             item.value = '--';
        //         } else {
        //             item.value = realTimeData['uv'];
        //         }
        //             break;
        //         case 'avgRspTime': if (realTimeData['avgRspTime'] == null) {
        //             item.value = '--';
        //         } else {
        //             item.value = window.timeFormat(realTimeData['avgRspTime']);
        //         }
        //             break;
        //         case 'avgUseTime': if (realTimeData['avgUseTime'] == null) {
        //             item.value = '--';
        //         } else {
        //             item.value = window.timeFormat(realTimeData['avgUseTime']);
        //         }
        //             break;
        //         case 'avgClickNum': if (realTimeData['avgClickNum'] == null) {
        //             item.value = '--';
        //         } else {
        //             item.value = parseFloat(realTimeData['avgClickNum']).toFixed(1);
        //         }
        //             break;
        //         case 'errorRate': if (realTimeData['errorRate'] == null) {
        //             item.value = '--';
        //         } else {
        //             item.value = parseFloat(realTimeData['errorRate'] * 100).toFixed(1) + '%';
        //         }
        //     }
        // })
        return (
            <div className={styles['crux']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {dataEnum.map(item => (
                            <li key={item.name} className={styles['item']}>
                                <div className={styles['key']}>{locale(item.name)}</div>
                                <div className={cls('toe', styles['value'])}>{item.value}</div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['apdex']}>
                        <Progress className={cls(dashboardClass)} strokeWidth={8} type="dashboard" percent={apdex * 100} />
                        {this.hackDashboard()}
                        <ul className={styles['range']}>
                            <li><i className={cls('iconfont icon-manyi')}></i><span>{`${realTimeData['dPercentage'] || '--'} ${locale('的操作响应快')}（0 ~ ${T.toFixed(1)}s）`}</span></li>
                            <li><i className={cls('iconfont icon-yiban')}></i><span>{`${realTimeData['tPercentage'] || '--'} ${locale('的操作可接受')}（${T.toFixed(1)} ~ ${(4 * T).toFixed(1)}s）`}</span></li>
                            <li><i className={cls('iconfont icon-bumanyi')}></i><span>{`${realTimeData['sPercentage'] || '--'} ${locale('的操作响应慢')}（> ${(4 * T).toFixed(1)}s）`}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Crux;