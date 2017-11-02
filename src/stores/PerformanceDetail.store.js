import { observable, action, runInAction, autorun, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { countryNameInCN } from '../components/Common/Chart/WorldCountryName'
import {
    getTimeType,
    getTheme,
} from '../utils/storage';

import Service from '../services/PerformanceDetail.service';

class PerformanceDetailStore {
    @observable info = {};
    @observable threadInfo = {};
    @observable analyzeData = {
        // callback: [],
        // request: [],
        // response: []
    };
    @observable sessionTrace = {
        baseInfo: {},
        detailInfo: {},
        traceInfo: []
    };
    @observable samplesList = [];
    @observable samplesListTotal = 0;
    @observable activeId = '';
    @observable time = 0;
    @observable clickIndex = 0;
    @observable displayType = '';
    @observable pageIndex = 1;
    @observable pageSize = 20;
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
        "clientTime": [],
        "callbackTime" :[]
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
        this.time = payload.time;
        this.clickIndex = payload.clickIndex;
        this.sampleAnalyzePageIndex = 1;
        this.onGetOperBaseInfo();
    }
 
    @action onLoadMore = payload => {
        this.onGetOperSamplesList(payload);
    }

    @action onChangeType = payload => {
        this.type = payload.type;
        this.sampleAnalyzePageIndex = 1;
        // 没这俩不发送请求
        this.time !==0 && this.activeId !=='' && this.onGetSampleAnalyze();
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
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                // this.trend = data;
                for(let n in this.trend){
                    for(let key in data){
                        if(n == key){
                            this.trend[n] = data[key]
                        }
                    }
                }
            });
            console.log('this.trend',this.trend);
        } catch (e) {
            throw e;
        }
    }

    @action onGetOperSamplesList = async payload => {
        try {
            const data = await Service.getOperSamplesList({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                pageIndex: this.pageIndex,
                pageSize: 20,
                ...payload
            });
            runInAction(() => {
                this.samplesList = data.data;
                this.samplesListTotal = data.total; 
                if (data.total > 0) {
                    this.clickIndex = 0;
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
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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
                    sessionId: data.constant.sessionId,
                    time: this.time
                });
                this.onGetSampleAnalyze();
            });
        } catch (e) {
            throw e;
        }
    }

    // analyze数据整合在sampleInfo接口里
    @action onGetOperAnalyze = async payload => {
        try {
            const data = await Service.getOperAnalyze({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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
            let data = await Service.getSessionTrace({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                // CN -> 中国
                if(Object.keys(data).length > 0 && data.hasOwnProperty('baseInfo') && Boolean(data.baseInfo.area)){
                    const { baseInfo } = data;
                    let areaArray = baseInfo.area.split(' ');
                    for(let i = 0; i < areaArray.length; i++){
                        for(let n in countryNameInCN){
                            if( n == areaArray[i]){
                                areaArray[i] = countryNameInCN[n]
                            }
                        }
                    }
                    let temparea = areaArray.join(' ');
                    data.baseInfo.area = temparea;
                } 
                this.sessionTrace = data;
            });
        } catch (e) {
            throw e;
        }
    }

    @action onGetSampleAnalyze = async payload => {
        try {
            const data = await Service.getSampleAnalyze({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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