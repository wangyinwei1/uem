import React from 'react';
import {
    BarChart,
    LineChart
} from '../../Common/Chart';
import config from './config.js';
import styles from './index.scss';

export default class Trend extends React.Component {
    trends = [{
        name: '响应时间趋势图',
        value: 'avgRspTime'
    }, {
        name: '响应时间分析图',
        value: 'thruput'
    }, {
        name: '点击数按满意度分布图',
        value: 'apdex'
    }, {
        name: '吞吐率趋势图',
        value: 'throughput'
    }];
    state = {
        activeTrend: 0
    };
    changeTrend(index) {
        this.setState({
            activeTrend: index
        });
    }
    renderTrend() {
        const { activeTrend } = this.state;
        const { itemId, trend, uiType } = this.props;
        const platform = sessionStorage.getItem('UEM_platform');   
        switch (activeTrend) {
            case 0: return (
            platform !== 'pc' && uiType == 'NATIVE' ?
            <BarChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('avgRspTimeMobile'))
                    .setIn(['xAxis', 0, 'data'], trend.avgRspTime.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['series', 0, 'data'], trend.avgRspTime.map(item => item.value))
                    .setIn(['series', 1, 'data'], trend.clickNum.map(item => item.value))
                    .toJS()}
            /> :
            <BarChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('avgRspTime'))
                    .setIn(['xAxis', 0, 'data'], trend.clientTime.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['series', 0, 'data'], trend.clientTime.map(item => item.value))
                    .setIn(['series', 1, 'data'], trend.netWorkTime.map(item => item.value))
                    .setIn(['series', 2, 'data'], trend.serverTime.map(item => item.value))
                    .setIn(['series', 3, 'data'], trend.clickNum.map(item => item.value))
                    .toJS()}
            />
            )
            ;

            case 1: return <LineChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('thruput'))
                    .setIn(['xAxis', 0, 'data'], trend.median.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['series', 0, 'data'], trend.median.map(item => item.value))
                    .setIn(['series', 1, 'data'], trend.avgRspTime.map(item => item.value))
                    .setIn(['series', 2, 'data'], trend.percent5.map(item => item.value))
                    .toJS()}
            />;

            case 2:
                const apdexsArr = [];
                apdexsArr.push(trend.apdexs['apdexS'] || 0);
                apdexsArr.push(trend.apdexs['apdexT'] || 0);
                apdexsArr.push(trend.apdexs['apdexD'] || 0);
                return <BarChart
                    chartId={`trend-${itemId}-${activeTrend}`}
                    options={config.get('default').mergeDeep(config.get('apdex'))
                        .setIn(['series', 0, 'data'], apdexsArr)
                        .toJS()}
                />;

            case 3: return <BarChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('throughput'))
                    .setIn(['xAxis', 0, 'data'], trend.thruput.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['series', 0, 'data'], trend.thruput.map(item => item.value))
                    .setIn(['series', 1, 'data'], trend.clickNum.map(item => item.value))
                    .toJS()}
            />;
        }
    }
    render() {
        const { props } = this.props;
        return (
            <div className={styles['trend']}>
                <div className={cls('tile-head', styles['trend-head'])}>
                    {this.trends.map((item, index) => <div className={cls({
                        [styles['active']]: this.state.activeTrend === index
                    })} key={item.name} onClick={this.changeTrend.bind(this, index)}>{locale(item.name)}</div>)}
                </div>
                {
                this.props.specificUrls.length > 0 ?
                <div className={cls('tile-body', styles['trend-body'])} key={this.state.activeTrend}>
                    {this.renderTrend()}
                </div>
                :
                <div className='tile-body'>
                    <span className={styles['emptyText']}>
                        <i className={cls('iconfont icon-jinggao')}></i>
                        {locale('此点击行为没有触发HTTP请求，因此无数据')}
                    </span>
                </div>
                }
            </div>
        );
    }
}