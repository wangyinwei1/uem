import React from 'react';
import { observer, inject } from 'mobx-react';
import { reaction, observable, action, computed } from 'mobx';
import { message } from 'antd';
import {
    DetailWrap,
} from '../components/Common';
import {
    Metrics,
    Timing,
    Trend,
    Analysis,
    TimingH5,
    FlowChart
} from '../components/PerformanceDetail';

@inject('frameStore', 'performanceDetailStore', 'performanceInteractiveStore', 'sidePanelStore')
@observer
export default class PerformanceDetail extends React.Component {
    @observable display = ''
    @computed get displayType() {
        if (this.display == '') {
            const { uiType, specificUrls, } = this.props.data;
            const platform = sessionStorage.getItem('UEM_platform');
            let displayType = this.props.data.displayType;
            if (uiType == 'H5' || platform == 'pc' ) {
                // 取specificUrls第一个displayType作为参数
                // display = specificUrls[0].displayType;
                this.display = specificUrls !== undefined ? specificUrls[0].displayType : 'page';
            } else {
                this.display = displayType !== undefined ? displayType : '' ;
            }
        }
        return this.display;
    }
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
        this.reloadUrl();
    };

    /* 
    *   当交互详情页面的url改变时，重新发起请求 
    *   reaction(()=>data,data=>{},true)
    *   第三个参数布尔值表示是否对传入的值立即做出反应，否则只对data传入新值的时候有反应
    */
    reloadUrl() {
        reaction(() => this.displayType,
        displayType => this.requestPerformanceDetailData(),
        true
    )}
    // 交互详情页面的数据请求方法
    requestPerformanceDetailData() {
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
            uiType, clickNum, thruput, specificUrls
        } = this.props.data;
        // 点击tabTable的时候，是按'已标记:0 未标记:1'传的，需要反过来
        const { tagType } = this.props.performanceInteractiveStore;
        // let displayType = this.props.data.displayType;
        // if (uiType == 'H5') {
        //     // 取specificUrls第一个displayType作为参数
        //     displayType = specificUrls[0].displayType;
        //     this.display = specificUrls[0].displayType;
        // } else {
        //     this.display = displayType;
        // }
        // 每次改变url的时候，重新发起请求。用reaction
        onGetOperInfo({
            operType,
            selector,
            text,
            "isMarked": tagType == 0 ? 1 : 0,
            path,
            performanceType: type,
            displayType: this.displayType,
            // columnCode: JSON.stringify(['clientTime', 'serverTime'])
        });
        platform == 'pc' && path == '' || undefined ? message.info('path字段为空') : onGetOperTrend({
            operType,
            selector,
            text,
            "isMarked": tagType == 0 ? 1 : 0,
            path,
            performanceType: type,
            displayType: this.displayType,
            columnCode: uiType === "NATIVE" ?
                JSON.stringify(['avgRspTime', 'clickNum', 'thruput', 'apdexs', 'median', 'netWorkTime', 'clientTime', 'serverTime', 'percent5']) :
                JSON.stringify(['clickNum', 'apdexs', 'median', 'avgRspTime', 'percent5', 'thruput', 'clientTime', 'serverTime', 'netWorkTime']),

        });
        platform == 'pc' && path == '' || undefined ? message.info('path字段为空') : onGetOperSamplesList({
            operType,
            selector,
            text,
            "isMarked": tagType == 0 ? 1 : 0,
            path,
            displayType: this.displayType,
        });
    }

    @action changeDisplayType(value) {
        this.display = value;
        console.log('value,this.displayType', value, this.displayType);
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
            clickNum,
            // uiType,
            apdexD,
            operName,
            // Timing
            networkTime,
            // severTime是H5的displayType=page时才有，callbackTime是xhr时才有
            serverTime,
            clientTime,
            callbackTime,
            firstByteTime,
            lastByteTime,
            domLoadingTime,
            avgRspTime
        } = info;
        // const { panelList } = this.props.sidePanelStore;
        // const { specificUrls, uiType } = panelList[panelList.length - 1];
        const { specificUrls, uiType,path } = this.props.data;
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
                        avgRspTime,
                        clickNum
                    }}

                    props={{
                        operType,
                        url,
                        uiType,
                        operName,
                        specificUrls,
                        path
                    }}
                    changeDisplayType={this.changeDisplayType.bind(this)}
                />
                    {
                        uiType !== 'NATIVE' ? 
                        <TimingH5
                            data={{
                                networkTime,
                                serverTime,
                                clientTime,
                                callbackTime,
                                firstByteTime,
                                lastByteTime,
                                domLoadingTime,
                                avgRspTime
                            }}
                            displayType={this.displayType}
                        />
                        :
                        <FlowChart threadInfo={info} />
                    }
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
                    analyzeData={threadInfo}
                    changeUser={onChangeUser}
                    changeType={onChangeType}
                    changeResourcePage={onChangeResourcePage}
                />
                <pre>
                    <h3>从二级表格传进来的数据</h3>
                    {JSON.stringify(this.props.data, null, 4)}
                    <h3>交互详情页数据</h3>
                    {JSON.stringify(this.props.performanceDetailStore, null, 4)}
                </pre>
            </DetailWrap>
        );
    }
}