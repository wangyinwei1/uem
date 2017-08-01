import React from 'react';
import config from './config';
import Resource from './Resource';
import {
    BarChart
} from '../../Common/Chart';

export default class PerformanceAnalyze extends React.Component {
    id = 0;
    render() {
        const {
            itemId, 
            analyzeData 
        } = this.props;
        
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
        );
    }
}