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
    
    clickChart(params) {
        const {
            sessionCount,
            changeCurrent,
        } = this.props;
        const { dataIndex } = params;
        const newValue = [];
        sessionCount.length > 0 && sessionCount.map((item,index) => newValue.push({'value':item.value}) )

        const newConfig = config.get('default').mergeDeep(config.get('trend'))
            .setIn(['xAxis', 0, 'data'], sessionCount.map(item => moment(item.time).format('MM-DD')))
            .updateIn(['series',0,'data'], () => {
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
            }).toJS();
        changeCurrent({
            current: sessionCount[dataIndex],
            config: newConfig
        });
    }
    // componentDidMount(){
    //     console.log('didMount时的sessionCount',this.props.sessionCount);
    // }
    render() {
        const { 
            itemId,
            sessionCount,
            newClickConfig
        } = this.props;
        const initialConfig = config.get('default').mergeDeep(config.get('trend'))
                        .setIn(['xAxis', 0, 'data'], sessionCount.map(item => moment(item.time).format('MM-DD')))
                        .setIn(['series', 0, 'data'], sessionCount.map(item => item.value))
                        .toJS();
        // const option = Object.keys(newClickConfig).length > 0 ? newClickConfig : initialConfig;
        // console.log('newConfig, initialConfig------------',newClickConfig, initialConfig);        
        return (
            <div className={styles['trend']}>
                <div className={cls('tile-body')}>
                    <BarChart2 handleClick={this.clickChart.bind(this)} 
                    chartId={`userTrend-${itemId}`} 
                    options={initialConfig}
                    />
                </div>
            </div>
        );
    }
}