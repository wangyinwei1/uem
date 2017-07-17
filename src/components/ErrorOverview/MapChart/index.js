import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';
import { Radio } from 'antd';
import { countryNameInCN, countryNameInEN } from '../../Common/Chart/WorldCountryName';

const RadioGroup = Radio.Group;

class ErrorMapChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMap: 'china',
            activePillar: 'occurErrorUserRate'
        };
    }
    componentDidMount(){
        const { getMapData } = this.props;
        getMapData({
            metrics: JSON.stringify(['occurErrorUserRate'])
        });
    }
    changeMap(map) {
        let prevState = this.state.activeMap;
        let nextState = map;
        if(prevState == nextState ){
            return 
        } else {
            this.setState({
                activeMap: map
            }, () => this.props.getMapData({ 
                areaType : map == 'china' ? 'province' : 'country',
                metrics: this.state.activePillar == 'occurErrorUserRate'? JSON.stringify(['occurErrorUserRate']) : JSON.stringify(['effectedUserNum'])
            }));
        } 
    }

    handleRadioSelect(e){
        this.setState({
            activePillar: e.target.value
        }, () => this.props.getMapData({ 
            areaType: this.state.activeMap == 'china' ? 'province' : 'country',
            metrics: e.target.value == 'occurErrorUserRate' ? JSON.stringify(['occurErrorUserRate']) : JSON.stringify(['effectedUserNum']) 
         }) );
    }

    render() {
        const { activeMap } = this.state;
        let pillarConfig,mapConfig,yAxis,series,mapSeriesData=[],_yAxis=[],_series=[];
        yAxis = this.props.mapData.yAxis;
        series = this.props.mapData.series;
        /**
         * 从store获得的地图数据用来地图和条形图的展示。但在世界地图的数据有个名称对应的问题。
         * 世界地图需要国家名称的英文名字来渲染，条形图国家名需要中文展示，在这里进行转换。
         */
        if(activeMap == 'world'){
            for(let i = 0,len = yAxis.length; i < len; i++){
                for(let n in countryNameInEN){
                    if(yAxis[i] == countryNameInEN[n]){
                        yAxis[i] = countryNameInCN[n]
                    }
                }
            }
            _yAxis = yAxis;
            _series = series;
        }else{
           _yAxis = yAxis;
           _series = series;
        }
        // 地图渲染需要的格式[{name:xx,value:xx},{name:xx,value:xx}]
        for(let i = 0 , len = series.length; i < len ; i++){
            mapSeriesData.push({
                name: yAxis[i],
                value: series[i]
            })
        }
        pillarConfig = config.get('bar').updateIn(['yAxis','data'], () => _yAxis).updateIn(['series',0,'data'],()=> _series);
        mapConfig = config.get(activeMap).updateIn(['series',0,'data'], ()=> mapSeriesData );
        console.log('[mapConfig]:',mapConfig.toJS());
        return (
            <div className={styles['map-chart']}>
                <div className={cls('tile-head')}>地理位置</div>
                <div className={cls('tile-body')}>
                    <div className={styles['btn-wrap']}>
                        <div className={cls('btn btn-china', {
                            'not-active': activeMap === 'china' ? false : true
                        })} onClick={this.changeMap.bind(this, 'china')}>中国</div>
                        <div className={cls('btn btn-world', {
                            'not-active': activeMap === 'world' ? false : true
                        })} onClick={this.changeMap.bind(this, 'world')}>世界</div>
                    </div>

                    <RadioGroup className={cls('radio')} onChange={this.handleRadioSelect.bind(this)} value={this.state.activePillar}>
                        <Radio value={'occurErrorUserRate'}>{'用户错误率'}</Radio>
                        <Radio value={'effectedUserNum'}>{'影响用户数'}</Radio>
                    </RadioGroup>

                    <MapChart chartId="map" group="atlas" className={styles['map-chart']} 
                        options={config.get('default').mergeDeep(mapConfig).toJS()} 
                    />
                    <BarChart chartId="bar" group="atlas" className={styles['bar-chart']} 
                        options={config.get('default').mergeDeep(pillarConfig).toJS()} 
                    />
                </div>
            </div>
        );
    }
}

export default ErrorMapChart;