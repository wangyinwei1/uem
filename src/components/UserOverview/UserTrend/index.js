import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import styles from './index.scss';
import baseConfig from './basicConfig';

// import styles from './index.scss';

class UserTrend extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getUserTrend } = this.props;
        getUserTrend({
            metrics: sessionStorage.getItem('UEM_platform') == 'pc' ? JSON.stringify(['pv', 'clickNum', 'sessionCount']) : JSON.stringify(['clickNum', 'uv', 'sessionCount'])
        });
    }
    render() {
        const trend = this.props.userTrend;
        let yAxisMax1, yAxisMax2;
        if (trend.clickNum && Math.max.apply(null, trend.clickNum.map((item) => item.value)) < 3) {
            yAxisMax1 = 3;
        } else { }

        if (trend.sessionCount && Math.max.apply(null, trend.sessionCount.map((item) => item.value)) < 3) {
            yAxisMax2 = 3;
        } else { }

        // pc性能趋势的配置
        let optionsPC = baseConfig.mergeDeep({
            legend: {
                data: [{
                    name: locale('浏览量PV'),
                }, {
                    name: locale('点击数'),
                }, {
                    name: locale('会话数'),
                }]
            },
            xAxis: [{
                data: trend.sessionCount && trend.sessionCount.map((val, i) => {
                    let selectTime = trend.sessionCount[i].endTime - trend.sessionCount[i].startTime;
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
                    name: locale('会话数'),
                    type: 'bar',
                    data: trend.sessionCount,
                    yAxisIndex: 1
                }
            ]
        })
        // mobile性能趋势的配置
        let optionsMobile = baseConfig.mergeDeep({
            legend: {
                data: [{
                    name: locale('点击数'),
                }, {
                    name: locale('独立设备数'),
                }, {
                    name: locale('启动数'),
                }]
            },
            xAxis: [{
                data: trend.clickNum && trend.clickNum.map((val, i) => {
                    let selectTime = trend.clickNum[i].endTime - trend.clickNum[i].startTime;
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
                    name: locale('点击数'),
                    data: trend.clickNum
                },
                {
                    name: locale('独立设备数'),
                    data: trend.uv
                },
                {
                    name: locale('启动数'),
                    data: trend.sessionCount
                }
            ]
        })
        let options = sessionStorage.getItem('UEM_platform') == 'pc' ? optionsPC : optionsMobile;
        return (
            <div>
                <Row>
                    <Col className={styles['user-trend']}>
                        <div className={cls('tile-head')}>{locale('错误趋势')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="UserTrend" chartId="UserTrend" options={options} />
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

export default UserTrend;