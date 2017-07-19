import React from 'react';
import Chart from './Chart';

function randomData() {
    return Math.round(Math.random() * 1000);
}

// 全局地图图表配置
const defaultOptions = Immutable.fromJS({
    title: {
        show: false
    },
    // roam: true,
    // scaleLimit: {
    //     min: 1,
    //     max: 2
    // },
    visualMap: {
        itemWidth: 9,
        itemHeight: 118,
        min: 0,
        max: 2500,
        borderWidth: 0,
        // text: ['用户分布', null],
        inRange: {
            color: ['#195d95', '#1767a2', '#1470ae', '#1275b5', '#0e83c7', '#0a90d6', '#0997de', '#03a9f5'],
        },
        textStyle: {
            color: '#fff'
        },
        left: 15,
        bottom: 15,
        // inRange: {
        //     color: [, , '#000'],
        //     symbolSize: [60, 200]
        // },
        calculable: false
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}'
    },
    xAxis: {
        axisLine: {
            show: false
        }
    },
    yAxis: {
        axisLine: {
            show: false
        }
    },
    series: [{
        name: '中国',
        type: 'map',
        mapType: 'china',
        zoom: 1,
        left: 'center',
        top: 'center',
        showLegendSymbol: false,
        // selectedMode: 'multiple',
        data: [
            // { name: '陕西', value: randomData() },
            // { name: '吉林', value: randomData() },
            // { name: '福建', value: randomData() },
            // { name: '贵州', value: randomData() },
            // { name: '广东', value: randomData() },
            // { name: '青海', value: randomData() },
            // { name: '西藏', value: randomData() },
            // { name: '四川', value: randomData() },
            // { name: '宁夏', value: randomData() },
            // { name: '海南', value: randomData() },
            // { name: '台湾', value: randomData() },
            // { name: '香港', value: randomData() },
            // { name: '澳门', value: randomData() }
        ],
        label: {
            normal: {
                textStyle: {
                    color: '#fff'
                }
            },
            emphasis: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        itemStyle: {
            normal: {
                areaColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#5fbfee'
            },
            emphasis: {
                areaColor: '#03a9f5',
                borderColor: '#fff',
                borderWidth: 1,
                // shadowColor: '#5fbfee',
                // shadowBlur: 1,
                // shadowOffsetX: 1,
                // shadowOffsetY: 1,
                // opacity: 0.8
            }
        }
    }]
});

class MapChart extends Chart {
    updateOptions = {};
    constructor(props) {
        super(props);
        this.type = 'MapChart';
        // Immutable.fromJS(props.options).updateIn(['series',0,'mapType'],()=>'world').toJS();
        this.defaultOptions = defaultOptions;
    }
    // @override
    handleClickEcharts(params){
        console.log('地图里的params:',params);
        if( typeof this.props.clickUpdateMap == 'function' ){
            this.props.clickUpdateMap(params);
        }else{
            return
        }
    }
    
    // @override
    // draw() {
    //     return (
    //         <div>{this.chartId}</div>
    //     );
    // }
}

export default MapChart;