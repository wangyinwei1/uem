import React from 'react';
import config from './config';
import {
    BarChart
} from '../../Common/Chart';

export default class PerformanceAnalyze extends React.Component {
    render() {
        const { 
            itemId, 
            analyzeData 
        } = this.props;
        
        const arr = (() => {
            const _arr = [];
            _arr.push(analyzeData.request[0]);
            _arr.push(analyzeData.response[0]);
            _arr.push(analyzeData.callback[0]);
            return _arr.reverse();
        })();
        const arrData = (() => {
            const _arr = [];
            _arr.push(analyzeData.request[1]);
            _arr.push(analyzeData.response[1]);
            _arr.push(analyzeData.callback[1]);
            return _arr.reverse();
        })();
        return (
            <div>
                <BarChart chartId={`PerformanceAnalyze-${itemId}`} options={config.get('default').mergeDeep(config.get('analyze'))
                    .setIn(['series', 0, 'data'], arr)
                    .setIn(['series', 1, 'data'], arrData)
                    .toJS()} 
                />
            </div>
        );
    }
}