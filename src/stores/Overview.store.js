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
    @observable userDistribution = {
        yAxis: [],
        series: []
    };

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
            const datas = await Service.getUserDistribution(payload);
            runInAction(() => {
                let yAxisData = [], seriesData = [], tempMapData = {};
                 datas.data && datas.data.map((item,index) => {
                    yAxisData.push(item.area);
                    seriesData.push(item.value);
                 })
                tempMapData.yAxis = yAxisData;
                tempMapData.series = seriesData;
                this.userDistribution = tempMapData;
            });
            return datas;
        } catch (e) {
            throw e;
        }
    }
}

const overviewStore = new OverviewStore();

export default overviewStore;