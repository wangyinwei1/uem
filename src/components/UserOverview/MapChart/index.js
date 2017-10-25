import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';
import { countryNameInCN, countryNameInEN } from '../../Common/Chart/WorldCountryName';
import { Radio } from 'antd';
import { NameMap } from '../../Common/Chart/CityName';
const RadioGroup = Radio.Group;

class UserMapChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMap: 'china',
            activePillar: 'sessionCount',
            activeProvince: undefined,
            isSelectingCity: true
        };
    }
    tempConfig = config;
    componentDidMount() {
        const { getMapData } = this.props;
        getMapData({
            areaType: 'province',
            metrics: JSON.stringify(['sessionCount']),
            province: undefined
        });
        this.tempConfig = config;
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
                this.setState({ isSelectingCity: false, activeProvince : params.name }, () => this.props.getMapData({
                    metrics: JSON.stringify([this.state.activePillar]),
                    areaType: 'province',
                    province: params.name
                }))
                this.tempConfig = config.updateIn(['china', 'series', 0, 'mapType'], () => params.name);
            } else if (!NameMap[params.name]) {
                this.setState({ isSelectingCity: true,activeProvince:undefined }, () => this.props.getMapData({
                    metrics: JSON.stringify([this.state.activePillar]),
                    areaType: 'province',
                    province: undefined
                }))
            this.tempConfig = config.updateIn(['china', 'series', 0, 'mapType'], () => 'china');
            }
        } else {
            console.log('外国和台湾省的次级地区暂无法查看！')
        }
    }

     // 选择pc端还是移动端的radioGroup
     chooseRadioGroupForPlatform(){
        let platform = sessionStorage.getItem('UEM_platform');
        return (
            platform == 'pc' ?
                <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                        <Radio value={'sessionCount'}>{locale('会话数')}</Radio>
                        <Radio value={'uv'}>{locale('访客数')}</Radio>
                </RadioGroup>:
                <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                    <Radio value={'sessionCount'}>{locale('启动次数')}</Radio>
                    <Radio value={'uv'}>{locale('独立设备数')}</Radio>
                </RadioGroup>      
        )
    }

    render() {
        const { activeMap,activePillar } = this.state;
        let pillarConfig, mapConfig, yAxis, series, yAxisInCN=[],mapSeriesData = [], _yAxis = [], _series = [];
        yAxis = this.props.mapData.yAxis;
        series = this.props.mapData.series;
        /**
         * 从store获得的地图数据用来地图和条形图的展示。但在世界地图的数据有个名称对应的问题。
         * 世界地图需要国家名称的英文名字来渲染，条形图国家名需要中文展示，在这里进行转换。
         */
        if (activeMap == 'world') {
            for (let i = 0, len = yAxis.length; i < len; i++) {
                for (let n in countryNameInEN) {
                    if (yAxis[i] == countryNameInEN[n]) {
                        yAxis[i] = countryNameInEN[n],
                        yAxisInCN.push(countryNameInCN[n])
                    }
                }
            }
            // _yAxis = yAxis.reverse();
            // _series = series.reverse();
        } 
        // 地图渲染需要的格式[{name:xx,value:xx},{name:xx,value:xx}]
        for (let i = 0, len = series.length; i < len; i++) {
            mapSeriesData.push({
                name: yAxis[i],
                value: series[i],
                sessionCount: this.state.activePillar == "sessionCount" ? series[i] : undefined,
                uv:  this.state.activePillar == "uv" ? series[i] : undefined,
            })
        }
        pillarConfig = this.tempConfig.get('bar').updateIn(['yAxis', 0, 'data'], () => activeMap == "china" ? yAxis.slice(0,10).reverse() : yAxisInCN.slice(0,10).reverse())
            .updateIn(['series', 0, 'data'], () => series.slice(0,10).reverse())
            .updateIn(['series', 0, 'name'], () => activePillar == 'sessionCount' ? locale('会话数') : locale('访客数'))
            .updateIn(['series', 0, 'itemStyle', 'normal', 'color'], () => function (value) {
                let maxUv = Math.max.apply(null, series);
                let opacity = Number((value.data / maxUv).toFixed(2))*(1-window.colorOpacity) + window.colorOpacity;
                return 'rgba(3,169,245,' + opacity + ")";
            });
        mapConfig = this.tempConfig.get(activeMap).updateIn(['series', 0, 'data'], () => mapSeriesData).updateIn(['visualMap',0,'max'], ()=> series.length > 0 ? Math.max.apply(null, series) : 1)
            .updateIn(['visualMap',0,'text'], ()=> this.state.activePillar == 'sessionCount' ? ['会话数'] : ['访客数']);

        return (
            <div className={styles['map-chart']}>
                <div className={cls('tile-head')}>{locale('地理位置')}</div>
                <div className={cls('tile-body')}>
                    <div className={styles['btn-wrap']}>
                        <div className={cls('btn btn-china', {
                            'not-active': activeMap === 'china' ? false : true
                        })} onClick={this.changeMap.bind(this, 'china')}>{locale('中国')}</div>
                        <div className={cls('btn btn-world', {
                            'not-active': activeMap === 'world' ? false : true
                        })} onClick={this.changeMap.bind(this, 'world')}>{locale('世界')}</div>
                    </div>

                    { this.chooseRadioGroupForPlatform()}

                    <MapChart
                        mapState={this.state.activeMap}
                        chartId="map"  className={styles['map-chart']}
                        options={config.get('default').mergeDeep(mapConfig).toJS()}
                        clickUpdateMap={this.clickUpdateMap.bind(this)}
                    />
                    <BarChart chartId="bar"  className={styles['bar-chart']}
                        options={config.get('default').mergeDeep(pillarConfig).toJS()}
                    />
                </div>
            </div>
        );
    }
}

export default UserMapChart;