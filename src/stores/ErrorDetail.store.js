import { observable, action, runInAction,autorun } from 'mobx';
import { message } from 'antd';
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
    @observable time='';

    @action onChangeUser = payload => {
        this.activeId = payload.activeId;
        this.time = payload.time;
        this.onGetSampleInfo();
    }

    @action onGetErrorTopView = async payload => {
        const { dimension } = payload;
        let params = dimension.split(':')[0];
        try{
            const data = await Service.getErrorTopView({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                version: getVersion(),
                ...payload
            });
            runInAction( ()=>{
                this.sampleList = datas.data;
            })
        } catch(e){
            throw e;
        }
    }

    @action onGetErrorDetailTrend = async payload => {
        try {
            const data = await Service.getErrorDetailTrend({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                errorId: this.activeId,
                version: getVersion(),
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
                    } else {
                        _baseInfo[i] = data[i];
                    }
                }
                this.sampleInfo = _baseInfo;
                data.sessionId ? this.onSessionTrace({
                    sessionId: data.sessionId,
                    time: this.time,
                    ...payload
                }) : message.warning('参数sessionId未定义！')
            })
        }catch(e){
            throw e;
        }
    }

    @action onSessionTrace = async payload => {
        try {
            const data = await Service.getSessionTrace({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction( () =>{
                this.sessionTrace = data;
            })
        }catch(e){
            throw e;
        }
    }
};

const errorDetailStore = new ErrorDetailStore();

export default errorDetailStore;