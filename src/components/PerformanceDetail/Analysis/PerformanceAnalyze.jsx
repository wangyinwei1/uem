import React from 'react';
import config from './config';
import Resource from './Resource';
import immutable from 'immutable';
import {
    BarChart
} from '../../Common/Chart';
import configMobile from './configMobile';

export default class PerformanceAnalyze extends React.Component {
    id = 0;
    render() {
        const platform = sessionStorage.getItem('UEM_platform');
        const formatterParamsMobile = [
            {name: '请求URL',value: 'www.uyun.cn'},
            {name: '响应时间', value: '1.2s'},
            {name: '首字节时间', value: '50ms'},
            {name: 'HTTP方法', value: ''},
            {name: 'HTTP状态码', value: '200'},
            {name: '发送的字节数', value: '12kb'},
            {name: '接收的字节数',value: '15kb'}
    ]
        const {
            itemId, 
            analyzeData,
            threadInfo 
        } = this.props;
        // 移动端线程图
        const { constant,resources,threadNames } = threadInfo;
        const threadLength = threadNames ? threadNames.length : 0;
        // 原始数组 ['-','-','-',...,'-']
        let originArray = immutable.fromJS(new Array(threadLength).fill('-'));
        // 将各个线程起止时间存在对象里面
        let obj = {};
        // 按照线程名称进行分组
        const threadGroup =_.groupBy(resources, 'threadName');
        // 透明条
        let emptyBar = [];
        // threadNames != undefined && threadNames.map((value,index) => {
        //     for(let i in threadGroup){
        //         if(value == i){
        //         var len = threadGroup[i].length;
        //         for(let n = 0; n < len; n++){
        //             obj[`${i}-${n}`] = [threadGroup[i][n]];
        //             emptyBar[index] = originArray.set(index,threadGroup[i][n].start).toJS();

        //         }
        //     }
        //     }
        // })
        // console.log('obj里的是',obj,emptyBar);
        // emptyBar.map((item,index) => {
        //     return {
                
        //     }
        // })




        // pc的
        const bars = (() => {
            const arr = [];
            for (let i in analyzeData) {
                arr.push(i);
            }
            return arr;
        })();
        const startArr = bars.map(item => {
            return analyzeData[item][0];
        });
        const endArr = bars.map(item => {
            return analyzeData[item][1];
        });
        return (
            platform == 'pc' ?
            <div key={bars.length}>
                <BarChart chartId={`PerformanceAnalyze-${itemId}`} options={config.get('default').mergeDeep(config.get('analyze'))
                    .setIn(['yAxis', 0, 'data'], bars) 
                    .setIn(['series', 0, 'data'], startArr)
                    .setIn(['series', 1, 'data'], endArr) 
                    .toJS()} 
                />
                <Resource 
                    data={this.props.sampleAnalyzeData} 
                    type={this.props.type}
                    changeType={this.props.changeType}
                    changeResourcePage={this.props.changeResourcePage}
                />
            </div>
            :
            <div key={bars.length}>
            <BarChart chartId={`PerformanceAnalyze-mobile-${itemId}`} options={configMobile} 
            />
            <Resource 
                data={this.props.sampleAnalyzeData} 
                type={this.props.type}
                changeType={this.props.changeType}
                changeResourcePage={this.props.changeResourcePage}
            />
        </div>
        );
    }
}