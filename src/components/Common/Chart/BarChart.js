import React from 'react';
import Chart from './Chart';
// import { override } from 'core-decorators';

const defaultOptions = Immutable.fromJS({
    title: {
        text: '柱状图' 
    },
    xAxis: [{
        type: 'category',
        data: [],
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    }],
    yAxis: [{
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    }]
});

class BarChart extends Chart {
    constructor(props) {
        super(props);
        this.type = 'BarChart';
        this.defaultOptions = defaultOptions;
    }
    // @override
    // draw() {
    //     return (
    //         <div>{this.chartId}</div>
    //     );
    // }
}

export default BarChart;