import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    Crux,
    Quotas,
    Atlas
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
            onGetRealTimeData,
            onGetApdex,
            onGetTrend,
            onGetUserDistribution
        } = this.props.overviewStore;
        const { loading } = this.state;
        return (
            <div id="Overview">
                <Spin spinning={loading} size="large">
                    <Crux
                        realTimeData={realTimeData}
                        getRealTimeData={onGetRealTimeData}
                        getApdex={onGetApdex}
                        apdex={deploy.apdex}
                    />
                     <Quotas
                        trend={trend}
                        getTrend={onGetTrend}
                    /> 
                    <Atlas
                        getUserDistribution={onGetUserDistribution}
                    />
                </Spin>
            </div>
        );
    }
}