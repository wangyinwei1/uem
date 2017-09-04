import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import styles from './index.scss';
import basicConfig from './basicConfig';

// import styles from './index.scss';

class PerformanceTrend extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getPerformanceTrend } = this.props;
        getPerformanceTrend({
            metrics: sessionStorage.getItem('UEM_platform') == 'pc' ? JSON.stringify(['pv','clickNum','avgRspTime','apdex']) : JSON.stringify(['avgUiRspTime','avgRspTime','thruput'])
        });
    }
    render() {
        let trend = this.props.performanceTrend;
        let platform = this.props.platform;
        // let yAxisMax1, yAxisMax2;
        // if (trend.clickNum && Math.max.apply(null, trend.clickNum.map((item) => item.value)) < 3) {
        //     yAxisMax1 = 3;
        // } else { }
        // if (trend.avgRspTime && Math.max.apply(null, trend.avgRspTime.map((item) => item.value)) < 1) {
        //     yAxisMax2 = 1;
        // } else { }

        // pc性能趋势的配置
        let options = basicConfig.mergeDeep({
            legend: {
                data: [{name:locale('浏览量PV')},{name: locale('点击数')},{name: locale('响应时间')}]
            },
            xAxis: [{
                data: trend.avgRspTime && trend.avgRspTime.map((val, i) => {
                    let selectTime = trend.avgRspTime[i].endTime - trend.avgRspTime[i].startTime;
                    if (selectTime <= 1800000) {
                        //选择一天
                        return moment(val.startTime).format("HH:mm");
                    } else {
                        return moment(val.startTime).format("MM-DD HH:mm");
                    }
                })
            }],
            series: [
                {name: locale('浏览量PV'),data: trend.pv},
                {name: locale('点击数'),data: trend.clickNum},
                {name: locale('响应时间'), data: trend.avgRspTime}
            ]
        })
        // pc的apdex的配置
        let apdexOptions = Immutable.fromJS({
            title: { text: '' },
            legend: {
                data: [{}, {}]
            },
            grid: [{
                left: '-3%',
                top: '8%',
                bottom: '8%'
            }],
            // 类目轴
            xAxis: [{
                type: 'category',
                data: trend.apdex && trend.apdex.map((val, i) => {
                    let selectTime = trend.apdex[i].endTime - trend.apdex[i].startTime;
                    if (selectTime <= 1800000) {
                        //选择一天
                        return moment(val.startTime).format("HH:mm");
                    } else {
                        return moment(val.startTime).format("MM-DD HH:mm");
                    }
                }),
                axisLine: {
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: '#236592',
                        width: 1
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 11,
                        color: '#ffffff',
                    }
                }
            }],
            // 数值型坐标轴默认参数
            yAxis: [{
                type: 'value',
                max: 1,
                splitNumber: 10,
                minInterval: 0.1,
                min: 0,
                axisLabel: {
                    formatter: function (value) {
                        let showVal = [1, 0.5, 0.8, 0];
                        return showVal.filter(val => {
                            return value == val;
                        })[0]
                    }
                },
                splitLine: {
                    show: false,
                },
                nameTextStyle: {
                    fontSize: 11,
                    color: '#ffffff'
                },
                splitNumber: 10,
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: [
                            'rgba(66,60,83,0.8)', 'rgba(66,60,83,0.8)', 'rgba(66,60,83,0.8)', 'rgba(66,60,83,0.8)', 'rgba(66,60,83,0.8)',
                            'rgba(65,89,77,0.8)', 'rgba(65,89,77,0.8)', 'rgba(65,89,77,0.8)',
                            'rgba(29,75,76,0.8)', 'rgba(29,75,76,0.8)', 'rgba(29,75,76,0.8)'
                        ]
                    }
                }
            }],
            line: {
                symbol: 'circle',  // 拐点图形类型
                symbolSize: 5   // 拐点图形大小
            },
            color: ['yellow', ''],
            series: [
                {
                    name: '',
                    type: 'line',
                    symbol: 'circle',
                    smooth: true,
                    showSymbol: false,
                    data: trend.apdex
                },
                {
                    name: '',
                    type: 'line',
                }],
            // backgroundColor: 'rgba(0,0,0,0.2)',
        })

        // mobile性能趋势的配置
        let mobileOptions = basicConfig.mergeDeep({
            legend: {
                data: [{name:locale('平均UI响应时间')},{name: locale('平均HTTP响应时间')},{name: locale('吞吐率')}]
            },
            xAxis: [{
                data: []
                // trend.avgRspTime && trend.avgRspTime.map((val, i) => {
                //     let selectTime = trend.avgRspTime[i].endTime - trend.avgRspTime[i].startTime;
                //     if (selectTime <= 1800000) {
                //         //选择一天
                //         return moment(val.startTime).format("HH:mm");
                //     } else {
                //         return moment(val.startTime).format("MM-DD HH:mm");
                //     }
                // })
            }],
            series: [
                {name: locale('平均UI响应时间'),data:trend.avgUiRspTime},
                {name: locale('平均HTTP响应时间'),data: trend.avgRspTime},
                {name: locale('吞吐率'), data: trend.thruput}
            ]
        })
        
        return (
            <div>
                {platform == 'pc' ? 
                    <Row>  
                        <Col className={styles['performance-trend']} style={{ width:'60%'}}>
                            <div className={cls('tile-head')}>{locale('性能趋势')}</div>
                            <div className={cls('tile-body')}>
                                <LineChart group="performance" chartId="PerformanceTrend" options={options} />
                            </div>
                        </Col>
                        <Col className={styles['apdex-chart']}>
                            <div className={cls('tile-head')}>{locale('Apdex 指数')}</div>
                            <div className={cls('tile-body')}>
                                <LineChart group="performance" chartId="apedxTrend" options={apdexOptions} />
                            </div>
                        </Col> 
                    </Row> : 
                    <Row>
                        <Col className={styles['performance-trend']} style={{ width: '100%'}}>
                            <div className={cls('tile-head')}>{locale('性能趋势')}</div>
                            <div className={cls('tile-body')}>
                                <LineChart group="performance" chartId="PerformanceTrendMobile" options={mobileOptions} />
                            </div>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

export default PerformanceTrend;