import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import styles from './index.scss';

// import styles from './index.scss';

class UserTrend extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getUserTrend } = this.props;
        getUserTrend({
            startTime: moment().subtract(this.props.startTime.type, this.props.startTime.units).valueOf(),
            metrics: JSON.stringify(['pv', 'clickNum', 'sessionCount'])
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

        // 性能趋势的配置
        let options = Immutable.fromJS({
            title: {
                text: locale('错误趋势图'),
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{
                    name: locale('浏览量PV'),
                    icon: 'circle'
                }, {
                    name: locale('点击数'),
                    icon: 'circle'
                }, {
                    name: locale('会话数'),
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
            yAxis: [{
                minInterval: 1,
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
                    name: locale('浏览量PV'),
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: trend.pv
                },
                {
                    name: locale('点击数'),
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: trend.clickNum
                },
                {
                    name: locale('会话数'),
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: trend.sessionCount
                }
            ]
        })

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