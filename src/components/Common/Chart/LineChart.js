import React from 'react';
import Chart from './Chart';
import { inject,observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
// import cookies from '../../../utils/cookies';

// linechart 和 barChart 共用的
function lineBarFormatter(params, ticket, callback) {
    const description = params[0].data.description;
    const text = (description === undefined ? '时间段:' : description);
    // const ntimesParse = params[0].data.timesParse;
    const ntimeParse =  (`${moment(params[0].data.startTime).format("MM-DD HH:mm")} ${locale('至')} ${moment(params[0].data.endTime).format("MM-DD HH:mm")}`)
    return `
         <ul>
             <li><span>  ${ ntimeParse && typeof ntimeParse !== "undefined" ? text + ' ' + ntimeParse : ""} </span></li>
             ${params.map((val, index) => {
            return `<li>
                    <span style="background:${val.color};display:inline-block;height:10px;width:10px;border-radius:50%"></span>
                    <span>${val.seriesName} : ${val.value == null ? locale("暂无数据") : val.value}</span>
                 </li>`
        }).join('')}
         </ul>`;
}

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
    tooltip: {
        formatter: function (params, ticket, callback) {
            return lineBarFormatter(params, ticket, callback)
        },
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
        },
    }],
    color: ['#66dc6a', '#00c0ff'],
    // series: [
    //     {
    //         name: '今日',
    //         type: 'line',
    //         symbol: 'circle',
    //         smooth: true,
    //         showSymbol: false,
    //         data: []
    //     },
    //     {
    //         name: '昨日',
    //         type: 'line',
    //         symbol: 'circle',
    //         smooth: true,
    //         showSymbol: false,
    //         data: []
    //     }
    // ]
});


class LineChart extends Chart {
    constructor(props) {
        super(props);
        this.type = 'LineChart';
        this.defaultOptions = defaultOptions;
        // console.log('[chart props options]:',this.options.toJS());
    }
}

export default LineChart;