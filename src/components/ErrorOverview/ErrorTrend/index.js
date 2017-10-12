import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import styles from './index.scss';
import basicConfig from './basicConfig';
// import './index.scss';


class ErrorTrend extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getErrorTrend } = this.props;
        getErrorTrend({
            metrics: JSON.stringify(['pv', 'clickNum', 'errorCount'])
        });
    }
    render() {
        const trend = this.props.errorTrend;
        let yAxisMax1, yAxisMax2;
        if (trend.clickNum && Math.max.apply(null, trend.clickNum.map((item) => item.value)) < 3) {
            yAxisMax1 = 3;
        }
        if (trend.errorCount && Math.max.apply(null, trend.errorCount.map((item) => item.value)) < 1) {
            yAxisMax2 = 1;
        }
        // 性能趋势的配置
        let optionsPC = basicConfig.mergeDeep({
            legend: {
                data: [{
                    name: locale('浏览量PV')
                }, {
                    name: locale('点击数')
                }, {
                    name: locale('出错次数')
                }],
            },
            xAxis: [{
                data: trend.errorCount && trend.errorCount.map((val, i) => {
                    let selectTime = trend.errorCount[i].endTime - trend.errorCount[i].startTime;
                    if (selectTime <= 1800000) {
                        //选择一天
                        return moment(val.startTime).format("HH:mm");
                    } else {
                        return moment(val.startTime).format("MM-DD HH:mm");
                    }
                })
            }],
            series: [
                {
                    name: locale('浏览量PV'),
                    data: trend.pv
                },
                {
                    name: locale('点击数'),
                    data: trend.clickNum
                },
                {
                    name: locale('出错次数'),
                    data: trend.errorCount
                }
            ]
        })

        let optionsMobile = basicConfig.mergeDeep({
            legend: {
                data: [{
                    name: locale('错误数')
                }, {
                    name: locale('点击数')
                }],
            },
            xAxis: [{
                data: trend.errorCount && trend.errorCount.map((val, i) => {
                    let selectTime = trend.errorCount[i].endTime - trend.errorCount[i].startTime;
                    if (selectTime <= 1800000) {
                        //选择一天
                        return moment(val.startTime).format("HH:mm");
                    } else {
                        return moment(val.startTime).format("MM-DD HH:mm");
                    }
                })
            }],
            series: [
                {
                    name: locale('错误数'),
                    type: 'bar',
                    data: trend.errorCount,
                    yAxisIndex: 1
                },
                {
                    name: locale('点击数'),
                    data: trend.clickNum
                }
            ]
        })
        let options = sessionStorage.getItem('UEM_platfrom') == 'pc' ? optionsPC : optionsMobile;
        return (
            <div>
                <Row>
                    <Col className={styles['error-trend']}>
                        <div className={cls('tile-head')}>{locale('错误趋势')}</div>
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