import { observable, action, runInAction,autorun } from 'mobx';
// import { default as PerformacneOverviewService  } from '../services/PerformanceOverview.service';
import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType
} from '../utils/storage';
import { countryNameInCN, countryNameInEN } from '../components/Common/Chart/WorldCountryName';
import { NameMap } from "../components/Common/Chart/CityName";

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
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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
        const { metrics , areaType, province } = payload;
        try {
            const datas = await CommonService.getMapData({
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                pageSize: areaType == 'province' ? 100 : 300,
                sortKey: JSON.parse(metrics)[0],
                ...payload
            });
            if( areaType == 'province'){
                datas.data && datas.data.map((item,index)=>{
                    if(item.area == '-' || item.area == ""){
                        item.area = '未知地址'
                    }
                }).sort((a,b)=> b.value - a.value);
                // 将 “杭州” 变成 “杭州市”
                province !== undefined && datas.data.map((item, index) => {
                    for(let n in NameMap[province]) {
                        if (n == item.area){
                            item.area = NameMap[province][n]
                        }
                    }
                });
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
                        datas.data.length > 0 && datas.data.map((item, index) => {
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
                // datas.data && datas.data.map((item,index)=>{
                //     if(item.area == '-' || item.area == ""){
                //         item.area = '未知地址'
                //     }
                // })
                datas.data && datas.data.map((item,index) => {
                    if(item.area == '-' || item.area == ""){
                        item.area = '未知地址'
                    }
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
                        datas.data.length > 0 && datas.data.map((item, index) => {
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