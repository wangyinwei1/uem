import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';
import { Radio } from 'antd';
import { countryNameInCN, countryNameInEN } from '../../Common/Chart/WorldCountryName';
import { NameMap } from '../../Common/Chart/CityName';

const RadioGroup = Radio.Group;

class PerformanceMapChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMap: 'china',
            activePillar: sessionStorage.getItem('UEM_platform') == 'pc' ? 'avgRspTime' : 'avgUiRspTime',
            activeProvince: undefined,
            isSelectingCity: true
        };
    }
    tempConfig = config;
    componentDidMount() {
        const { getMapData } = this.props;
        getMapData({
            areaType: 'province',
            metrics: JSON.stringify([this.state.activePillar])
        });
    }
    changeMap(map) {
        let prevState = this.state.activeMap;
        let nextState = map;
        if (prevState == nextState) {
            return
        } else {
            this.setState({
                activeMap: map
            }, () => this.props.getMapData({
                areaType: map == 'china' ? 'province' : 'country',
                metrics: JSON.stringify([this.state.activePillar]),
                province: undefined
            }));
            if(this.state.activeProvince != undefined){
                this.setState({
                    isSelectingCity: true,
                    activeProvince: undefined
                });
                this.tempConfig = config;
            }
        }
        
        this.props.selectStatus(this.state.activePillar,map);
    }
    
    // componentWillReceiveProps(nextprops){
    //     if(this.props.mapData !== nextprops.mapData ){
    //         this.props = nextprops;
    //     }
    // }

    handleRadioSelect(e) {
        this.setState({
            activePillar: e.target.value
        }, () => this.props.getMapData({
            areaType: this.state.activeMap == 'china' ? 'province' : 'country',
            metrics: JSON.stringify([e.target.value]),
            province: this.state.activeProvince
        }));
        this.props.selectStatus(e.target.value,this.state.activeMap);
    }


    // 点击中国地图
    clickUpdateMap(params) {
        if (this.state.activeMap == 'china' && params.componentSubType == 'map' && params.name !== '台湾') {
            if (this.state.isSelectingCity && typeof params.value != "undefined" && !isNaN(params.value)) {
                this.setState({ isSelectingCity: false, activeProvince:params.name }, () => this.props.getMapData({
                    metrics: this.state.activePillar == 'avgRspTime' ? JSON.stringify(['avgRspTime']) : JSON.stringify(['apdex']),
                    areaType: 'province',
                    province: params.name
                }))
                this.tempConfig = config.updateIn(['china','series',0,'mapType'], () => params.name);
            } else if (!NameMap[params.name]) {
                this.setState({ isSelectingCity: true, activeProvince:undefined }, () => this.props.getMapData({
                    metrics: this.state.activePillar == 'avgRspTime' ? JSON.stringify(['avgRspTime']) : JSON.stringify(['apdex']),
                    areaType: 'province',
                    province: undefined
                }))
                this.tempConfig = config.updateIn(['china', 'series', 0, 'mapType'], () => 'china');
            }
        } else {
            console.log('该地区暂无法查看！',params);
        }
    }

    // 选择pc端还是移动端的radioGroup
    chooseRadioGroupForPlatform(){
        let platform = sessionStorage.getItem('UEM_platform');
        return (
            platform == 'pc' ?
                <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                    <Radio value={'avgRspTime'}>{locale('平均响应时间')}</Radio>
                    <Radio value={'apdex'}>Apdex</Radio>
                </RadioGroup>:
                <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                    <Radio value={'avgUiRspTime'}>{locale('平均UI响应时间')}</Radio>
                    <Radio value={'avgRspTime'}>{locale('平均HTTP响应时间')}</Radio>
                </RadioGroup>
                    
        )
    }

    render() {  
        const { activeMap,activePillar } = this.state;
        let pillarConfig, mapConfig, yAxisInCN=[],mapSeriesData = [];
        const yAxis = this.props.mapData.yAxis;
        const series = this.props.mapData.series;
        //  性能地图左下角的dataRange
        let apdex = Number(( JSON.parse(sessionStorage.UEM_deploy).apdex / 1000).toFixed(2));
        let apdex_4 = apdex*4;
        // if(sessionStorage.getItem('UEM_platform') == 'pc'){
        let splitListForRepTime = [
                { start:apdex_4, label: `不满意 (响应时间 >${apdex_4}s)`,color: '#ff5251' },
                { start:apdex, end:apdex_4, label: `可接受 (响应时间 ${apdex}-${apdex_4}s)`,color:'#ffec0b' },
                { start:0, end:apdex, label: `满意 (响应时间 0-${apdex}s)`, color:'#66dc6b' },
            ];
        let splitListForApdex = [
                { start: 0.8, end: 1, label: '满意', color:'#66dc6b'},
                { start: 0.5, end: 0.8, label: '可接受', color:'#ffec0b' },
                { start: 0, end: 0.5, label: '不满意', color: '#ff5251' }
            ];
        // } 
        /**
         * 从store获得的地图数据用来地图和条形图的展示。但在世界地图的数据有名称对应问题。
         * 世界地图需要国家名称的英文名字来渲染，条形图国家名需要中文展示，在这里进行转换。
         */
        if (activeMap == 'world') {
            if( yAxis.length > 0 ){
                for (let i = 0, len = yAxis.length; i < len; i++) {
                    for (let n in countryNameInEN) {
                        if ( n == yAxis[i]) {
                            yAxis[i] = countryNameInEN[n],
                            yAxisInCN.push(countryNameInCN[n])
                        }
                    }
                }
            }
        } else {
        }
        // 地图渲染需要的格式[{name:xx,value:xx},{name:xx,value:xx}]
        for (let i = 0, len = series.length; i < len; i++) {
            mapSeriesData.push({
                name: yAxis[i],
                value: series[i],
                avgRspTime: this.state.activePillar == 'avgRspTime' ? series[i] : undefined,
                apdex: this.state.activePillar == 'avgRspTime' ? undefined : series[i]
            })
        }
        // 需要更新的配置在这里给进去.当需要更新的数据很多，用mergeDeep会更直观(但是合并存在一些问题)
        // pillarConfig = this.tempConfig.get('bar').mergeDeep({
        //     yAxis: [{ data: activeMap == 'china' ? yAxis.slice(0, 10).reverse() : yAxisInCN.slice(0, 10).reverse() }],
        //     series: [{
        //         data: series.slice(0, 10).reverse(),
        //         name: this.state.activePillar == 'avgRspTime' ? locale('平均响应时间') : 'Apdex',
        //         itemStyle: {
        //             normal: {
        //                 color: function (value) {
        //                     let maxUv = Math.max.apply(null, series);
        //                     let opacity = Number((value.data / maxUv).toFixed(2))*(1-window.colorOpacity) + window.colorOpacity;
        //                     let color = activePillar == 'avgRspTime' ? 'rgba(255,235,11,' : 'rgba(102,220,108,';
        //                     return color + opacity + ")";
        //                 }
        //             }
        //         }
        //     }]
        // });
        pillarConfig = this.tempConfig.get('bar').updateIn(['yAxis', 0, 'data'], () => activeMap == "china" ? yAxis.slice(0,10).reverse() : yAxisInCN.slice(0,10).reverse())
            .updateIn(['series', 0, 'data'], () => series.slice(0,10).reverse())
            .updateIn(['series', 0, 'name'], () => this.state.activePillar == 'avgRspTime' ? locale('平均响应时间') : 'Apdex')
            .updateIn(['series', 0, 'itemStyle', 'normal', 'color'], () => function (value) {
                let maxUv = Math.max.apply(null, series);
                let opacity = Number((value.data / maxUv).toFixed(2))*(1-window.colorOpacity) + window.colorOpacity;
                let color = activePillar == 'avgRspTime' ? 'rgba(255,235,11,' : 'rgba(102,220,108,';
                return color + opacity + ")";
            });

        mapConfig = this.tempConfig.get(activeMap).updateIn(['series', 0, 'data'], () => mapSeriesData )
        .updateIn(['dataRange',0,'splitList'],()=> this.state.activePillar == 'avgRspTime' ? splitListForRepTime : splitListForApdex);

        // console.log('mapConfig===========',mapConfig.toJS(),pillarConfig.toJS());
        return (
            <div className={styles['map-chart']}>
                <div className={cls('tile-head')}>{locale('用户分布')}</div>
                <div className={cls('tile-body')}>
                    <div className={styles['btn-wrap']}>
                        <div className={cls('btn btn-china', {
                            'not-active': activeMap === 'china' ? false : true
                        })} onClick={this.changeMap.bind(this, 'china')}>{locale('中国')}</div>
                        <div className={cls('btn btn-world', {
                            'not-active': activeMap === 'world' ? false : true
                        })} onClick={this.changeMap.bind(this, 'world')}>{locale('世界')}</div>
                    </div>
                    {/* {sessionStorage.getItem('UEM_platform') == 'pc' ?
                        <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                            <Radio value={'avgRspTime'}>{locale('平均响应时间')}</Radio>
                            <Radio value={'apdex'}>Apdex</Radio>
                        </RadioGroup>:
                        <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                            <Radio value={'avgUIRspTime'}>{locale('平均UI响应时间')}</Radio>
                            <Radio value={'avgHttpRspTime'}>{locale('平均HTTP响应时间')}</Radio>
                        </RadioGroup>
                    } */}
                    {this.chooseRadioGroupForPlatform()}
                    <MapChart
                        mapState={this.state.activeMap}
                        chartId="map"  className={styles['map-chart']}
                        options={config.get('default').mergeDeep(mapConfig).toJS()}
                        clickUpdateMap={this.clickUpdateMap.bind(this)}
                    />
                    <BarChart chartId="bar"  className={styles['bar-chart']}
                        options={config.get('default').mergeDeep(pillarConfig)}
                    />
                </div>
            </div>
        );
    }
}

export default PerformanceMapChart;