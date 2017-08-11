import React from 'react';
import Chart from './Chart';
// import { countryNameInCN,countryNameInEN } from './WorldCountryName'

function randomData() {
    return Math.round(Math.random() * 1000);
}
// export function mapTooltipFormatter(params, ticket, callback) {
//         if (isNaN(params.value)) {
//             params.value = UEM_i18n.no_data[UEM_lang];
//             return "";
//         }
//         if (!params.data.hasOwnProperty('operCount')) {
//             params.data.operCount = "";
//         }
//         const paramsCg = [
//             { key: "name", name: UEM_i18n.regions[UEM_lang] },
//             { key: "apdex", name: UEM_i18n.apdex[UEM_lang] },
//             // { key: "operCount", name: UEM_i18n.actions[UEM_lang] },
//             { key: "errorCount", name: UEM_i18n.err_count[UEM_lang] },
//             { key: "sessionCount", name: UEM_i18n.sessions[UEM_lang] },
//             { key: 'avgRspTime', name: UEM_i18n.average_response_time[UEM_lang] },
//             { key: 'occurErrorUserRate', name: UEM_i18n.user_error_rate[UEM_lang] },
//             { key: 'effectedUserNum', name: UEM_i18n.impacted_users[UEM_lang] },
//             { key: 'uv', name: UEM_i18n.uv[UEM_lang] },
//         ];
//         return paramsCg.map(val => {

//             return typeof params.data[val.key] != 'undefined' ? `${val.name} : ${params.data[val.key]} <br>` : ``;
//         }).join(' ')
//     }

// export function mapTooltipFormatterForWorldMap(params, ticket, callback) {
//         if (isNaN(params.value)) {
//             params.value = UEM_i18n.no_data[UEM_lang];
//             return "";
//         }
//         for (let i in countryNameInEN) {
//             if (countryNameInEN[i] == params.name) {
//                 params.data.name = countryNameInCN[i]
//             }
//         }
//         const paramsCg = [
//             { key: "name", name: UEM_i18n.regions[UEM_lang] },
//             { key: "apdex", name: UEM_i18n.apdex[UEM_lang] },
//             { key: "errorCount", name: UEM_i18n.err_count[UEM_lang] },
//             { key: "sessionCount", name: UEM_i18n.sessions[UEM_lang] },
//             { key: 'avgRspTime', name: UEM_i18n.average_response_time[UEM_lang] },
//             { key: 'occurErrorUserRate', name: UEM_i18n.user_error_rate[UEM_lang] },
//             { key: 'effectedUserNum', name: UEM_i18n.impacted_users[UEM_lang] },
//             { key: 'uv', name: UEM_i18n.uvs[UEM_lang] },
//         ];
//         return paramsCg.map(val => {
//             return typeof params.data[val.key] != 'undefined' ? `${val.name} : ${params.data[val.key]} <br>` : ``;
//         }).join(' ')
//     }

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
    visualMap: [{
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
        itemWidth: 10,
        itemHeight: 118,
        // inRange: {
        //     color: [, , '#000'],
        //     symbolSize: [60, 200]
        // },
        calculable: false
    }],
    tooltip: {
        trigger: 'item',
    },
    xAxis: [{
        axisLine: {
            show: false
        }
    }],
    yAxis: [{
        axisLine: {
            show: false
        }
    }],
    series: [{
        name: '中国',
        type: 'map',
        mapType: 'china',
        zoom: 1,
        left: 'center',
        top: 'center',
        showLegendSymbol: false,
        // selectedMode: 'multiple',
        data: [ ],
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

    // componentWillReceiveProps(nextprops){
    //     debugger
    //     console.log('nextprops',nextprops);
    //         this.props = nextprops;
    //         this.defaultOptions = this.defaultOptions.mergeDeep({
    //             tooltip: {formatter: nextprops.mapState == 'china' ? mapTooltipFormatter : mapTooltipFormatterForWorldMap }
    //         })
    // }
    // @override
    handleClickEcharts(params){
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