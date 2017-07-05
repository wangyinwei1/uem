import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Frame/Chart';
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
        this.setState({
            activeMap: map
        });
    }
    render() {
        const { activeMap } = this.state;
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

export default Atlas;