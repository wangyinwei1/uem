import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    KeyIndicator,
    PerformanceTrend
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
    componentDidMount() {
        this.setState({
            loading: false
        });
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
            onGetPerformanceApdex,
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
                    {/*<PerformanceApdex
                        apdex={performanceApdex}
                        getPerformanceApdex={onGetPerformanceApdex}
                    />
                    <PerformanceMapChart
                        mapData={mapData},
                        getMapData={onGetMapData}
                    />*/}
                </Spin>
            </div>
        );
    }
}