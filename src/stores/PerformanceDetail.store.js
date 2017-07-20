import { observable, action, runInAction } from 'mobx';
import {
    getTimeType,
    getTheme,
} from '../utils/storage';

import Service from '../services/PerformanceDetail.service';

class PerformanceDetailStore {
    @observable info = {};
    @observable trend = {
        "thruput": [],
        "request": [],
        "percent5": [],
        "median": [],
        "apdexs": {
            "apdexD": 0,
            "apdexT": 0,
            "apdexS": 0
        },
        "response": [],
        "callback": [],
        "rspTime": [],
        "clickNum": [],
        "serverTime": [],
        "netTime": [],
        "clientTime": []
    };
    timeType = getTimeType();

    @action onGetOperInfo = async payload => {
        try {
            const data = await Service.getOperInfo({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.info = data;
            });
        } catch (e) {
            throw e;
        }
    }
    @action onGetOperTrend = async payload => {
        try {
            const data = await Service.getOperTrend({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.trend = data;
            });
        } catch (e) {
            throw e;
        }
    }
}

const performanceDetailStore = new PerformanceDetailStore();

export default performanceDetailStore;