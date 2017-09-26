import { observable, action, runInAction, autorun, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
    getTimeType,
    getTheme,
} from '../utils/storage';

import Service from '../services/PerformanceDetail.service';

class PerformanceDetailStore {
    @observable info = {};
    @observable threadInfo = {};
    @observable analyzeData = {
        callback: [],
        request: [],
        response: []
    };
    @observable sessionTrace = {
        baseInfo: {},
        detailInfo: {},
        traceInfo: []
    };
    @observable samplesList = [];
    @observable activeId = '';
    @observable time = new Date();
    @observable displayType = '';
    @observable pageIndex = 1;
    @observable trend = {
        "thruput": [],
        "percent5": [],
        "median": [],
        "apdexs": {
            "apdexD": 0,
            "apdexT": 0,
            "apdexS": 0
        },
        // "request": [],
        // "response": [],
        // "callback": [],
        "avgRspTime": [],
        "clickNum": [],
        "serverTime": [],
        "netWorkTime": [],
        "clientTime": []
    };
    @observable type = 'all';
    @observable sampleAnalyzePageIndex = 1;
    @observable sampleAnalyze = {
        total: 0,
        data: []
    };

    @computed get sampleAnalyzeData() {
        const { data, total } = this.sampleAnalyze;
        return {
            data: this.sampleAnalyze.data,
            total: this.sampleAnalyze.total,
            pageIndex: this.sampleAnalyzePageIndex,
        };
    }

    @action onChangeUser = payload => {
        this.activeId = payload.activeId;
        this.sampleAnalyzePageIndex = 1;
        this.onGetOperBaseInfo();
    }

    @action onChangeType = payload => {
        this.type = payload.type;
        this.sampleAnalyzePageIndex = 1;
        this.onGetSampleAnalyze();
    }

    @action onChangeResourcePage = payload => {
        this.sampleAnalyzePageIndex = payload.pageIndex;
        this.onGetSampleAnalyze();
    }

    @action onGetOperInfo = async payload => {
        const platform = sessionStorage.getItem('UEM_platform');
        this.displayType = payload.displayType;
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

        const platform = sessionStorage.getItem('UEM_platform');
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
                pageSize: 100,
                ...payload
            });
            runInAction(() => {
                this.samplesList = data.data;
                if (data.data.length !== 0) {
                    this.activeId = data.data[0].sampleId;
                    this.time = data.data[0].time;
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
                time: this.time,
                displayType: this.displayType,
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
                this.threadInfo = _baseInfo;
                // this.onGetOperAnalyze();
                data.constant.sessionId && this.onGetSessionTrace({
                    // sessionID
                    sessionId: data.constant.sessionId,
                    time: this.time
                });
                this.onGetSampleAnalyze();
            });
        } catch (e) {
            throw e;
        }
    }
    // 貌似这个接口砍掉了，后续注意
    @action onGetOperAnalyze = async payload => {
        try {
            const data = await Service.getOperAnalyze({
                // startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                // endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                time: this.time,
                displayType: this.displayType,
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

    @action onGetSampleAnalyze = async payload => {
        try {
            const data = await Service.getSampleAnalyze({
                // startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                // endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                time: this.time,
                pageIndex: this.sampleAnalyzePageIndex,
                sampleId: this.activeId,
                type: this.type,
                ...payload
            });
            runInAction(() => {
                this.sampleAnalyze.data = data;
                this.sampleAnalyze.total = length;
            });
        } catch (e) {
            throw e;
        }
    }
}

const performanceDetailStore = new PerformanceDetailStore();

export default performanceDetailStore;