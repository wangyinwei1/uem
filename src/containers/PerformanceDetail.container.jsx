import React from 'react';
import { observer, inject } from 'mobx-react';
import { message } from 'antd';
import {
    DetailWrap,
} from '../components/Common';
import {
    Metrics,
    Timing,
    Trend,
    Analysis,
    TimingMobile,
    FlowChart
} from '../components/PerformanceDetail';

@inject('frameStore', 'performanceDetailStore','performanceInteractiveStore')
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
        // debugger
        const {
            operType,
            selector,
            text,
            // isMarked,
            path
        } = this.props.data;
        const { tagType } = this.props.performanceInteractiveStore;
        onGetOperInfo({
            operType,
            selector,
            text,
            "isMarked":tagType,
            path,
            performanceType: type
        });

        path == '' || undefined ? message.info('path字段为空'):onGetOperTrend({
            operType,
            selector,
            text,
            "isMarked":tagType,
            path,
            performanceType: type
        });
        path == '' || undefined ? message.info('path字段为空') : onGetOperSamplesList({
            operType,
            selector,
            text,
            "isMarked":tagType,
            path,
        });
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        const platform = sessionStorage.getItem('UEM_platform');
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
            pageAvgRspTime,
            // 移动端h5
            domReady,
            avgRspTime
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
                {platform == 'pc' ?
                    operType === 'redirect' &&
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
                    :<TimingMobile
                            data={{
                                netTime,
                                serverTime,
                                clientTime,
                                firstByteTime,
                                lastByteTime,
                                domReady,
                                avgRspTime
                            }}
                        />

                }
                <FlowChart />
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