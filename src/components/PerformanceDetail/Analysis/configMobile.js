//
var itemStyle = {
    normal: {
        barBorderRadius: 10,
        borderWidth: 10
    },
    emphasis: {
        barBorderWidth: 1,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.5)'
    }
};

function lineBarFormatter(params, ticket, callback) {
    const formatterParamsMobile = [
        { name: '请求URL', value: 'www.uyun.cn' },
        { name: '响应时间', value: '1.2s' },
        { name: '首字节时间', value: '50ms' },
        { name: 'HTTP方法', value: '' },
        { name: 'HTTP状态码', value: '200' },
        { name: '发送的字节数', value: '12kb' },
        { name: '接收的字节数', value: '15kb' }
    ]
    // const description = params[0].data.description;
    // const text = (description === undefined ? UEM_i18n.time_range[UEM_lang] : description);
    // const ntimesParse = params[0].data.timesParse;
    // return `
    //      <ul>
    //          <li><span>  ${ ntimesParse && typeof ntimesParse != "undefined" ? text + ' ' + params[0].data.timesParse : ""} </span></li>
    //          ${params.map((val, index) => {
    //         return `<li>
    //                 <span style="background:${val.color};display:inline-block;height:10px;width:10px;border-radius:50%"></span>
    //                 <span>${val.seriesName} : ${val.value == null ? UEM_i18n.no_data[UEM_lang] : val.value}</span>
    //              </li>`
    //     }).join('')}
    //     </ul>`
    return `
         <ul>
             <li><span> test </span></li>
             ${formatterParamsMobile.map((val, index) => {
            return `<li>
                    <span style="background:#04a1ea;display:inline-block;height:10px;width:10px;border-radius:50%"></span>
                    <span>${val.name} : ${val.value == null ? UEM_i18n.no_data[UEM_lang] : val.value}</span>
                 </li>`
        }).join('')}
        </ul>`
}

export default Immutable.fromJS({
    title: {
        text: '阶梯瀑布图',
    },
    color: ['#fc6', '#03a9f4', '#ff0000'],
    tooltip: {
        trigger: 'item',
        // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        // },
        // formatter: function (params) {
        //     var tar;
        //     if (params[1].value != '-') {
        //         tar = params[1];
        //     }
        //     else {
        //         tar = params[0];
        //     }
        //     return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        // }
        formatter: lineBarFormatter()
    },
    legend: {
        data: ['支出', '收入', '截止'],
        // color: ['red','green','yellow','black']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: [{
        type: 'category',
        splitLine: { show: true },
        data: function () {
            var list = [];
            for (var i = 1; i <= 11; i++) {
                list.push('11月' + i + '日');
            }
            return list;
        }()
    }],
    xAxis: {
        type: 'value'
    },
    series: [

        {
            name: '辅助',
            type: 'bar',
            stack: 'one',
            tooltip: { show: false },
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
        },

        {
            name: '收入',

            type: 'bar',
            stack: 'one',
            itemStyle: itemStyle,
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
        },
        {
            name: '支出',
            type: 'bar',
            stack: 'one',
            itemStyle: itemStyle,
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
        },
        {
            name: '特殊',
            type: 'bar',
            stack: 'one',
            tooltip: { show: false },
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(255,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [900, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '收入',
            type: 'bar',
            stack: 'one',
            itemStyle: itemStyle,
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            barWidth: 10,
            data: [100, '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
        },
        {
            name: '截止',
            type: 'line',
            stack: '总量',
            // itemStyle: itemStyle,
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            axisLabel: {
                formatter: 'just test'
            },
            data: [2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500]
        }
    ]
});
