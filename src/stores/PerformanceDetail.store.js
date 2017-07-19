import { observable, action, runInAction } from 'mobx';
import {
    getTimeType,
    getTheme,
} from '../utils/storage';

import Service from '../services/PerformanceDetail.service';

class PerformanceDetailStore {
    @observable info = {}
    timeType = getTimeType();

    @action onGetOperInfo = async payload => {
        try {
            const data = await Service.getOperInfo({
                startTime: moment().subtract(this.timeType.startTime.type, this.timeType.startTime.units).valueOf(),
                endTime: moment().subtract(this.timeType.endTime.type, this.timeType.endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.info = data;
            });
        } catch (e) {
            throw e;
        }
    }
}

const performanceDetailStore = new PerformanceDetailStore();

export default performanceDetailStore;