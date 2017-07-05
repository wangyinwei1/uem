import React from 'react';
import Chart from './Chart';
// import { override } from 'core-decorators';

const defaultOptions = Immutable.fromJS({
    title: { text: '柱状图' },
    // tooltip: {},
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        barWidth: 18,
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
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