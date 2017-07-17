import { observable, action, runInAction,autorun } from 'mobx';
import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType
} from '../utils/storage';
import { countryNameInCN, countryNameInEN } from '../components/Common/Chart/WorldCountryName';


class UserOverviewStore {
    @observable keyIndicator = {};
    @observable userTrend = {};
    @observable mapData = {
        yAxis: [],
        series: []
    };
    timeType = getTimeType(); 

    @action onGetKeyIndicator = async payload => {
        try {
            const data = await CommonService.getKeyIndicator({
                startTime: moment().subtract(this.timeType.type, this.timeType.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.keyIndicator = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

     @action onGetUserTrend = async payload => {
        try {
            const data = await CommonService.getTrend(payload);
            runInAction(() => {
                this.userTrend = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    @action onGetMapData = async payload => {
        const { metrics , areaType } = payload;
        try {
            const datas = await CommonService.getMapData({
                startTime: moment().subtract(this.timeType.type, this.timeType.units).valueOf(),
                ...payload
            });
            if( areaType == 'province'){
                datas.data && datas.data.map((item,index)=>{
                    if(item.area == '-'){
                        item.area = '未知地址'
                    }
                })
                if( metrics == '["sessionCount"]' ){
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data && datas.data.map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.sessionCount);
                        })
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        this.mapData = tempMapData;
                    });
                } else {
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data && datas.data.map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.uv);
                        })
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        this.mapData = tempMapData;
                    });
                }
            }else{
                datas.data && datas.data.map((item,index) => {
                    for(let n in countryNameInEN){
                        if(n == item.area){
                            item.area = countryNameInEN[n]
                        }
                    }
                })
                if( metrics == '["sessionCount"]' ){
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data && datas.data.map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.sessionCount);
                        })
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        this.mapData = tempMapData;
                    });
                } else {
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data && datas.data.map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.uv);
                        })
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        this.mapData = tempMapData;
                    });
                }
            }
            return datas;
        } catch (e) {
            throw e;
        }
    }
}

const userOverviewStore = new UserOverviewStore();

export default userOverviewStore;