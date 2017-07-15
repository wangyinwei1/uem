import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    KeyIndicator,
    UserTrend,
    UserMapChart
} from '../components/UserOverview';

@inject('frameStore', 'userOverviewStore')
@observer
export default class UserOverview extends React.Component {
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
            userTrend,
            mapData,
            // action
            onGetKeyIndicator,
            onGetUserTrend,
            onGetMapData
        } = this.props.userOverviewStore;

        const startTime = this.props.frameStore.timeType;
        const { loading } = this.state;
        return (
            <div id="UserOverview" >
                <Spin spinning={loading} size="large">
                    <KeyIndicator
                        keyIndicator={keyIndicator}
                        getKeyIndicator={onGetKeyIndicator}
                        startTime = {startTime}
                    />
                    <UserTrend
                        userTrend={userTrend}
                        getUserTrend={onGetUserTrend}
                        startTime = {startTime}
                    />
                     <UserMapChart
                        mapData={mapData}
                        getMapData={onGetMapData}
                        startTime = {startTime}
                    />
                </Spin>
            </div>
        );
    }
}