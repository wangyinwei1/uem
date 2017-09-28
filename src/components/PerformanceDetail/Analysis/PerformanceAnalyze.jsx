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
        var itemStyle = {
            normal: {
                barBorderRadius: 10,
                borderWidth: 10
            },
            emphasis: {
                barBorderWidth: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0.5)'
            }
        };
        const platform = sessionStorage.getItem('UEM_platform');
        const formatterParamsMobile = [
            { name: '请求URL', value: 'www.uyun.cn' },
            { name: '响应时间', value: '1.2s' },
            { name: '首字节时间', value: '50ms' },
            { name: 'HTTP方法', value: '' },
            { name: 'HTTP状态码', value: '200' },
            { name: '发送的字节数', value: '12kb' },
            { name: '接收的字节数', value: '15kb' }
        ]
        const {
            itemId,
            analyzeData,
            threadInfo
        } = this.props;
        // 移动端线程图
        const { constant, resources, threadNames } = threadInfo;
        const threadLength = threadNames ? threadNames.length : 0;
        // 原始数组 ['-','-','-',...,'-']
        let originArray = immutable.fromJS(new Array(threadLength).fill('-'));
        // 将各个线程起止时间存在对象里面
        let obj = {};
        // 按照线程名称进行分组
        const threadGroup = _.groupBy(resources, 'threadName');

        let emptyBar = {}, emptyBarCollection = [], mainCollection = [], threadCollection = [];

        // 透明条
        threadNames != undefined && threadNames.map((value, index) => {
            for (let i in threadGroup) {
                if (value == i) {
                    var len = threadGroup[i].length;
                    for (let n = 0; n < len; n++) {
                        obj[`${i}-${n}`] = threadGroup[i][n];
                        emptyBar[`${i}-${n}`] = originArray.set(index, threadGroup[i][n].start).toJS();
                    }
                }
            }
        })
        console.log('------emptybar---------', emptyBar);
        for (let i in emptyBar) {
            emptyBarCollection.push(emptyBar[i]);
        };

        // 透明条
        let emptyBarConfig = emptyBarCollection.map((item, index) => {
            return {
                name: '辅助',
                type: 'bar',
                stack: 'one',
                tooltip: { show: false },
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: item
            }
        });
        console.log('emptyBarConfig-------------', emptyBarConfig);

        for (let i in threadGroup) {
            if (i.indexOf('main') > -1) {
                mainCollection.push(threadGroup[i]);
            } else {
                threadCollection.push(threadGroup[i]);
            }
        }
        // 主线程
        let mainBarConfig=[];
        mainCollection.map((arr, index) => {
            arr.map((item,i) =>{
                mainBarConfig.push({
                name: 'method',
                type: 'bar',
                stack: 'one',
                itemStyle: {

                },
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                },
                data: originArray.set(0, item.end).toJS()
            })
            })
        })
        console.log('threadCollection-----', threadCollection);
        // 其他线程
        let threadConfig = [];
        threadCollection.map((arr, index) => {
            arr.map((item, i) => {
                if (item.resourceType == 'http') {
                    threadConfig.push({
                        name: 'http',
                        type: 'bar',
                        stack: 'one',
                        itemStyle: itemStyle,
                        label: {
                            normal: {
                                show: true,
                                position: 'right'
                            }
                        },
                        data: originArray.set(index + 1, item.end - item.start).toJS()
                    })
                } else if (item.resourceType == 'httpError') {
                    threadConfig.push({
                        name: 'http错误',
                        type: 'bar',
                        stack: 'one',
                        tooltip: { show: false },
                        itemStyle: itemStyle,
                        data: originArray.set(index + 1, item.end - item.start).toJS()
                    })
                } else {
                    threadConfig.push({
                        name: 'UI加载完成',
                        type: 'line',
                        stack: '总量',
                        itemStyle: itemStyle,
                        label: {
                            normal: {
                                show: true,
                                position: 'right'
                            }
                        },
                        axisLabel: {
                            formatter: 'just test'
                        },
                        data: [4000, 4000, 4000]
                    })
                }
            })
        })
        let newMobileConfig = emptyBarConfig.concat(mainBarConfig,threadConfig);
        console.log('-------------newMobileConfig----------',newMobileConfig);
        console.log('+++++++全部的config++++++++++',configMobile.updateIn(['series'],() => newMobileConfig).updateIn(['yAxis', 0, 'data'], () => threadNames).toJS());
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
                    <BarChart chartId={`PerformanceAnalyze-mobile-${itemId}`} 
                    options={configMobile.updateIn(['series'],() => newMobileConfig).updateIn(['yAxis', 0, 'data'], ()=>threadNames).toJS()}
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