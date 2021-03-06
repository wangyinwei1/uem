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
        name: this.props.type == 'browse' ? 'PV按满意度分布图':"响应时间按满意度分布图",
        value: 'apdexs'
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
        const { itemId, trend, uiType, theme } = this.props;
        const platform = sessionStorage.getItem('UEM_platform'); 


        switch (activeTrend) {
            case 0: return (
            platform !== 'pc' && uiType == 'NATIVE' ?
            <BarChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('avgRspTimeMobile'))
                    .mergeDeep({
                        color: themeChange('performanceTrendColor',theme),
                        legend: {
                            textStyle: {
                                color: themeChange('legendTextColor',theme)
                            }
                        },
                        yAxis: [{
                            }, {
                                axisLine: {
                                    lineStyle: {
                                        color: themeChange('axisLineColor',theme)
                                }
                            }
                        }],
                    })
                    .setIn(['xAxis', 0, 'data'], trend.avgRspTime.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['series', 0, 'data'], trend.avgRspTime)
                    .setIn(['series', 1, 'data'], trend.clickNum)
                    .toJS()}
                theme={theme}    
            /> :
            <BarChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('avgRspTime'))
                    .mergeDeep({
                        color: themeChange('performanceTrendColor',theme),
                        legend: {
                            textStyle: {color: themeChange('legendTextColor',theme)}
                        },
                        yAxis: [{}, 
                            {
                                axisLine: { lineStyle: { color: themeChange('axisLineColor',theme) }
                            }
                        }],
                    })
                    .setIn(['xAxis', 0, 'data'], trend.clientTime.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['legend', 'data',0,'name'], this.props.displayType == 'xhr' ? locale('回调') : locale('客户端'))
                    .setIn(['series', 0, 'name'], this.props.displayType == 'xhr' ? locale('回调') : locale('客户端')) 
                    .setIn(['series', 0, 'data'],  this.props.displayType == 'xhr' ? trend.callbackTime : trend.clientTime)
                    .setIn(['series', 1, 'data'], trend.netWorkTime)
                    .setIn(['series', 2, 'data'], trend.serverTime)
                    .setIn(['series', 3, 'data'], trend.clickNum)
                    .toJS()}
                theme={theme}    
            />
            )
            ;

            case 1: return <LineChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('thruput'))
                    .mergeDeep({
                        color: themeChange('performanceTrendColor_1',theme),
                        legend: {
                            textStyle: {color: themeChange('legendTextColor',theme)}
                        }
                    })
                    .setIn(['xAxis', 0, 'data'], trend.median.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['series', 0, 'data'], trend.median)
                    .setIn(['series', 1, 'data'], trend.avgRspTime)
                    .setIn(['series', 2, 'data'], trend.percent5)
                    .toJS()}
                theme={theme}    
            />;

            case 2:
                const apdexsArr = [];
                apdexsArr.push(trend.apdexs['apdexS'] || 0);
                apdexsArr.push(trend.apdexs['apdexT'] || 0);
                apdexsArr.push(trend.apdexs['apdexD'] || 0);
                
                return <BarChart
                    chartId={`trend-${itemId}-${activeTrend}`}
                    options={config.get('default').mergeDeep(config.get('apdex'))
                        .mergeDeep({
                            series: [{
                                itemStyle: {
                                    normal: {
                                        color: item => {
                                            const colors = themeChange('performanceTrendColor_2',theme);
                                            return colors[item.dataIndex];
                                        }
                                    }
                                },
                                data: []
                            }]
                        })
                        .setIn(['series', 0, 'data'], apdexsArr)
                        .setIn(['series', 0 , 'name'],  this.props.type == 'browse' ? locale('浏览量PV') : locale('点击数'))
                        .toJS()}
                    theme={theme}    
                />;

            case 3: return <BarChart
                chartId={`trend-${itemId}-${activeTrend}`}
                options={config.get('default').mergeDeep(config.get('throughput'))
                    .mergeDeep({
                        color: themeChange('performanceTrendColor_3',theme),
                        legend: {
                            textStyle: {color: themeChange('legendTextColor',theme)}
                        }
                    })
                    .setIn(['xAxis', 0, 'data'], trend.thruput.map(item => {
                        const timeDiff = item.endTime - item.startTime;
                        if (timeDiff <= 1800000) {
                            return moment(item.startTime).format('HH:mm');
                        } else {
                            return moment(item.startTime).format('MM-DD HH:mm');
                        }
                    }))
                    .setIn(['series', 0, 'data'], trend.thruput)
                    .setIn(['series', 1, 'data'], trend.clickNum)
                    .toJS()}
                theme={theme}    
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