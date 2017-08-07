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
            activePillar: 'avgRspTime'
        };
    }
    componentDidMount() {
        const { getMapData } = this.props;
        getMapData({
            areaType: 'province',
            metrics: JSON.stringify(['avgRspTime'])
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
                metrics: this.state.activePillar == 'avgRspTime' ? JSON.stringify(['avgRspTime']) : JSON.stringify(['apdex'])
            }));
        }
    }

    handleRadioSelect(e) {
        this.setState({
            activePillar: e.target.value
        }, () => this.props.getMapData({
            areaType: this.state.activeMap == 'china' ? 'province' : 'country',
            metrics: e.target.value == 'avgRspTime' ? JSON.stringify(['avgRspTime']) : JSON.stringify(['apdex'])
        }));
    }
    // 点击中国地图
    clickUpdateMap(params) {
        if (this.state.activeMap == 'china' && params.componentSubType == 'map' && params.name !== '台湾') {
            if (this.state.isSelectingCity && typeof params.value != "undefined" && !isNaN(params.value)) {
                this.setState({ isSelectingCity: false }, () => this.props.getMapData({
                    metrics: this.state.activePillar == 'occurErrorUserRate' ? JSON.stringify(['occurErrorUserRate']) : JSON.stringify(['effectedUserNum']),
                    areaType: this.state.activeMap == 'china' ? 'province' : 'country',
                    province: params.name
                }))
                config.updateIn(['china', 'series', 0, 'mapType'], () => params.name);
            } else if (!NameMap[params.name]) {
                this.setState({ isSelectingCity: true }, () => this.props.getMapData({
                    metrics: this.state.activePillar == 'occurErrorUserRate' ? JSON.stringify(['occurErrorUserRate']) : JSON.stringify(['effectedUserNum']),
                    areaType: this.state.activeMap == 'china' ? 'province' : 'country',
                    province: undefined
                }))
                config.updateIn(['china', 'series', 0, 'mapType'], () => 'china');
            }
        } else {
            console.log('外国和台湾省的次级地区暂无法查看！')
        }
    }

    render() {
        const { activeMap } = this.state;
        let pillarConfig, mapConfig, yAxis, series, mapSeriesData = [], _yAxis = [], _series = [];
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
                        yAxis[i] = countryNameInCN[n]
                    }
                }
            }
            _yAxis = yAxis.reverse();
            _series = series.reverse();
        } else {
            _yAxis = yAxis.reverse();
            _series = series.reverse();
        }
        // 地图渲染需要的格式[{name:xx,value:xx},{name:xx,value:xx}]
        for (let i = 0, len = series.length; i < len; i++) {
            mapSeriesData.push({
                name: yAxis[i],
                value: series[i]
            })
        }
        // 需要更新的配置在这里给进去
        pillarConfig = config.get('bar').updateIn(['yAxis', 0, 'data'], () => _yAxis)
            .updateIn(['series', 0, 'data'], () => _series)
            .updateIn(['series', 0, 'name'], () => this.state.activePillar == 'avgRspTime' ? locale('平均响应时间') : 'Apdex')
            .updateIn(['series', 0, 'itemStyle','normal','color'], () => function(value){
                    let maxUv = Math.max.apply(null, _series);
                    let opacity = Number((value.data / maxUv).toFixed(2));
                    return 'rgba(102,220,108,' + opacity + ")";
            });

        mapConfig = config.get(activeMap).updateIn(['series', 0, 'data'], () => mapSeriesData);
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

                    <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                        <Radio value={'avgRspTime'}>{locale('平均响应时间')}</Radio>
                        <Radio value={'apdex'}>Apdex</Radio>
                    </RadioGroup>

                    <MapChart
                        chartId="map" group="atlas" className={styles['map-chart']}
                        options={config.get('default').mergeDeep(mapConfig).toJS()}
                        clickUpdateMap={this.clickUpdateMap.bind(this)}
                    />
                    <BarChart chartId="bar" group="atlas" className={styles['bar-chart']}
                        options={config.get('default').mergeDeep(pillarConfig).toJS()}
                    />
                </div>
            </div>
        );
    }
}

export default PerformanceMapChart;