import { observable, action, runInAction,autorun } from 'mobx';
// import { default as PerformacneOverviewService  } from '../services/PerformanceOverview.service';
import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType
} from '../utils/storage';
import { countryNameInCN, countryNameInEN } from '../components/Common/Chart/WorldCountryName';

class PerformanceOverviewStore {
    @observable keyIndicator = {};
    @observable performanceTrend = {};
    @observable mapData = {
        yAxis: [],
        series: [],
        total: 1
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
    @action onGetPerformanceTrend = async payload => {
        try {
            const data = await CommonService.getTrend({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                ...payload
            });
            runInAction(() => {
                this.performanceTrend = data;
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
    // @action onGetPerformanceApdex = async payload => {
    //     try {
    //         const data = await PerformacneOverviewService.getTrend(payload);
    //         runInAction(() => {
    //             this.performanceApdex = data;
    //         });
    //         return data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    @action onGetMapData = async payload => {
        const { metrics , areaType } = payload;
        try {
            const datas = await CommonService.getMapData({
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                pageSize: areaType == 'province' ? 100 : 300,
                sortKey: JSON.parse(metrics)[0],
                ...payload
            });
            if( areaType == 'province'){
                datas.data && datas.data.map((item,index)=>{
                    if(item.area == '-'){
                        item.area = '未知地址'
                    }
                }).sort((a,b)=> b.value - a.value);
                if( metrics == '["avgRspTime"]' ){
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 &&  datas.data.filter(item => item.avgRspTime > 0).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.avgRspTime);
                        })
                        let total = yAxisData.length;
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        tempMapData.total = total;
                        this.mapData = tempMapData;
                    });
                } else {
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.filter(item => item.apdex > 0).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.apdex);
                        })
                        let total = yAxisData.length;
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        tempMapData.total = total;
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
                }).sort((a,b)=> b.value - a.value);
                if( metrics == '["avgRspTime"]' ){
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.filter(item => item.avgRspTime > 0).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.avgRspTime);
                        })
                        let total = yAxisData.length;
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        tempMapData.total = total;
                        this.mapData = tempMapData;
                    });
                } else {
                    runInAction(() => {
                        let yAxisData = [], seriesData = [],tempMapData = {};
                        datas.data.length > 0 && datas.data.filter(item => item.apdex > 0).map((item, index) => {
                            yAxisData.push(item.area);
                            seriesData.push(item.apdex);
                        })
                        let total = yAxisData.length;
                        tempMapData.yAxis = yAxisData;
                        tempMapData.series = seriesData;
                        tempMapData.total = total;
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

const performanceOverviewStore = new PerformanceOverviewStore();

export default performanceOverviewStore;