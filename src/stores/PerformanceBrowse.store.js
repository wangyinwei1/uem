import { observable, action, runInAction, autorun, computed } from 'mobx';
import Service from '../services/PerformanceBrowse.service';
import {
    getTimeType,
    getColOptions
} from '../utils';

class PerformanceBrowseStore {
    @observable loading = false;
    @observable data = [];
    @observable total = 0;
    @observable type = JSON.stringify([0, 1, 2, 3, 4, 5, 6]);
    @observable pageIndex = 1;
    @observable operType = 'redirect';
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('PerformanceBrowse');
    timeType = getTimeType();

    constructor() {
        autorun(() => {
            // console.log(this.colOptions[0].toJS());
            // console.log(this.colOptions[1].toJS());
        });
    }

    get dataList() {
        return this.data.toJS();
    }

    get columns() {
        // console.log(this.colOptions[this.tagType].toJS());
        return this.colOptions[this.tagType].toJS();
    }

    // @action onChangeType = payload => {
    //     this.type = payload.type;
    //     this.onGetOpersList();
    // }
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
    @action onChangeTagType = payload => {
        this.tagType = payload.tagType;
        this.data = [];
        this.searchValue = undefined;
        this.onGetOpersList();
    }
    @action onChangeColOptions = payload => {
        this.colOptions[this.tagType] = payload.colOptions;
        localStorage.setItem('UEM_colOptions_PerformanceBrowse', JSON.stringify(this.colOptions));
    }
    @action onGetOpersList = async () => {
        this.timeType = getTimeType();
        this.onLoading();
        try {
            const data = await Service.getOpersList({
                type: this.type,
                pageIndex: this.pageIndex,
                operType: this.operType,
                tagType: this.tagType === 0 ? 'marked' : 'unmarked',
                startTime: moment().subtract(this.timeType.type, this.timeType.units).valueOf(),
                operName: this.searchValue
            });
            runInAction(() => {
                this.data = data.data.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.total = data.total;
                setTimeout(() => {
                    this.onLoaded()
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