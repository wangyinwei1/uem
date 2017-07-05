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
            getRealTimeData,
            getApdex,
            getTrend,
            getUserDistribution
        } = this.props.overviewStore;
        const { loading } = this.state;
        return (
            <div id="Overview">
                <Spin spinning={loading} size="large">
                    <Crux
                        realTimeData={realTimeData}
                        getRealTimeData={getRealTimeData}
                        getApdex={getApdex}
                        apdex={deploy.apdex}
                    />
                    <Quotas
                        trend={trend}
                        getTrend={getTrend}
                    />
                    <Atlas
                        getUserDistribution={getUserDistribution}
                    />
                </Spin>
            </div>
        );
    }
}