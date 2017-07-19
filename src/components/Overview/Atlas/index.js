import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';

class Atlas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMap: 'china'
        };
    }
    componentDidMount(){
        const { getUserDistribution } = this.props;
        getUserDistribution();
    }
    changeMap(map) {
        let prevState = this.state.activeMap;
        let nextState = map;
        if(prevState == nextState ){
            return 
        } else {
            this.setState({
                activeMap: map
            }, () => this.props.getUserDistribution({ areaType : map == 'china' ? 'province' : 'country'}));
        } 
    }
    render() {
        const { activeMap } = this.state;
        let pillarConfig,mapConfig,yAxis,series,mapSeriesData=[];
        yAxis = this.props.userDistribution.yAxis;
        series = this.props.userDistribution.series;

        for(let i = 0 , len = series.length; i < len ; i++){
            mapSeriesData.push({
                name: yAxis[i],
                value: series[i]
            })
        }
        pillarConfig = config.get('bar').updateIn(['yAxis','data'], () => yAxis)
            .updateIn(['series',0,'data'],()=> series)
            .updateIn(['series',0,'name'],()=> '用户会话数');
            
        mapConfig = config.get(activeMap).updateIn(['series',0,'data'], ()=> mapSeriesData );
        return (
            <div className={styles['atlas']}>
                <div className={cls('tile-head')}>用户分布</div>
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

export default Atlas;