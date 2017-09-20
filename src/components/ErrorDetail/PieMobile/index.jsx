import React from 'react';
import styles from './index.scss';
import config from './config.js';
import { PieChart } from '../../Common/Chart';
/*
* 错误列表详情页移动端的三个饼图 
*/ 
export default class PieMobile extends React.Component {
    constructor(props) {
        super(props);
        const paramsList = ['app_version','os','model'];
        paramsList.forEach((value, index, arr) => {
            this.props.onGetErrorTopView({
                // targetDimension: value,
                // metrics: 'errorCount'
                summaryId: this.props.summaryId,
                dimension: JSON.stringify([value])
  
            })
        })
    }
    componentDidMount() {

    }

    render() {
        const {
            os, app_version, model,itemId
        } = this.props;
        let osLegendData = [], osSeriesData = [], app_versionLegendData = [], app_versionSeriesData = [], modelLegendData = [], modelSeriesData = [];
        app_version.map((item, index) => {
            app_versionLegendData.push(item.name);
            app_versionSeriesData.push({
                name: item.name, value: item.value
            })
        });
        model.map((item, index) => {
            modelLegendData.push(item.name);
            modelSeriesData.push({
                name: item.name, value: item.value
            })
        });
        os.map((item, index) => {
            osLegendData.push(item.name);
            osSeriesData.push({
                name: item.name, value: item.value
            })
        });
        let app_versionConfig = config.updateIn(['title', 'text'], () => locale('版本分布情况')).updateIn(['legend', 'data'], () => app_versionLegendData).updateIn(['series', 0, 'data'], () => app_versionSeriesData);
        let osConfig = config.updateIn(['title', 'text'], () => locale('操作系统分布情况')).updateIn(['legend', 'data'], () => osLegendData).updateIn(['series', 0, 'data'], () => osSeriesData);
        let modelConfig = config.updateIn(['title', 'text'], () => locale('设备分布情况')).updateIn(['legend', 'data'], () => modelLegendData).updateIn(['series', 0, 'data'], () => modelSeriesData);
        return (
            <div className={styles['pie']}>
                <div className={cls('tile-body')}>
                    <PieChart
                        chartId={`pie_1_${itemId}`} group="pieChart" className={styles['pie-chart']}
                        options={app_versionConfig.toJS()}
                    />
                    <PieChart
                        chartId={`pie_2_${itemId}`} group="pieChart" className={styles['pie-chart']}
                        options={osConfig.toJS()}
                    />
                    <PieChart
                        chartId={`pie_3_${itemId}`} group="pieChart" className={styles['pie-chart']}
                        options={modelConfig.toJS()}
                    />
                </div>
            </div>
        );
    }
}