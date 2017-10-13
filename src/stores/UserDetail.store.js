import { observable, runInAction, action, computed, autorun } from 'mobx';
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
    @observable newClickConfig = {};
    @action onChangeUID = payload => {
        this.uId = payload.uId;
        this.trace = [];
        this.onGetSessionCount();
    }
    @action onChangeCurrent = payload => {
        // debugger
        this.current = payload.current;
        // 点击之后更新条形图的配置。被点中的那条颜色不同
        this.newClickConfig = payload.config;
        this.trace = [];
        this.onGetUserSessionsList({
            startTime: payload.current.time,
            endTime: moment(payload.current.time).add(1, 'days').valueOf()
        });
    }
    @action onGetSessionCount = async payload => {
        try {
            const data = await Service.getUserTrend({
                // startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                // endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                // 近一个月的访问情况，不能用时间组件选择的时间
                startTime : Date.now()-(30*24*60*60*1000),
                endTime : Date.now(),
                uId: this.uId,
                version: getVersion(),
                ...payload
            });
            runInAction(() => {
                this.sessionCount = data.sessionCount;
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
                pageSize: this.pageSize,
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
            const data = await Service.getSessionTrace({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                const trace = this.trace.toJS();
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
