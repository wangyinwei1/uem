import { observable, action, runInAction } from 'mobx';
import Service from '../services/Overview.service';

class OverviewStore {
    @observable deploy = {};
    @observable realTimeData = {
        apdex: 0,
        sPercentage: '--',
        tPercentage: '--',
        dPercentage: '--'
    };
    @observable trend = {};
    @observable userDistribution = {};

    @action getRealTimeData = async payload => {
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
    @action getApdex = async payload => {
        try {
            const data = await Service.getApdex(payload);
            runInAction(() => {
                this.deploy = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action getTrend = async payload => {
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
    @action getUserDistribution = async payload => {
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