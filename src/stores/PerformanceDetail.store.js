import { observable, action, runInAction } from 'mobx';
import {
    getTimeType,
    getTheme,
} from '../utils/storage';

import Service from '../services/PerformanceDetail.service';

class PerformanceDetailStore {
    @observable info = {};
    @observable baseInfo = {};
    @observable analyzeData = {
        callback: [],
        request: [],
        response: []
    };
    @observable sessionTrace = {
        browserBaseInfo: {},
        detailInfo: {},
        traceInfo: []
    };
    @observable samplesList = [];
    @observable activeId = '';
    @observable pageIndex = 1;
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

    @action onChangeUser = payload => {
        this.activeId = payload.activeId;
        this.onGetOperBaseInfo();
    }
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
    @action onGetOperSamplesList = async payload => {
        try {
            const data = await Service.getOperSamplesList({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                pageIndex: this.pageIndex,
                ...payload
            });
            runInAction(() => {
                this.samplesList = data.data;
                if (data.data.length !== 0) {
                    this.activeId = data.data[0].sampleId;
                    this.onGetOperBaseInfo();
                }
            });
        } catch (e) {
            throw e;
        }
    }
    @action onGetOperBaseInfo = async payload => {
        try {
            const data = await Service.getOperBaseInfo({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                operType: this.info.operType,
                sampleId: this.activeId,
                ...payload
            });
            runInAction(() => {
                const _baseInfo = {};
                for (let i in data) {
                    if (i === 'userDefined') {
                        const userDefinedArr = [];
                        for (let j in data[i]) {
                            userDefinedArr.push({
                                name: j,
                                value: data[i][j]
                            });
                        }
                        _baseInfo['userDefined'] = userDefinedArr;
                    } else {
                        _baseInfo[i] = data[i];
                    }
                }
                this.baseInfo = _baseInfo;
                this.onGetOperAnalyze();
                this.onGetSessionTrace({
                    sessionId: data.sessionId,
                    time: data.timestamp
                });
            });
        } catch (e) {
            throw e;
        }
    }
    @action onGetOperAnalyze = async payload => {
        try {
            const data = await Service.getOperAnalyze({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                operType: this.info.operType,
                sampleId: this.activeId,
                ...payload
            });
            runInAction(() => {
                this.analyzeData = data;
            });
        } catch (e) {
            throw e;
        }
    }
    @action onGetSessionTrace = async payload => {
        try {
            const data = await Service.getSessionTrace({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.sessionTrace = data;
            });
        } catch (e) {
            throw e;
        }
    }
}

const performanceDetailStore = new PerformanceDetailStore();

export default performanceDetailStore;