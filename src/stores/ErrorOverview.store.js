import { observable, action, runInAction,autorun } from 'mobx';
import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType
} from '../utils/storage';
import { countryNameInCN, countryNameInEN } from '../components/Common/Chart/WorldCountryName';


class ErrorOverviewStore {
    @observable keyIndicator = {};
    @observable errorTrend = {};
    @observable mapData = {
        yAxis: [],
        series: []
    };

    @action onGetKeyIndicator = async payload => {
        try {
            const data = await CommonService.getKeyIndicator({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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

     @action onGetErrorTrend = async payload => {
        try {
            const data = await CommonService.getTrend(payload);
            runInAction(() => {
                this.errorTrend = data;
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
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            if( areaType == 'province'){
                datas.data && datas.data.map((item,index)=>{
                    if(item.area == '-'){
                        item.area = '未知地址'
                    }
                });
                if( metrics == '["occurErrorUserRate"]' ){
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.filter(item => item.occurErrorUserRate > 0).sort((a,b)=> b.occurErrorUserRate - a.occurErrorUserRate).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.occurErrorUserRate);
                        })
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        this.mapData = tempMapData;
                    });
                } else {
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.filter(item => item.effectedUserNum > 0).sort((a,b)=> b.effectedUserNum - a.effectedUserNum).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.effectedUserNum);
                        })
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        this.mapData = tempMapData;
                    });
                }
            }else{
                datas.data && datas.data.map((item,index) => {
                    if(item.area == '-'){
                            item.area = '未知区域'
                    }else{
                        for(let n in countryNameInEN){
                            if(n == item.area){
                                item.area = countryNameInEN[n]
                            }
                        }
                    }
                }).sort((a,b)=> b.value - a.value);
                if( metrics == '["occurErrorUserRate"]' ){
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.filter(item => item.occurErrorUserRate > 0).sort((a,b)=> b.occurErrorUserRate - a.occurErrorUserRate).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.occurErrorUserRate);
                        })
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        this.mapData = tempMapData;
                    });
                } else {
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.filter(item => item.effectedUserNum > 0).sort((a,b)=> b.effectedUserNum - a.effectedUserNum).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.effectedUserNum);
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

const errorOverviewStore = new ErrorOverviewStore();

export default errorOverviewStore;