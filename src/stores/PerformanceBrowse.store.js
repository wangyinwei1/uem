import { observable, action, runInAction, autorun, computed } from 'mobx';
import Service from '../services/PerformanceTable.service';
import {
    getTimeType,
    getColOptions
} from '../utils/storage';

class PerformanceBrowseStore {
    @observable loading = false;
    @observable avgRspTime = undefined;
    @observable data = [];
    @observable total = 0;
    @observable type = JSON.stringify([0, 1, 2, 3, 4, 5, 6]);
    @observable pageIndex = 1;
    @observable pageSize = 10;
    @observable operType = 'redirect';
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('PerformanceBrowse');
    @observable sortKey = 'pv';
    @observable order = 'descend';

    constructor() {
        autorun(() => {
            // console.log(this.currentRow)
        });
    }

    get dataList() {
        return this.data.toJS();
    }

    get columns() {
        return this.colOptions[this.tagType].toJS();
    }

    @action onLoading = () => {
        this.loading = true;
        //给tagtype初始值
        sessionStorage.setItem('tagType',this.tagType);
    }
    @action onLoaded = () => {
        this.loading = false;
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

    @action onChangeSortkey = payload => {
        this.sortKey = payload.columnKey;
        this.order = payload.order;
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
    @action onChangeColOptions = payload => {
        this.colOptions[this.tagType] = payload.colOptions;
        localStorage.setItem('UEM_colOptions_PerformanceBrowse', JSON.stringify(this.colOptions));
    }
    @action onGetOpersList = async () => {
        this.timeType = getTimeType();
        this.currentRow = [];
        this.onLoading();
        try {
            const data = await Service.getOpersList({
                performanceType: 'browse',
                type: this.type,
                pageIndex: this.pageIndex,
                operType: this.operType,
                tagType: this.tagType === 0 ? 'marked' : 'unmarked',
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
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

const performanceBrowseStore = new PerformanceBrowseStore();

export default performanceBrowseStore;