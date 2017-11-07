import React from 'react';
import Chart from './Chart';
import { observer, inject } from 'mobx-react';

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

const defaultOptions = Immutable.fromJS({
    title: {
        text: '柱状图' 
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
        // barWidth设置后barGap设置无效
        // barWidth: 20,
        barGap: 20,
        // itemStyle: {
        //     normal: {
        //         color: function (value) {
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
        // this.theme = this.props.frameStore.theme;
    }
    // @override
    // draw() {
    //     return (
    //         <div>{this.chartId}</div>
    //     );
    // }
}

export default BarChart;