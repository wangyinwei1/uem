import React from 'react';
import {
    BarChart,
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';

class BarChart2 extends BarChart {
    handleClickEcharts(params) {
        this.props.handleClick(params);
    }
}
export default class Trend extends React.Component {
    clickChart(params) {
        const {
            sessionCount,
            changeCurrent,
        } = this.props;
        const { dataIndex } = params;
        changeCurrent({
            current: sessionCount[dataIndex]
        });
    }
    render() {
        const { 
            itemId,
            sessionCount,
        } = this.props;
        
        return (
            <div className={styles['trend']}>
                <div className={cls('tile-body')}>
                    <BarChart2 handleClick={this.clickChart.bind(this)} chartId={`userTrend-${itemId}`} options={config.get('default').mergeDeep(config.get('trend'))
                        .setIn(['xAxis', 0, 'data'], sessionCount.map(item => moment(item.time).format('MM-DD')))
                        .setIn(['series', 0, 'data'], sessionCount.map(item => item.value))
                        .toJS()}
                    />
                </div>
            </div>
        );
    }
}