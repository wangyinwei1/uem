import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    KeyIndicator,
    UserTrend,
    UserMapChart,
    UserModalChart
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
    pillarStatus = 'sessionCount';
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
            userTrend,
            mapData,
            // action
            onGetKeyIndicator,
            onGetUserTrend,
            onGetMapData
        } = this.props.userOverviewStore;
        const { theme } = this.props.frameStore;
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
                        theme={theme}
                    />
                     <UserMapChart
                        mapData={mapData}
                        getMapData={onGetMapData}
                        startTime = {startTime}
                        selectStatus={this.selectStatus.bind(this)}
                        theme={theme}
                    />
                    <UserModalChart 
                        mapData={mapData}
                        pillarState={this.pillarStatus}
                        mapStatus={this.mapStatus}
                        theme={theme}
                    />
                </Spin>
            </div>
        );
    }
}