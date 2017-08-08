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
    pillarStatus = 'avgRspTime'
    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    pillarSelectStatus(pillarStatus){
        this.pillarStatus = pillarStatus
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
        const { loading } = this.state;
        return (
            <div id="PerformanceOverview" >
                <Spin spinning={loading} size="large">
                    <KeyIndicator
                        keyIndicator={keyIndicator}
                        getKeyIndicator={onGetKeyIndicator}
                        startTime = {startTime}
                    />
                    <PerformanceTrend
                        performanceTrend={performanceTrend}
                        getPerformanceTrend={onGetPerformanceTrend}
                        startTime = {startTime}
                    />
                     <PerformanceMapChart
                        mapData={mapData}
                        getMapData={onGetMapData}
                        startTime = {startTime}
                        pillarSelectStatus={this.pillarSelectStatus.bind(this)}
                    />
                    <PerformanceModalChart 
                        mapData={mapData}
                        pillarState={this.pillarStatus}
                    />
                </Spin>
            </div>
        );
    }
}