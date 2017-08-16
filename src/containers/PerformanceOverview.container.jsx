import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    KeyIndicator,
    PerformanceTrend,
    PerformanceMapChart,
    PerformanceModalChart
} from '../components/PerformanceOverview';

@inject('frameStore', 'performanceOverviewStore')
@observer
export default class PerformanceOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    pillarStatus = 'avgRspTime';
    mapStatus = 'china';
    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    selectStatus(pillarStatus,mapStatus){
        this.pillarStatus = pillarStatus;
        this.mapStatus = mapStatus;
    }
    render() {
        const {
            // state
            keyIndicator,
            performanceTrend,
            mapData,
            // action
            onGetKeyIndicator,
            onGetPerformanceTrend,
            onGetMapData
        } = this.props.performanceOverviewStore;
        const startTime = this.props.frameStore.timeType;
        const { platform } = this.props.frameStore;
        const { loading } = this.state;
        return (
            <div id="PerformanceOverview" >
                <Spin spinning={loading} size="large">
                    <KeyIndicator
                        keyIndicator={keyIndicator}
                        getKeyIndicator={onGetKeyIndicator}
                        startTime = {startTime}
                        platform={platform}
                    />
                    <PerformanceTrend
                        performanceTrend={performanceTrend}
                        getPerformanceTrend={onGetPerformanceTrend}
                        startTime = {startTime}
                        platform={platform}
                    />
                    <PerformanceMapChart
                        mapData={mapData}
                        getMapData={onGetMapData}
                        startTime = {startTime}
                        selectStatus={this.selectStatus.bind(this)}
                        mapStatus={this.mapStatus}
                        platform={platform}
                    />
                    <PerformanceModalChart 
                        mapData={mapData}
                        mapStatus={this.mapStatus}
                        pillarState={this.pillarStatus}
                    />
                </Spin>
            </div>
        );
    }
}