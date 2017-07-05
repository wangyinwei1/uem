import React from 'react';
import Chart from './Chart';

// 全局线形图表配置
const defaultOptions = Immutable.fromJS({
    title: {
        text: '分时趋势图 Demo',
        textStyle: {
            color: '#70c3fb',
            fontSize: 12
        },
        left: 15,
        top: 15
    },
    legend: {
        itemWidth: 8,
        itemHeight: 8,
        data: [{
            name: '今日',
            icon: 'circle'
        }, {
            name: '昨日',
            icon: 'circle'
        }],
        top: 15,
        right: 15,
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: {
        type: 'category',
        data: _.range(1, 25),
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true
        },
        min: 0,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    color: ['#66dc6a', '#00c0ff'],
    series: [
        {
            name: '今日',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            data: []
        },
        {
            name: '昨日',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            data: []
        }
    ]
});

class LineChart extends Chart {
    constructor(props) {
        super(props);
        this.type = 'LineChart';
        this.defaultOptions = defaultOptions;
    }
    // @override
    // draw() {
    //     return (
    //         <div>{this.chartId}</div>
    //     );
    // }
}

export default LineChart;