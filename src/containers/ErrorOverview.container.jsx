import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    KeyIndicator,
    ErrorTrend,
    ErrorMapChart
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
    componentDidMount() {
        this.setState({
            loading: false
        });
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

        const startTime = this.props.frameStore.timeType;
        const { loading } = this.state;
        return (
            <div id="ErrorOverview" >
                <Spin spinning={loading} size="large">
                    <KeyIndicator
                        keyIndicator={keyIndicator}
                        getKeyIndicator={onGetKeyIndicator}
                        startTime = {startTime}
                    />
                    <ErrorTrend
                        errorTrend={errorTrend}
                        getErrorTrend={onGetErrorTrend}
                        startTime = {startTime}
                    />
                     <ErrorMapChart
                        mapData={mapData}
                        getMapData={onGetMapData}
                        startTime = {startTime}
                    />
                </Spin>
            </div>
        );
    }
}