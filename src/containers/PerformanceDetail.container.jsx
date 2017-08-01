import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    DetailWrap,
} from '../components/Common';
import {
    Metrics,
    Timing,
    Trend,
    Analysis,
} from '../components/PerformanceDetail';

@inject('frameStore', 'performanceDetailStore')
@observer
export default class PerformanceDetail extends React.Component {
    // static childContextTypes = {
    //     type: React.PropTypes.string.isRequired,
    // }
    // getChildContext() {
    //     const {
    //         type,
    //     } = this.props.performanceDetailStore;
    //     return {
    //         type,
    //     };
    // }
    componentDidMount() {
        const { onGetOperInfo, onGetOperTrend, onGetOperSamplesList } = this.props.performanceDetailStore;
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
        onGetOperTrend({
            operType,
            selector,
            text,
            isMarked,
            path,
            performanceType: type
        });
        onGetOperSamplesList({
            operType,
            selector,
            text,
            isMarked,
            path,
        });
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        const {
            info,
            baseInfo,
            trend,
            samplesList,
            sessionTrace,
            activeId,
            analyzeData,
            type,
            sampleAnalyzeData,
            onChangeResourcePage,
            onChangeUser,
            onChangeType,
        } = this.props.performanceDetailStore;
        const {
            pv,
            uv,
            apdex,
            thruput,
            bounceRate,
            operType,
            url,

            // Timing
            netTime,
            serverTime,
            clientTime,
            firstByteTime,
            lastByteTime,
            domLoadingTime,
            pageAvgRspTime
        } = info;
        const { itemId } = this.props;
        return (
            <DetailWrap>
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
                {operType === 'redirect' &&
                    <Timing
                        data={{
                            netTime,
                            serverTime,
                            clientTime,
                            firstByteTime,
                            lastByteTime,
                            domLoadingTime,
                            pageAvgRspTime
                        }}
                    />
                }
                <Trend itemId={itemId} trend={trend} />
                <Analysis
                    sampleAnalyzeData={sampleAnalyzeData}
                    type={type}
                    itemId={itemId}
                    baseInfo={baseInfo}
                    samplesList={samplesList}
                    activeId={activeId}
                    sessionTrace={sessionTrace}
                    analyzeData={analyzeData}
                    changeUser={onChangeUser}
                    changeType={onChangeType}
                    changeResourcePage={onChangeResourcePage}
                />
            </DetailWrap>
        );
    }
}