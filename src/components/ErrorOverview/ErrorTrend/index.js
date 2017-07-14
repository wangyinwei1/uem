import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import styles from './index.scss';

// import styles from './index.scss';

class ErrorTrend extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getErrorTrend } = this.props;
        getErrorTrend({
            startTime: moment().subtract(this.props.startTime.type, this.props.startTime.units).valueOf(),
            metrics: JSON.stringify(['pv','clickNum','errorCount'])
        });
    }
    render() {
        const trend = this.props.errorTrend;
        let yAxisMax1,yAxisMax2;
        if ( trend.clickNum && Math.max.apply(null, trend.clickNum.map((item) => item.value)) < 3) {
            yAxisMax1 = 3;
        }else{ }

        if (trend.errorCount && Math.max.apply(null, trend.errorCount.map((item) => item.value)) < 1) {
            yAxisMax2 = 1;
        } else { }
        
        // 性能趋势的配置
        let options = Immutable.fromJS({
            title: {
                text: '错误趋势图',
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
                },{
                    name: '出错次数',
                    icon: 'circle'
                }],
                top: 15,
                right: 15,
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis:{
                    type : 'category',
                    data : trend.errorCount && trend.errorCount.map((val, i) => {
                        let selectTime = trend.errorCount[i].endTime - trend.errorCount[i].startTime;
                        if (selectTime <= 1800000) {
                            //选择一天
                            return moment(val.startTime).format("HH:mm");
                        } else {
                            return moment(val.startTime).format("MM-DD HH:mm");
                        }
                    })
            },
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
            color: ['#ffeb0b','#66dc6a', '#00c0ff'],
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
                    name: '出错次数',
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: trend.errorCount
                }
            ]
        })

        return (
            <div>
                <Row>
                    <Col className={styles['error-trend']}>
                        <div className={cls('tile-head')}>错误趋势</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="ErrorTrend" chartId="ErrorTrend" options={options} />
                        </div>
                    </Col>
                    {/*<Col className={styles['apdex-chart']}>
                        <div className={cls('tile-head')}>Apdex指数</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="apedxTrend" chartId="apedxTrend" options={apdexOptions} />
                        </div>
                    </Col>*/}
                </Row>
                
            </div>
        );
    }
}

export default ErrorTrend;