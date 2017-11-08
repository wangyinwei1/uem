import React, { Component } from 'react';
import {
    MapChart,
    BarChart
} from '../../Common/Chart';
import config from './config';
import styles from './index.scss';
import { countryNameInCN, countryNameInEN } from '../../Common/Chart/WorldCountryName';

class Atlas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMap: 'china'
        };
    }
    componentDidMount() {
        const { getUserDistribution } = this.props;
        getUserDistribution({ areaType: 'province' });
    }
    changeMap(map) {
        let prevState = this.state.activeMap;
        let nextState = map;
        if (prevState == nextState) {
            return
        } else {
            this.setState({
                activeMap: map
            }, () => this.props.getUserDistribution({ areaType: map == 'china' ? 'province' : 'country' }));
        }
        this.props.selectStatus(map);
    }
    render() {
        const { activeMap } = this.state;
        let pillarConfig, mapConfig, yAxis, series, yAxisInCN = [], mapSeriesData = [], _yAxis = [], _series = [];
        yAxis = this.props.userDistribution.yAxis;
        series = this.props.userDistribution.series;
        if (activeMap == 'world') {
            for (let i = 0, len = yAxis.length; i < len; i++) {
                for (let n in countryNameInEN) {
                    if (yAxis[i] == countryNameInEN[n]) {
                        yAxis[i] = countryNameInEN[n];
                        yAxisInCN.push(countryNameInCN[n]);
                    }
                }
            }
        }else {
        }

        for (let i = 0, len = series.length; i < len; i++) {
            mapSeriesData.push({
                name: yAxis[i],
                value: series[i],
                sessionCount: series[i]
            })
        }
        const maxUv = Math.max.apply(null, series);
        const theme = this.props.theme;
        pillarConfig = config.get('bar').updateIn(['yAxis', 0, 'data'], () => activeMap == 'china' ? yAxis.slice(0, 10).reverse() : yAxisInCN.slice(0, 10).reverse())
        .mergeDeep({
            series: [{
                itemStyle:{
                    normal:{
                        color: function(value) {
                            let opacity = Number(parseInt(value.data) / maxUv)*(1-window.colorOpacity)+window.colorOpacity;
                            return themeChange('overviewPillarColor',theme) + opacity + ")";
                        } 
                    }
                }
            }]
        })    
        .updateIn(['series', 0, 'data'], () => series.slice(0, 10).reverse())
        .updateIn(['series', 0, 'name'], () => locale('用户会话数'));

        mapConfig = config.get(activeMap).mergeDeep({
            visualMap: [{
                inRange: {
                    color: themeChange('mapColorInRange', theme),
                },
                textStyle: {
                    color: themeChange('visualMapText', theme)
                },
            }],
            series:[{
                itemStyle: {
                    normal: {
                        areaColor: themeChange('normalAreaColor', theme),
                        borderColor: themeChange('normalBorderColor', theme)
                    },
                    emphasis: {
                        areaColor: themeChange('emphasisAreaColor', theme),
                        borderColor: '#fff',
                    }
                }
            }]
            
        })
        .updateIn(['series', 0, 'data'], () => mapSeriesData).updateIn(['visualMap', 0, 'max'], () => series.length > 0 ? Math.max.apply(null, series) : 1)
        .updateIn(['visualMap', 0, 'text'], () => [locale('用户会话数')]);

        return (
            <div className={styles['atlas']}>
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
                    <MapChart
                        mapState={this.state.activeMap}
                        chartId="map" className={styles['map-chart']}
                        options={config.get('default').mergeDeep(mapConfig).toJS()}
                        theme={this.props.theme}
                    />
                    <BarChart chartId="bar" className={styles['bar-chart']}
                        options={config.get('default').mergeDeep(pillarConfig).toJS()}
                        theme={this.props.theme}
                    />
                </div>
            </div>
        );
    }
}

export default Atlas;