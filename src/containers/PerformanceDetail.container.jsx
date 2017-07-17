import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    Metrics,
    Timing,
    Trend,
    Analysis,
} from '../components/PerformanceDetail';

@inject('frameStore', 'performanceDetailStore')
@observer
export default class PerformanceDetail extends React.Component {
    componentDidMount() {
        const { onGetOperInfo } = this.props.performanceDetailStore;
        const { type } = this.props;
        const {
            operType,
            selector,
            text,
            isMarked,
            path
        } = this.props.data;
        onGetOperInfo({
            operType,
            selector,
            text,
            isMarked,
            path,
            performanceType: type
        });
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        const { info } = this.props.performanceDetailStore;
        const { pv, uv, apdex, thruput, bounceRate, operType, url } = info;

        return (
            <div>
                <h3>PerformanceDetail</h3>
                <Metrics 
                    data={{
                        pv, 
                        uv, 
                        apdex, 
                        thruput, 
                        bounceRate
                    }}
                    props={{
                        operType, 
                        url
                    }}
                />
                <Timing />
                <Trend />
                <Analysis />
                <pre>
                    {JSON.stringify(info, null, 4)}
                </pre>
            </div>
        );
    }
}