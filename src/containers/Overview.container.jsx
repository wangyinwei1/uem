import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    Crux,
    Quotas,
    Atlas,
    CruxMobile,
    OverviewModalChart
} from '../components/Overview';

@inject('frameStore', 'overviewStore')
@observer
export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    mapStatus = 'china';
    componentDidMount() {
        this.setState({
            loading: false
        });
    }
    selectStatus(mapStatus){
        this.mapStatus = mapStatus;
    }
    render() {
        const {
            realTimeData,
            deploy,
            trend,
            userDistribution,
            onGetRealTimeData,
            onGetApdex,
            onGetTrend,
            onGetUserDistribution
        } = this.props.overviewStore;
        // 其他也有用到apdex的地方
        window.apdex =  deploy.apdex ;
        const { loading } = this.state;
        return (
            <div id="Overview">
                <Spin spinning={loading} size="large">
                    {sessionStorage.UEM_platform == 'pc'?
                    <Crux
                        realTimeData={realTimeData}
                        getRealTimeData={onGetRealTimeData}
                        getApdex={onGetApdex}
                        apdex={deploy.apdex}
                    /> : <CruxMobile
                        realTimeData={realTimeData}
                        getRealTimeData={onGetRealTimeData}
                        getApdex={onGetApdex}
                        apdex={deploy.apdex}
                    />}
                     <Quotas
                        trend={trend}
                        getTrend={onGetTrend}
                    /> 
                    <Atlas
                        getUserDistribution={onGetUserDistribution}
                        userDistribution={userDistribution}
                        selectStatus={this.selectStatus.bind(this)}
                    />
                    <OverviewModalChart 
                        mapData={userDistribution}
                        pillarState={'userDistribution'}
                        mapStatus={this.mapStatus}
                    />
                </Spin>
            </div>
        );
    }
}