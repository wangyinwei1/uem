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
        // debugger
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
        // console.log('newConfig是---',newConfig.toJS(),newValue);
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
        console.log('newConfig-----',newClickConfig);
        const initialConfig = config.get('default').mergeDeep(config.get('trend'))
                        .setIn(['xAxis', 0, 'data'], sessionCount.map(item => moment(item.time).format('MM-DD')))
                        .setIn(['series', 0, 'data'], sessionCount.map(item => item.value))
                        .toJS();
        // const option = Object.keys(newClickConfig).length > 0 ? newClickConfig : initialConfig;
        const option = initialConfig; 
        // console.log('newConfig, initialConfig------------',newClickConfig, initialConfig);        
    // debugger
        // console.log('sessionCount',sessionCount);
        // originSessionCount = immutable.fromJS(sessionCount);
        // // 最后一条条形图的颜色不同
        // if(sessionCount.length > 0) {
        //     const value = originSessionCount[sessionCount.length-2].value;
        //     const lastBarValue = value !== undefined && typeof(value) !== 'object' ? sessionCount[sessionCount.length-2].value : '';
        //     debugger
        //     const updateValue ={
        //     value: lastBarValue,
        //     itemStyle: {
        //         mormal: {
        //             color: '#9bcb29'
        //         }
        //     }
        // }
        // _.assign(sessionCount[sessionCount.length-2], {'value' : updateValue});
        // console.log('sessionCount----',sessionCount);
        // }
       
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