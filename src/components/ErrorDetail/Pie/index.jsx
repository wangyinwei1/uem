import React from 'react';
import styles from './index.scss';
import config from './config.js';
import { PieChart } from '../../Common/Chart';

export default class Pie extends React.Component {
    constructor(props) {
        super(props);
        const paramsList = ['isp','os','browser'];
        paramsList.forEach((value, index, arr) => {
            this.props.onGetErrorTopView({
                // targetDimension: value,
                // metrics: 'errorCount'
                summaryId: this.props.summaryId,
                dimension: value
  
            })
        })
    }
    componentDidMount() {

    }

    render() {
        const {
            os, isp, browser, itemId
        } = this.props;
        let browserLegendData = [], browserSeriesData = [], ispLegendData = [], ispSeriesData = [], osLegendData = [], osSeriesData = [];
        browser.map((item, index) => {
            browserLegendData.push(`浏览器分布  ${item.name}`);
            browserSeriesData.push({
                name: `浏览器分布  ${item.name}`, value: item.value
            })
        });
        isp.map((item, index) => {
            ispLegendData.push(`网络分布  ${item.name}`);
            ispSeriesData.push({
                name:`网络分布  ${item.name}`, value: item.value
            })
        });
        os.map((item, index) => {
            osLegendData.push(`系统版本  ${item.name}`);
            osSeriesData.push({
                name: `系统版本  ${item.name}`, value: item.value
            })
        });
        let browserConfig = config.updateIn(['title', 'text'], () => locale('浏览器分布情况')).updateIn(['legend', 'data'], () => browserLegendData).updateIn(['series', 0, 'data'], () => browserSeriesData);
        let osConfig = config.updateIn(['title', 'text'], () => locale('操作系统分布情况')).updateIn(['legend', 'data'], () => osLegendData).updateIn(['series', 0, 'data'], () => osSeriesData);
        let ispConfig = config.updateIn(['title', 'text'], () => locale('网络分布情况')).updateIn(['legend', 'data'], () => ispLegendData).updateIn(['series', 0, 'data'], () => ispSeriesData);
        return (
            <div className={styles['pie']}>
                <div className={cls('tile-body')}>
                    <PieChart
                        chartId={`pie_1_${itemId}`} group="pieChart" className={styles['pie-chart']}
                        options={browserConfig.toJS()}
                    />
                    <PieChart
                        chartId={`pie_2_${itemId}`} group="pieChart" className={styles['pie-chart']}
                        options={osConfig.toJS()}
                    />
                    <PieChart
                        chartId={`pie_3_${itemId}`} group="pieChart" className={styles['pie-chart']}
                        options={ispConfig.toJS()}
                    />
                </div>
            </div>
        );
    }
}