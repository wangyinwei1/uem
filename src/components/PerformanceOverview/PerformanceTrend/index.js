import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import styles from './index.scss';

// import styles from './index.scss';

class PerformanceTrend extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getPerformanceTrend, getPerformanceApdex } = this.props;
        getPerformanceTrend();
    }
    render() {
        let trend = this.props.performanceTrend;
        let yAxisMax1, yAxisMax2;
        if (trend.clickNum && Math.max.apply(null, trend.clickNum.map((item) => item.value)) < 3) {
            yAxisMax1 = 3;
        } else { }

        if (trend.avgRspTime && Math.max.apply(null, trend.avgRspTime.map((item) => item.value)) < 1) {
            yAxisMax2 = 1;
        } else { }

        // 性能趋势的配置
        let options = Immutable.fromJS({
            title: {
                text: '性能趋势图',
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{
                    name: '浏览量PV',
                    icon: 'circle'
                }, {
                    name: '点击数',
                    icon: 'circle'
                }, {
                    name: '响应时间',
                    icon: 'circle'
                }],
                top: 15,
                right: 15,
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: [{
                type: 'category',
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
            // xAxis: {
            //     type: 'category',
            //     data: _.range(1, 25),
            //     axisLine: {
            //         show: false
            //     },
            //     axisTick: {
            //         show: false
            //     }
            // },
            color: ['#ffeb0b', '#66dc6a', '#00c0ff'],
            series: [
                {
                    name: '浏览量PV',
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: trend.pv
                },
                {
                    name: '点击数',
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: trend.clickNum
                },
                {
                    name: '响应时间',
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: trend.avgRspTime
                }
            ]
        })
        // apdex的配置
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


        return (
            <div>
                <Row>
                    <Col className={styles['performance-trend']} style={{ width: sessionStorage.UEM_platform !== 'pc' ? '100%' : '60%' }}>
                        <div className={cls('tile-head')}>性能趋势</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="PerformanceTrend" chartId="PerformanceTrend" options={options} />
                        </div>
                    </Col>
                    {sessionStorage.UEM_platform == 'pc' && <Col className={styles['apdex-chart']}>
                        <div className={cls('tile-head')}>Apdex指数</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="apedxTrend" chartId="apedxTrend" options={apdexOptions} />
                        </div>
                    </Col>}
                </Row>

            </div>
        );
    }
}

export default PerformanceTrend;