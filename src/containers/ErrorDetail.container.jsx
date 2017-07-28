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
    Analysis
} from '../components/ErrorDetail';

@inject('frameStore','errorDetailStore')
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
            onChangeUser
        } = this.props.errorDetailStore;
        let { 
            firstTime, 
            lastTime, 
            firstPage, 
            summaryId 
        } = this.props.data;

        const { itemId } = this.props;
        firstTime = new Date(firstTime).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
        lastTime = new Date(lastTime).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
        // console.log('this.props--------',this.props);
        return (
            <DetailWrap>
                <HeaderInfo firstTime={firstTime} lastTime={lastTime} firstPage={firstPage} />
                <Pie os={os} browser={browser} isp={isp} summaryId={summaryId} onGetErrorTopView={onGetErrorTopView} itemId={itemId} />
                <Trend 
                    errorDetailTrend={errorDetailTrend} 
                    onGetErrorDetailTrend={onGetErrorDetailTrend}
                    summaryId={summaryId}
                    itemId={itemId}
                />
                <Analysis 
                    sampleInfo={sampleInfo} 
                    sampleList={sampleList} 
                    sessionTrace={sessionTrace}
                    onGetSamplesList={onGetSamplesList}
                    onGetSampleInfo={onGetSampleInfo}
                    onSessionTrace={onSessionTrace}
                    errorId={summaryId} 
                    activeId={activeId}
                    changeUser={onChangeUser}
                    time={time}
                />
                {/*<pre>
                    {JSON.stringify(this.props.data, null, 4)}
                </pre>*/}
            </DetailWrap>
        );
    }
}