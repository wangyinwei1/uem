import { observable, runInAction, action, computed, autorun } from 'mobx';
import Service from '../services/UserDetail.service';
import {
    getTimeType,
    getTheme,
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
        this.trace = [];
        this.onGetUserSessionsList({
            startTime: payload.current.time,
            endTime: moment(payload.current.time).add(1, 'days').valueOf()
        });
    }
    @action onGetSessionCount = async payload => {
        try {
            const data = await Service.getUserTrend({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                uId: this.uId,
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
                ...payload
            });
            runInAction(() => {
                this.sessionList = data.data;
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
