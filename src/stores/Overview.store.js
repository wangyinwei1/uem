import { observable, action, runInAction } from 'mobx';
import Service from '../services/Overview.service';
import {
    getDeploy
} from '../utils/storage';

class OverviewStore {
    @observable deploy = getDeploy();
    @observable realTimeData = {
        apdex: 0,
        sPercentage: '--',
        tPercentage: '--',
        dPercentage: '--'
    };
    @observable trend = {
        pv: {
            today: [],
            yesterday: []
        },
        uv: {
            today: [],
            yesterday: []
        },
        clickNum: {
            today: [],
            yesterday: []
        },
        avgRspTime: {
            today: [],
            yesterday: []
        },
        errorCount: {
            today: [],
            yesterday: []
        },
    };
    @observable userDistribution = {};

    @action onGetRealTimeData = async payload => {
        try {
            const data = await Service.getRealTimeData(payload);
            runInAction(() => {
                this.realTimeData = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onGetApdex = async payload => {
        try {
            const data = await Service.getApdex(payload);
            runInAction(() => {
                this.deploy = data;
                sessionStorage.setItem('UEM_deploy', JSON.stringify(data));
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onGetTrend = async payload => {
        try {
            const data = await Service.getTrend(payload);
            runInAction(() => {
                this.trend = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onGetUserDistribution = async payload => {
        try {
            const data = await Service.getUserDistribution(payload);
            runInAction(() => {
                this.userDistribution = data;
            });
            return data;
        } catch (e) {
            throw e;
        }
    }
}

const overviewStore = new OverviewStore();

export default overviewStore;