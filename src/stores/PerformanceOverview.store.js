import { observable, action, runInAction,autorun } from 'mobx';
import { default as PerformacneOverviewService  } from '../services/PerformanceOverview.service';
import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType
} from '../utils/storage';

class PerformanceOverviewStore {
    @observable keyIndicator = {};
    @observable performanceTrend = {};
    // @observable performanceApdex = {};
    @observable mapData = {};
    timeType = getTimeType();

    constructor(){
        autorun(() => { console.log('[store -> mapData]:', this.mapData) }) 
    }
    @action onGetKeyIndicator = async payload => {
        try {
            const data = await CommonService.getKeyIndicator({
                startTime: moment().subtract(this.timeType.type, this.timeType.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.keyIndicator = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onGetPerformanceTrend = async payload => {
        try {
            const data = await CommonService.getPerformanceTrend(payload);
            runInAction(() => {
                this.performanceTrend = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
    // @action onGetPerformanceApdex = async payload => {
    //     try {
    //         const data = await PerformacneOverviewService.getPerformanceTrend(payload);
    //         runInAction(() => {
    //             this.performanceApdex = data;
    //         });
    //         return data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    @action onGetMapData = async payload => {
        try {
            const datas = await CommonService.getMapData({
                startTime: moment().subtract(this.timeType.type, this.timeType.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                let yAxisData = [], seriesData = [];
                datas.data && datas.data.map((item, index) => {
                    yAxisData.push(item.area);
                    seriesData.push(item.avgRspTime);
                })
                let tempMapData = this.mapData;
                tempMapData.yAxis = yAxisData;
                tempMapData.series = seriesData;
                this.mapData = tempMapData;
            });
            return datas;
        } catch (e) {
            throw e;
        }
    }
}

const performanceOverviewStore = new PerformanceOverviewStore();

export default performanceOverviewStore;