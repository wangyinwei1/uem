import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    KeyIndicator,
    ErrorTrend,
    ErrorMapChart,
    ErrorModalChart
} from '../components/ErrorOverview';

@inject('frameStore', 'errorOverviewStore')
@observer
export default class ErrorOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    pillarStatus = 'occurErrorUserRate';
    mapStatus = 'china';
    componentDidMount() {
        this.setState({
            loading: false
        });
    }
    selectStatus(pillarStatus, mapStatus){
            this.pillarStatus = pillarStatus;
            this.mapStatus = mapStatus;
    }

    render() {
        const {
            // state
            keyIndicator,
            errorTrend,
            mapData,
            // action
            onGetKeyIndicator,
            onGetErrorTrend,
            onGetMapData
        } = this.props.errorOverviewStore;
        // const startTime = this.props.frameStore.timeType;
        const { appVersion } = this.props.frameStore;
        const { loading } = this.state;
        return (
            <div id="ErrorOverview" key={appVersion}>
                <Spin spinning={loading} size="large">
                    <KeyIndicator
                        keyIndicator={keyIndicator}
                        getKeyIndicator={onGetKeyIndicator}
                        version={appVersion}
                    />
                    <ErrorTrend
                        errorTrend={errorTrend}
                        getErrorTrend={onGetErrorTrend}
                    />
                     <ErrorMapChart
                        mapData={mapData}
                        getMapData={onGetMapData}
                        selectStatus={this.selectStatus.bind(this)}
                    />
                    <ErrorModalChart
                        mapData={mapData}
                        pillarState={this.pillarStatus}
                        mapStatus={this.mapStatus}
                    />
                </Spin>
            </div>
        );
    }
}