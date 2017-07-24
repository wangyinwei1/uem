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
    }],
    series: [{
        // name: this.pillarState == 'avgRspTime' ? UEM_i18n.average_response_time[UEM_lang] : 'Apdex',
        type: 'bar',
        barWidth: 20,
        // itemStyle: {
        //     normal: {
        //         color: function (value) {
        //             debugger
        //             // let opacity = Number((value.data / maxUv).toFixed(2));
        //             // return UYUN.getTheme('performance-pillar1') + opacity + ")";
        //         }
        //     }
        // },

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