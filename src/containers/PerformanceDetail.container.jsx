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
    @observable display = '';
    @observable path = '';
    @computed get displayType() {
        if (this.display == '') {
            const { uiType, specificUrls, } = this.props.data;
            const platform = sessionStorage.getItem('UEM_platform');
            let displayType = this.props.data.displayType;
            if (uiType == 'H5' || platform == 'pc' ) {
                // 取specificUrls第一个displayType作为参数
                // display = specificUrls[0].displayType;
                this.display = specificUrls !== undefined && specificUrls.length > 0 ? specificUrls[0].displayType : 'page';
            } else {
                this.display = displayType !== undefined ? displayType : '' ;
            }
        }
        return this.display;
    }
    @computed get getPath(){
            // const { path, specificUrls } = this.props.data;
        if(this.path == '' ){
            if (this.props.data.hasOwnProperty('specificUrls') && this.props.data.specificUrls.length > 0 ) {
                this.path = this.props.data.specificUrls[0].url;
        } else {
            if(this.props.data.hasOwnProperty('path'))
                this.path = this.props.data.path;
            }
        }
        return this.path;
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
        reaction(() => { return this.displayType,this.getPath},
        data => this.requestPerformanceDetailData(),
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
            // path,
            // displayType,
            uiType, clickNum, thruput, specificUrls
        } = this.props.data;
        // 点击tabTable的时候，是按'已标记:0 未标记:1'传的，需要反过来.
        // const { tagType } = this.props.performanceInteractiveStore;
        const tagType = sessionStorage.getItem('tagType');
        let isMarked;
        if(tagType == 0){
            isMarked = 1;
        }else{
            isMarked = 0;
        }
        onGetOperInfo({
            operType,
            selector,
            text,
            isMarked : isMarked,
            path: this.getPath,
            performanceType: type,
            displayType: this.displayType,
            // columnCode: JSON.stringify(['clientTime', 'serverTime'])
        });
        platform == 'pc' && this.getPath == '' || undefined ? message.info('path字段为空') : onGetOperTrend({
            operType,
            selector,
            text,
            isMarked : isMarked,
            path: this.getPath,
            performanceType: type,
            displayType: this.displayType,
            columnCode: uiType === "NATIVE" ?
                JSON.stringify(['avgRspTime', 'clickNum', 'thruput', 'apdexs', 'median', 'netWorkTime', 'clientTime', 'serverTime', 'percent5']) :
                JSON.stringify(['clickNum', 'apdexs', 'median', 'avgRspTime', 'percent5', 'thruput', 'clientTime', 'serverTime', 'netWorkTime']),

        });
        platform == 'pc' && this.getPath == '' || undefined ? message.info('path字段为空') : onGetOperSamplesList({
            operType,
            selector,
            text,
            isMarked : isMarked,
            path: this.getPath,
            displayType: this.displayType,
            performanceType: type,
        });
    }

    @action changeDisplayType(displayType,path) {
        this.display = displayType;
        this.path = path;
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
            uiType,
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
        const { specificUrls, path } = this.props.data;
        const { itemId } = this.props;
        return (
            <DetailWrap>
                <Metrics
                    
                    data ={ this.props.data }
                    type={this.props.type}
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
                {samplesList.length > 0 && <Analysis
                        sampleAnalyzeData={sampleAnalyzeData}
                        uiType={uiType}
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
                    />}
            </DetailWrap>
        );
    }
}