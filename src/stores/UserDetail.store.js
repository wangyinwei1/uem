import { observable, runInAction, action, computed, autorun } from 'mobx';
import { countryNameInCN } from '../components/Common/Chart/WorldCountryName';
import Service from '../services/UserDetail.service';
import {
    getTimeType,
    getTheme,
    getVersion
} from '../utils/storage';

class UserDetailStore {
    @observable uId = '';
    @observable pageIndex = 1;
    @observable pageSize = 10;
    @observable current = {};
    @observable sessionCount = [];
    @observable sessionList = [];
    @observable trace = [];
    @action onChangeUID = payload => {
        this.uId = payload.uId;
        this.trace = [];
        this.onGetSessionCount();
    }
    @action onChangeCurrent = payload => {
        this.current = payload.current;
        // 点击之后更新条形图的配置。被点中的那条颜色不同
        this.trace = [];
        this.onGetUserSessionsList({
            startTime: payload.current.time,
            endTime: moment(payload.current.time).add(1, 'days').valueOf()
        });
    }
    @action onGetSessionCount = async payload => {
        try {
            const data = await Service.getUserTrend({
                // startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                // endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                // 近一个月的访问情况，不能用时间组件选择的时间
                startTime : Date.now()-(30*24*60*60*1000),
                endTime : Date.now(),
                uId: this.uId,
                version: getVersion(),
                ...payload
            });
            runInAction(() => {
                this.sessionCount = data.sessionCount;
                if( data.sessionCount.length > 0){
                    this.onChangeCurrent({ current: data.sessionCount[data.sessionCount.length - 1] })
                }
            });
        } catch (e) {
            throw e;
        }
    }
    @action onGetUserSessionsList = async payload => {
        try {
            const data = await Service.getUserSessionsList({
                uId: this.uId,
                pageIndex: this.pageIndex,
                // 暂时取20，后续待优化
                pageSize: 20,
                version: getVersion(),
                ...payload
            });
            runInAction(() => {
                this.sessionList = data;
                this.sessionList.forEach(item => {
                    this.onGetTrace({
                        sessionId: item.sessionId,
                        time: item.timestamp
                    });
                });
            });
        } catch (e) {
            throw e;
        }
    }
    @action onGetTrace = async payload => {
        try {
            let data = await Service.getSessionTrace({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                const trace = this.trace.toJS();
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
                trace.push(data);
                this.trace = trace;
                // console.log(this.trace);
            });
        } catch (e) {
            throw e;
        }
    }
}

const userDetailStore = new UserDetailStore();

export default userDetailStore;
