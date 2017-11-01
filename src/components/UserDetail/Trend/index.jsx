import React from 'react';
import {
    BarChart,
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';
import immutable from 'immutable';

class BarChart2 extends BarChart {
    handleClickEcharts(params) {
        this.props.handleClick(params);
    }
}
export default class Trend extends React.Component {
    newOption = {};
    state = {
        firstLoad : true
    }
    clickChart(params) {
        const {
            sessionCount,
            changeCurrent,
        } = this.props;
        this.setState({
            firstLoad : false
        });
        const { dataIndex } = params;
        const newValue = [];
        sessionCount.length > 0 && sessionCount.map((item,index) => newValue.push({'value':item.value}) )
        const newConfig = config.get('default').mergeDeep(config.get('trend'))
            .setIn(['xAxis', 0, 'data'], sessionCount.map(item => moment(item.time).format('MM-DD')))
            .updateIn(['series',0,'data'], () => 
            {
                return newValue.map((val,i) => {
                    const itemStyle = {
                        normal: {
                            color : '#a2b17e'
                        }
                    };
                    if( i == dataIndex ){
                        itemStyle.normal.color = '#9bcb29'
                    }
                    return immutable.Map(val).merge({'itemStyle': itemStyle }).toJS()
                })
            }
        ).toJS();
            this.newOption = newConfig; 
        changeCurrent({
            current: sessionCount[dataIndex]
        });
    }
    render() {
        const { 
            itemId,
            sessionCount
        } = this.props;
        // sessionCount.map((item,index) => {
        //     item.startTime = item.time;
        //     item.endTime = moment(item.time).add(1, 'days').valueOf();
        //     return item;
        // });
        let initialConfig = {} ;
        // 第一次进来，条形图最后一条的颜色是不同的
        if( sessionCount.length > 0 && this.state.firstLoad ){
            const newValue = [];
            sessionCount.map((item,index) => newValue.push({'value':item.value,'startTime':item.startTime,'endTime':item.endTime }) );
            initialConfig =  config.get('default').mergeDeep(config.get('trend'))
            .setIn(['xAxis', 0, 'data'], sessionCount.map(item => moment(item.time).format('MM-DD')))
            .updateIn(['series',0,'data'], () =>{
                return newValue.map((val,i) => {
                    const itemStyle = {
                        normal: {
                            color : '#a2b17e'
                        }
                    };
                    if( i == 29 ){
                        itemStyle.normal.color = '#9bcb29'
                    }
                    return immutable.Map(val).merge({'itemStyle': itemStyle }).toJS()
                })
            }).toJS();
        }else {
            initialConfig = config.get('default').mergeDeep(config.get('trend'))
                        .setIn(['xAxis', 0, 'data'], sessionCount.map(item => moment(item.time).format('MM-DD')))
                        .setIn(['series', 0, 'data'], sessionCount)
                        .toJS();
        }
        const option = Object.keys(this.newOption).length > 0 ? this.newOption : initialConfig;
        return (
            <div className={styles['trend']}>
                <div className={cls('tile-body')}>
                    <BarChart2 handleClick={this.clickChart.bind(this)} 
                    chartId={`userTrend-${itemId}`} 
                    options={option}
                    />
                </div>
            </div>
        );
    }
}