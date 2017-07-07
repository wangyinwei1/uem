import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';

class PerformanceMapChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMap: 'china'
        };
    }
    componentDidMount(){
        const { getMapData } = this.props;
        getMapData();
    }
    changeMap(map) {
        let prevState = this.state.activeMap;
        let nextState = map;
        if(prevState == nextState ){
            return 
        } else {
            this.setState({
                activeMap: map
            },this.props.getMapData({ 
                areaType : map == 'china' ? 'province' : 'country'
             }));
        } 
    }
    render() {
        const { activeMap } = this.state;
        return (
            <div className={styles['map-chart']}>
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
                        options={config.get('default').mergeDeep(config.get(activeMap)).toJS()} 
                    />
                    <BarChart chartId="bar" group="atlas" className={styles['bar-chart']} 
                        options={config.get('default').mergeDeep(config.get('bar')).toJS()} 
                    />
                </div>
            </div>
        );
    }
}

export default PerformanceMapChart;