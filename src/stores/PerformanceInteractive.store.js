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
    @observable type = JSON.stringify([0, 1, 2, 3, 4, 5, 6]);
    @observable pageIndex = 1;
    @observable operType = 'xhr,form,link';
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('PerformanceInteractive');
    timeType = getTimeType();

    get dataList() {
        return this.data.toJS();
    }

    get columns() {
        return this.colOptions[this.tagType].toJS();
    }

    @action onLoading = () => {
        this.loading = true;
    }
    @action onLoaded = () => {
        this.loading = false;
    }
    @action onSearch = payload => {
        this.searchValue = payload.searchValue;
        this.onGetOpersList();
    }
    @action onChangeResTime = payload => {
        this.avgRspTime = payload.resTime;
        this.onGetOpersList();
    }
    @action onChangeTagType = payload => {
        this.tagType = payload.tagType;
        this.data = [];
        this.searchValue = undefined;
        this.onGetOpersList();
    }
    @action onChangeColOptions = payload => {
        this.colOptions[this.tagType] = payload.colOptions;
        localStorage.setItem('UEM_colOptions_PerformanceInteractive', JSON.stringify(this.colOptions));
    }
    @action onGetOpersList = async () => {
        this.timeType = getTimeType();
        this.onLoading();
        try {
            const data = await Service.getOpersList({
                performanceType: 'interaction',
                type: this.type,
                pageIndex: this.pageIndex,
                operType: this.operType,
                tagType: this.tagType === 0 ? 'marked' : 'unmarked',
                startTime: moment().subtract(this.timeType.startTime.type, this.timeType.startTime.units).valueOf(),
                endTime: moment().subtract(this.timeType.endTime.type, this.timeType.endTime.units).valueOf(),
                operName: this.searchValue,
                avgRspTime: this.avgRspTime
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

const performanceInteractiveStore = new PerformanceInteractiveStore();

export default performanceInteractiveStore;