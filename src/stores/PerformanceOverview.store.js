import { observable, action, runInAction } from 'mobx';
import { default as PerformacneOverviewService  } from '../services/PerformanceOverview.service';
import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType
} from '../utils';

class PerformanceOverviewStore {
    @observable keyIndicator = {};
    @observable performanceTrend = {};
    // @observable performanceApdex = {};
    @observable mapData = {};
    timeType = getTimeType();

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
            const data = await CommonService.getMapData({
                startTime: moment().subtract(this.timeType.type, this.timeType.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.mapData = data;
            });
            return data;
        } catch (e) {
            throw e;
        }
    }
}

const performanceOverviewStore = new PerformanceOverviewStore();

export default performanceOverviewStore;