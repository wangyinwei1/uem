import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    Crux,
    Quotas,
    Atlas,
    CruxMobile
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
    componentDidMount() {
        this.setState({
            loading: false
        });
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
                    />
                </Spin>
            </div>
        );
    }
}