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

@inject('frameStore', 'performanceDetailStore','performanceInteractiveStore','sidePanelStore')
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
    
    displayType = '';
    
    componentDidMount() {
        const platform = sessionStorage.getItem('UEM_platform');
        const { onGetOperInfo, onGetOperTrend, onGetOperSamplesList } = this.props.performanceDetailStore;
        const { type } = this.props;
        const {
            operType = 'click',
            selector,
            text,
            // isMarked,
            path,
            // displayType,
            uiType,clickNum,thruput,specificUrls
        } = this.props.data;
        // 点击tabTable的时候，是按 已标记0 未标记1 传的，需要反过来
        const { tagType } = this.props.performanceInteractiveStore;
        let displayType  = this.props.data.displayType;
        if(uiType == 'H5'){
            // 取specificUrls第一个displayType作为参数
            displayType = specificUrls[0].displayType;
            this.displayType = specificUrls[0].displayType;
        }else{
            this.displayType = displayType;
        }
        onGetOperInfo({
            operType,
            selector,
            text,
            "isMarked":tagType == 0 ? 1 : 0,
            path,
            performanceType: type,
            displayType: this.displayType,
            // columnCode: JSON.stringify(['clientTime', 'serverTime'])
        });
        platform == 'pc' && path == '' || undefined ? message.info('path字段为空'):onGetOperTrend({
            operType,
            selector,
            text,
            "isMarked":tagType == 0 ? 1 : 0,
            path,
            performanceType: type,
            displayType: this.displayType,
            columnCode: uiType === "NATIVE" ? 
            JSON.stringify(['avgRspTime', 'clickNum','thruput','apdexs', 'median','netWorkTime','clientTime', 'serverTime','percent5']) :
            JSON.stringify(['clickNum', 'apdexs', 'median', 'avgRspTime', 'percent5', 'thruput', 'clientTime', 'serverTime', 'netWorkTime']),
            
        });
        platform == 'pc' && path == '' || undefined ? message.info('path字段为空') : onGetOperSamplesList({
            operType,
            selector,
            text,
            "isMarked":tagType == 0 ? 1 : 0,
            path,
            displayType:this.displayType,
        });
    }
    changeDisplayType(value){
        this.displayType = value;
        console.log('value,this.displayType',value,this.displayType);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        const platform = sessionStorage.getItem('UEM_platform');
        const {
            info,
            threadInfo,
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
            // uiType,
            apdexD,
            operName,
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
        const { panelList }  = this.props.sidePanelStore;
        const { specificUrls,uiType } = panelList[panelList.length - 1];
        const { itemId } = this.props;
        return (
            <DetailWrap>
                <Metrics
                    data={{
                        pv,
                        uv,
                        apdex,
                        thruput,
                        bounceRate,
                        apdexD,
                        avgRspTime
                    }}
                    
                    props={{
                        operType,
                        url,
                        uiType,
                        operName,
                        specificUrls
                    }}
                    changeDisplayType={this.changeDisplayType.bind(this)}
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
                    : info.uiType !== 'NATIVE' && <TimingMobile
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
                <FlowChart threadInfo = {info} />
                <Trend itemId={itemId} trend={trend} uiType={info.uiType} />
                <Analysis
                    sampleAnalyzeData={sampleAnalyzeData}
                    type={type}
                    itemId={itemId}
                    threadInfo={threadInfo} 
                    baseInfo={sessionTrace.baseInfo}
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