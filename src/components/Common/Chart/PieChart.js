import React from 'react';
import Chart from './Chart';

function randomData() {
    return Math.round(Math.random() * 1000);
}

// 全局地图图表配置
const defaultOptions = Immutable.fromJS({
     tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        textStyle: {color: '#fff'},
        itemWidth:10,
        itemHeight:10,
        left:'right',
        top: 'center',
        data:[]
    },
    color: [ '#03a9f4', '#ffa60b','#66dc6b','#bf7afa','#fc615d','#ffeb0b' ],
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['30%', '40%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                // {value:335, name:'直接访问'},
                // {value:310, name:'邮件营销'},
                // {value:234, name:'联盟广告'},
                // {value:135, name:'视频广告'},
                // {value:1548, name:'搜索引擎'}
            ]
        }
    ]
});

class PieChart extends Chart {
    updateOptions = {};
    constructor(props) {
        super(props);
        this.type = 'PieChart';
        this.defaultOptions = defaultOptions;
    }   
}

export default  PieChart;