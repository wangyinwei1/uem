import { observable, action, runInAction,autorun } from 'mobx';
import { message } from 'antd';
import { countryNameInCN } from '../components/Common/Chart/WorldCountryName';
// import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType,getVersion
} from '../utils/storage';
import Service from '../services/ErrorDetail.service';

class ErrorDetailStore {
    @observable browser = [];
    @observable os = [];
    @observable isp = [];
    @observable app_version = [];
    @observable model = [];
    @observable errorDetailTrend = {};
    @observable sampleInfo = [];
    @observable sampleList = [];
    @observable sessionTrace = [];
    @observable activeId = '';
    @observable clickIndex = 0;
    @observable time='';
    @observable errorType = '';
    // @observable errorId = '';

    @action onChangeUser = payload => {
        this.activeId = payload.activeId;
        this.time = payload.time;
        this.clickIndex = payload.clickIndex;
        this.onGetSampleInfo();
    }

    @action onPassParamsInStores = payload => {
        this.errorType = payload.errorType;
    }

    @action onGetErrorTopView = async payload => {
        const { dimension } = payload;
        let params = dimension.split(':')[0];
        try{
            const data = await Service.getErrorTopView({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                version: getVersion(),
                ...payload
            });
            runInAction( ()=>{
                this[params] = data;
            } )
        } catch(e){
            throw e;
        }
    }

    @action  onGetSamplesList = async payload => {
        try {
            const datas = await Service.getSamplesList({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                version: getVersion(),
                ...payload
            });
            runInAction( ()=>{
                this.sampleList = datas.data;
                if(datas.data.length != 0){
                    // 第一次进来的时候，发送列表第一行的请求
                    this.clickIndex = 0;
                    this.activeId = datas.data[0].sampleId;
                    this.time = datas.data[0].time;
                    this.onGetSampleInfo({
                        errorId: this.activeId,
                        time: this.time
                    })
                }
            })
        } catch(e){
            throw e;
        }
    }

    @action onGetErrorDetailTrend = async payload => {
        try {
            const data = await Service.getErrorDetailTrend({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                version: getVersion(),
                ...payload
            });
            runInAction( () => {
                this.errorDetailTrend = data;
            });
        }catch(e){
            throw e;
        }
    }

    @action onGetSampleInfo = async payload => {
        try {
            const data = await Service.getSampleInfo({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                errorId: this.activeId,
                version: getVersion(),
                time: this.time,
                errorType: this.errorType,
                ...payload
            });
            runInAction( () =>{
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
                    } 
                    if(i === 'area'){
                        let areaArray = data[i].split(' ');
                        for(let i = 0; i < areaArray.length; i++){
                            for(let n in countryNameInCN){
                                if( n == areaArray[i]){
                                    areaArray[i] = countryNameInCN[n]
                                }
                            }
                        }
                        let temparea = areaArray.join(' ');
                        _baseInfo['area'] = temparea;
                    }
                    else {
                        _baseInfo[i] = data[i];
                    }
                }
                this.sampleInfo = _baseInfo;
                // this.errorType = this.sampleInfo.errorType;
                data.hasOwnProperty('constant') ? this.onSessionTrace({
                    sessionId: data.constant.sessionId,
                    time: this.time,
                    ...payload
                }) : this.onSessionTrace({
                    sessionId: data.sessionId,
                    time: this.time,
                    ...payload
                })
            })
        }catch(e){
            throw e;
        }
    }

    @action onSessionTrace = async payload => {
        try {
            let data = await Service.getSessionTrace({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction( () =>{
                // if(Object.keys(data).length > 0 && data.hasOwnProperty('baseInfo') && Boolean(data.baseInfo.area)){
                //     const { baseInfo } = data;
                //     let areaArray = baseInfo.area.split(' ');
                //     for(let i = 0; i < areaArray.length; i++){
                //         for(let n in countryNameInCN){
                //             if( n == areaArray[i]){
                //                 areaArray[i] = countryNameInCN[n]
                //             }
                //         }
                //     }
                //     let temparea = areaArray.join(' ');
                //     data.baseInfo.area = temparea;
                // } 
                this.sessionTrace = data;
            })
        }catch(e){
            throw e;
        }
    }
};

const errorDetailStore = new ErrorDetailStore();

export default errorDetailStore;