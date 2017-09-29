import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    DetailWrap,
} from '../components/Common';
import {
    HeaderInfo,
    BaseInfo,
    Pie,
    Trend,
    Analysis,
    PieMobile
} from '../components/ErrorDetail';

@inject('frameStore','errorDetailStore','sidePanelStore')
@observer
export default class ErrorDetail extends React.Component {
    componentDidMount() {
        
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        const {
            // state
            browser,
            os,
            isp,
            app_version,
            model,
            errorDetailTrend,
            sampleInfo,
            sampleList,
            sessionTrace,
            activeId,
            time,
            // action
            onGetErrorTopView,
            onGetSamplesList,
            onGetErrorDetailTrend,
            onGetSampleInfo,
            onSessionTrace,
            onChangeUser,
            onPassParamsInStores
        } = this.props.errorDetailStore;
        let { 
            firstTime, 
            lastTime, 
            firstPage, 
            summaryId 
        } = this.props.data;
        const { panelList } = this.props.sidePanelStore;
        const { itemId } = this.props;
        firstTime = new Date(firstTime).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
        lastTime = new Date(lastTime).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
        const platform = sessionStorage.getItem('UEM_platform');
        return (
            <DetailWrap>
                <HeaderInfo firstTime={firstTime} lastTime={lastTime} firstPage={firstPage} />
                {platform == 'pc' ?
                <Pie os={os} browser={browser} isp={isp} summaryId={summaryId} onGetErrorTopView={onGetErrorTopView} itemId={itemId} />
                :
                <PieMobile os={os} app_version={app_version} model={model} summaryId={summaryId} onGetErrorTopView={onGetErrorTopView} itemId={itemId} />
                }
                <Trend 
                    errorDetailTrend={errorDetailTrend} 
                    onGetErrorDetailTrend={onGetErrorDetailTrend}
                    summaryId={summaryId}
                    itemId={itemId}
                />
                <Analysis
                    passParamsInStores={onPassParamsInStores} 
                    sampleInfo={sampleInfo} 
                    sampleList={sampleList} 
                    sessionTrace={sessionTrace}
                    onGetSamplesList={onGetSamplesList}
                    panelList = {panelList[panelList.length-1]}
                    onGetSampleInfo={onGetSampleInfo}
                    onSessionTrace={onSessionTrace}
                    errorId={summaryId} 
                    activeId={activeId}
                    changeUser={onChangeUser}
                    time={time}
                />
                <pre>
                    <h3>从二级表格传进来的数据</h3>
                    {JSON.stringify(this.props.data, null, 4)}
                    <h3>错误详情页数据</h3>
                    {JSON.stringify(this.props.errorDetailStore,null,4)}
                </pre>
            </DetailWrap>
        );
    }
}