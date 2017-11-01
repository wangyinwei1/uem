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
    sampleListParams ={};
    @observable display = '';
    @observable path = '';
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
    @action initDisplay(){
        // debugger
         if (this.display == '') {
            const { type } = this.props;
            const { uiType, specificUrls,displayType } = this.props.data;
            const platform = sessionStorage.getItem('UEM_platform');
            // if (uiType == 'HTML' || platform == 'pc' ) {
            //     // 取specificUrls第一个displayType作为参数
            //     this.display = specificUrls !== undefined && specificUrls.length > 0 ? specificUrls[0].displayType : 'page';
            //     // display1 = specificUrls !== undefined && specificUrls.length > 0 ? specificUrls[0].displayType : 'page';
            // } else {
            //     this.display = displayType !== undefined ? displayType : '' ;
            //     // display1 = displayType !== undefined ? displayType : '' ;
            // }
            // this.display = displayType ;
            if( type == 'browse'  &&  displayType == undefined ){
                this.display = 'page';
            }
            else if( type == 'interaction' && displayType == undefined ){
                this.display = "";
            }else if(type == 'interaction' && displayType !== undefined){
                this.display = displayType;
            }    
        }
        // console.log('this.display',this.display);
    }
    @action initPath(){
        if(this.path == '' ){
            if(Boolean(this.props.data.requestPath)){
                // 优先取requestPath
                this.path = this.props.data.requestPath;
            }else if(Boolean(this.props.data.specificUrls) && this.props.data.specificUrls.length > 0){
                //specificUrls存在且不为空取第一个的
                this.path = this.props.data.specificUrls[0].url;
            }
            else if(this.props.data.hasOwnProperty('path')){
                // 最后取path（页面浏览里）
                this.path = this.props.data.path;
            }
            // if(this.props.data.hasOwnProperty('specificUrls') && this.props.data.specificUrls.length > 0 ) {
            //     this.path = this.props.data.specificUrls[0].url;
            // } 
        }
    }
    componentDidMount() {
        // 第一次请求时的参数
        this.initDisplay();
        this.initPath();
        this.reloadUrl();
    };

    /* 
    *   当交互详情页面的url改变时，重新发起请求 
    *   reaction(()=>data,data=>{},true)
    *   第三个参数布尔值表示是否对传入的值立即做出反应，否则只对data传入新值的时候有反应
    */
    reloadUrl() {
        // reaction(() => { return this.displayType,this.getPath },
        reaction(() => { return this.display,this.path },
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
        const { path } = this.props.data;
        const tagType = sessionStorage.getItem('tagType');
        let isMarked;
        if(tagType == 0){
            isMarked = 1;
        }else{
            isMarked = 0;
        }
        !Boolean(this.path) ? message.info('requestPath字段为空') : onGetOperInfo({
            operType,
            selector,
            text,
            isMarked : isMarked,
            requestPath: this.path,
            path: path,
            performanceType: type,
            displayType: JSON.stringify([this.display]),
            // columnCode: JSON.stringify(['clientTime', 'serverTime'])
        });

        !Boolean(this.path) ? message.info('requestPath字段为空') : onGetOperTrend({
            operType,
            selector,
            text,
            isMarked : isMarked,
            requestPath: this.path,
            path: path,
            performanceType: type,
            displayType: JSON.stringify([this.display]),
            columnCode: uiType === "NATIVE" ?
                JSON.stringify(['avgRspTime', 'thruput', 'apdexs', 'median', 'netWorkTime', 'clientTime', 'serverTime', 'percent5','callbackTime']) :
                JSON.stringify(['apdexs', 'median', 'avgRspTime', 'percent5', 'thruput', 'clientTime', 'serverTime', 'netWorkTime','callbackTime']),
        });
        // 因为设计问题，这里的clickNum需要另外发送，它的displayType和requestPath都为''
        onGetOperTrend({
            operType,
            selector,
            text,
            isMarked : isMarked,
            requestPath: '',
            path: path,
            performanceType: type,
            displayType: JSON.stringify(['']),
            columnCode:JSON.stringify(['clickNum'])
        });

        !Boolean(this.path) ? message.info('path字段为空') : onGetOperSamplesList({
            operType,
            selector,
            text,
            isMarked : isMarked,
            requestPath: this.path,
            path: path,
            displayType: JSON.stringify([this.display]),
            performanceType: type,
        });
        this.sampleListParams = {
            operType,
            selector,
            text,
            isMarked : isMarked,
            requestPath: this.path,
            path: path,
            displayType: JSON.stringify([this.display]),
            performanceType: type,
            // "loadMore" : true    
        }
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
            samplesListTotal,
            sessionTrace,
            activeId,
            clickIndex,
            analyzeData,
            type,
            sampleAnalyzeData,
            onChangeResourcePage,
            onLoadMore,
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
        const { path, specificUrls,requestPath } = this.props.data;
        // const specificUrls = Boolean(this.props.data.specificUrls) ? this.props.data.specificUrls : this.props.data.path;
        const { itemId } = this.props;
        return (
            <DetailWrap>
                 {/* <span id='hideBtn' className={cls('iconfont icon-anonymous-iconfont',{'fr': true},styles['hideBtn'])}></span> */}
                <Metrics
                        
                    data ={ this.props.data }
                    type={this.props.type}
                    props={{
                        operType,
                        url,
                        uiType,
                        operName,
                        specificUrls,
                        requestPath,
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
                        specificUrls={Boolean(specificUrls) && specificUrls.length > 0 ? specificUrls : path}
                        displayType={this.display}
                    />
                    :
                    <FlowChart threadInfo={info} />
                }
                <Trend itemId={itemId} displayType={this.display} trend={trend} uiType={info.uiType} type={this.props.type} specificUrls={Boolean(specificUrls) && specificUrls.length > 0 ? specificUrls : path} />
                {samplesList.length > 0 && <Analysis
                        sampleAnalyzeData={sampleAnalyzeData}
                        uiType={uiType}
                        type={type}
                        itemId={itemId}
                        threadInfo={threadInfo}
                        baseInfo={sessionTrace.baseInfo}
                        samplesList={samplesList}
                        samplesListTotal={samplesListTotal}
                        onLoadMore={onLoadMore}
                        sampleListParams={this.sampleListParams}
                        activeId={activeId}
                        clickIndex={clickIndex}
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