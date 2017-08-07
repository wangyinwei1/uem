import React from 'react';
import styles from './index.scss';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';


class Trend extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { onGetErrorDetailTrend } = this.props;
        onGetErrorDetailTrend({
            summaryId: this.props.summaryId
        });
    }
    render() {
        const errorDetailTrend = this.props.errorDetailTrend;
        const { itemId } = this.props;
        // let yAxisMax1,yAxisMax2;
        // if ( trend.clickNum && Math.max.apply(null, trend.clickNum.map((item) => item.value)) < 3) {
        //     yAxisMax1 = 3;
        // }else{ }

        // if (trend.errorCount && Math.max.apply(null, trend.errorCount.map((item) => item.value)) < 1) {
        //     yAxisMax2 = 1;
        // } else { }

        // 性能趋势的配置
        let options = Immutable.fromJS({
            title: {
                text: locale('错误趋势图解'),
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{
                    name: locale('错误数'),
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
                data: errorDetailTrend.errorCount && errorDetailTrend.errorCount.map((val, i) => {
                    let selectTime = errorDetailTrend.errorCount[i].endTime - errorDetailTrend.errorCount[i].startTime;
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
            color: ['#66dc6a'],
            series: [
                {
                    name: locale('错误数'),
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: errorDetailTrend.errorCount
                }
            ]
        })

        return (
            <div className={styles['trend']}>
                <div className={cls('tile-body')}>
                    <div>
                        {/*<Row>
                            <Col className={styles['errorDetail-trend']}>
                                <div className={cls('tile-head')}>错误趋势图解</div>
                                <div className={cls('tile-body')}>*/}
                        <LineChart group="ErrorDetailTrend" chartId={`ErrorDetailTrend-${itemId}`} options={options} />
                        {/*</div>
                            </Col>
                        </Row>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Trend;