import { observable, action, runInAction, autorun, computed } from 'mobx';
import Service from '../services/PerformanceTable.service';
import {
    getTimeType,
    getColOptions
} from '../utils/storage';

class PerformanceInteractiveStore {
    @observable loading = false;
    @observable avgRspTime = undefined;
    @observable data = [];
    @observable total = 0;
    @observable dataStatus = false;
    @observable type = JSON.stringify([0, 1, 2, 3, 4, 5, 6]);
    @observable pageIndex = 1;
    @observable pageSize = 10;
    // @observable platform = sessionStorage.getItem('UEM_platform');
    @observable operType = {
        "pc":'xhr,form,link',
        "ios": "click,longClick,slide,other",
        "android": "click,longClick,slide,other"
    }
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('PerformanceInteractive');
    @observable colOptionsMobile =  getColOptions('PerformanceInteractiveMobile');
    @observable sortKey = 'clickNum';
    @observable order = 'descend';
//    constructor(){
//     autorun(() => 
//     )
//    }

    get dataList() {
        return this.data.toJS();
    }

    get columns() {
        return sessionStorage.getItem('UEM_platform') == 'pc' ? this.colOptions[this.tagType].toJS() :  this.colOptionsMobile[this.tagType].toJS();
    }

    @action onLoading = () => {
        this.loading = true;
    }
    @action onLoaded = () => {
        this.loading = false;
        //给tagtype初始值
        sessionStorage.setItem('tagType',this.tagType);
    }
    @action onSearch = payload => {
        this.searchValue = payload.searchValue;
        this.onGetOpersList();
    }
    @action onChangePage = payload => {
        this.pageIndex = payload.page;
        this.pageSize = payload.pageSize;
        this.onGetOpersList();
    }
    @action onChangeResTime = payload => {
        this.avgRspTime = payload.resTime;
        this.onGetOpersList();
    }
    @action onChangeTagType = payload => {
        this.tagType = payload.tagType;
        sessionStorage.setItem('tagType',payload.tagType);
        this.data = [];
        this.searchValue = undefined;
        if(payload.pageIndex){
            this.pageIndex = payload.pageIndex;
            this.onGetOpersList();
        }

    }
    // 点击sortkey排序
    @action onChangeSortkey = payload => {
        this.sortKey = payload.columnKey;
        this.order = payload.order;
        this.onGetOpersList();
    }
    @action onChangeColOptions = payload => {
        if(sessionStorage.getItem('UEM_platform') == 'pc' ){
            this.colOptions[this.tagType] = payload.colOptions;
            localStorage.setItem('UEM_colOptions_PerformanceInteractive', JSON.stringify(this.colOptions));
        }else{
            this.colOptionsMobile[this.tagType] = payload.colOptions;
            localStorage.setItem('UEM_colOptions_PerformanceInteractiveMobile', JSON.stringify(this.colOptionsMobile));
        }
        }
       
    @action onGetOpersList = async () => {
        this.timeType = getTimeType();
        this.onLoading();
        const platform = sessionStorage.getItem('UEM_platform');
        try {
            const data = await Service.getOpersList({
                performanceType: 'interaction',
                type: this.type,
                pageIndex: this.pageIndex,
                operType: this.operType[platform],
                tagType: this.tagType === 0 ? 'marked' : 'unmarked',
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf() : moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                operName: this.searchValue,
                avgRspTime: this.avgRspTime,
                // 点击sortkey排序
                sortKey: this.sortKey,
                sort: this.order == 'descend' ? 'desc' : 'asc'
            });
            runInAction(() => {
                this.data = data.data.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.total = data.total;
                this.dataStatus = data.status;
                setTimeout(() => {
                    this.onLoaded();
                }, 300);
                return data;
            });
        } catch (error) {
            throw error;
        }
    }
}

const performanceInteractiveStore = new PerformanceInteractiveStore();

export default performanceInteractiveStore;