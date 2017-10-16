import { observable, action, runInAction } from 'mobx';
import Service from '../services/Overview.service';
import {
    getDeploy
} from '../utils/storage';
import { countryNameInCN, countryNameInEN } from '../components/Common/Chart/WorldCountryName';

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
    @observable trendMobile = {
        sessionCount: {
            today: [],
            yesterday: []
        },
        avgUiRspTime: {
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
    }
    @observable userDistribution = {
        yAxis: [],
        series: [],
        total:1
    };

    @action setDeploy = () => {
        this.deploy = getDeploy()
    }

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
            if(sessionStorage.getItem('UEM_platform') == 'pc' ){
                runInAction(() => {
                this.trend = data;
            });
        }else {
            this.trendMobile = data;
        }
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onGetUserDistribution = async payload => {
        const { areaType } = payload;
        try {
            const datas = await Service.getUserDistribution(payload);
            if( areaType == 'province' ){
                 datas.data && datas.data.map((item,index)=>{
                    if(item.areaName == '-'){
                        item.areaName = '未知地址'
                    }
                })
                runInAction(() => {
                    let yAxisData = [], seriesData = [], tempMapData = {};
                    datas.data.length > 0  && datas.data.map((item,index) => {
                        yAxisData.push(item.areaName);
                        seriesData.push(item.value);
                    })
                    let total = yAxisData.length;
                    tempMapData.yAxis = yAxisData;
                    tempMapData.series = seriesData;
                    tempMapData.total = total;
                    // tempMapData.series.length>0 && tempMapData.sort((a,b)=> b.series - a.series);
                    this.userDistribution = tempMapData;
                });
            }else{
               datas.data.length > 0 && datas.data.map((item,index) => {
                    for(let n in countryNameInEN){
                        if(n == item.areaName){
                            item.areaName = countryNameInEN[n]
                        }
                    }
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.map((item, index) => {
                            yAxisData.push(item.areaName);
                            seriesData.push(item.value);
                        })
                        let total = yAxisData.length;
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        tempMapData.total = total;
                        this.userDistribution = tempMapData;
                    });
                }) 
            }
            return datas;
        } catch (e) {
            throw e;
        }
    }
}

const overviewStore = new OverviewStore();

export default overviewStore;