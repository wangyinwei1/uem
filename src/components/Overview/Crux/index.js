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
                <p>{locale('对真实用户操作的响应时间进行采样。')}</p>
                <p>{locale('采集一定时间之后，经过计算可以得出 Apdex 指数。')}</p>
                <p>{locale('计算公式为：')}</p>
                <p>{locale('Apdex 指数 = [满意数量 + (可容忍数量 / 2)] / 总样本数。')}</p>
                <p>{locale('从公式可以看出，Apdex指数越接近于1，代表应用性能越好。')}</p>
            </div>
        );
        return (
            <span id="dashboard-text" className={cls(styles['dashborad-text'])}>
                <span>Apdex</span>
                <Tooltip placement="bottom" title={title}>
                    <i className='iconfont icon-bangzhu'></i>
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
            name: locale('浏览量PV'),
            key: 'pv',
            value: _.isNull(realTimeData['pv']) ? '--' : realTimeData['pv']
        }, {
            name: locale('平均访问页数'),
            key: 'avgNoPv',
            value: _.isNull(realTimeData['avgNoPv']) ? '--' : realTimeData['avgNoPv']
        }, {
            name: locale('点击数'), // ?
            key: 'clickNum',
            value: _.isNull(realTimeData['clickNum']) ? '--' : realTimeData['clickNum']
        }, {
            name: locale('平均响应时间'),
            key: 'avgRspTime',
            value: _.isNull(realTimeData['avgRspTime']) ? '--' : window.timeFormat(realTimeData['avgRspTime'])
        }, {
            name: locale('访问量UV'), // ? 
            key: 'uv',
            value: _.isNull(realTimeData['uv']) ? '--' : realTimeData['uv']
        }, {
            name: locale('平均访问时长'), // ? 
            key: 'avgUseTime',
            value: _.isNull(realTimeData['avgUseTime']) ? '--' : window.timeFormat(realTimeData['avgUseTime']),
            tooltip: true,
            tooltipText: locale('平均每次访问在网站上的停留时长')
        }, {
            name: locale('平均点击数'),
            key: 'avgClickNum',
            value: _.isNull(realTimeData['avgClickNum']) ? '--' : realTimeData['avgClickNum']
        }, {
            name: locale('用户错误率'),
            key: 'errorRate',
            value: _.isNull(realTimeData['errorRate']) ? '--' : parseFloat(realTimeData['errorRate'] * 100).toFixed(1) + '%',
            tooltip: true,
            tooltipText: locale('出错用户数/UV')
        }];

        return (
            <div className={styles['crux']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {dataEnum.map(item => (
                            <li key={item.name} className={styles['item']}>
                                <div className={styles['key']}>{item.name}
                                    {item.tooltip && <Tooltip placement="bottom" title={item.tooltipText}>
                                        <i className={cls('iconfont icon-bangzhu')}></i>
                                    </Tooltip>}
                                </div>
                                <div className={cls('toe', styles['value'])}>{item.value}</div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['apdex']}>
                        <Progress className={cls(dashboardClass)} strokeWidth={8} type="dashboard" percent={apdex * 100} />
                        {this.hackDashboard()}
                        <ul className={styles['range']}>
                            <li><i className={cls('iconfont icon-manyi')}></i><span>{`${realTimeData['sPercentage'] || '--'} ${locale('的操作响应快')}（0 ~ ${T.toFixed(2)}s）`}</span></li>
                            <li><i className={cls('iconfont icon-yiban')}></i><span>{`${realTimeData['tPercentage'] || '--'} ${locale('的操作可接受')}（${T.toFixed(2)} ~ ${(4 * T).toFixed(2)}s）`}</span></li>
                            <li><i className={cls('iconfont icon-bumanyi')}></i><span>{`${realTimeData['dPercentage'] || '--'} ${locale('的操作响应慢')}（> ${(4 * T).toFixed(2)}s）`}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Crux;