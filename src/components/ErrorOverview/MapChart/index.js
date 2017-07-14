import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';

class ErrorMapChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMap: 'china'
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
                metrics: JSON.stringify(['occurErrorUserRate'])
            }));
        } 
    }

    render() {
        const { activeMap } = this.state;
        let pillarConfig,mapConfig,yAxis,series,mapSeriesData=[];
        yAxis = this.props.mapData.yAxis;
        series = this.props.mapData.series;

        for(let i = 0 , len = series.length; i < len ; i++){
            mapSeriesData.push({
                name: yAxis[i],
                value: series[i]
            })
        }
        pillarConfig = config.get('bar').updateIn(['yAxis','data'], () => yAxis).updateIn(['series',0,'data'],()=> series);
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