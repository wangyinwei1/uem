import { observable, action, runInAction, autorun, computed } from 'mobx';
import Service from '../services/ErrorTable.service';
import {
    getTimeType,
    getColOptions
} from '../utils/storage';

class ErrorTableStore {
    @observable loading = false;
    @observable data = [];
    @observable total = 0;
    @observable pageIndex = 1;
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('ErrorTable');
    @observable rows = [];
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
    @action onChangeRows = payload => {
        this.rows = payload.rows;
    }
    @action onChangeTagType = payload => {
        this.tagType = payload.tagType;
        this.data = [];
        this.searchValue = undefined;
        this.onGetOpersList();
    }
    @action onChangeColOptions = payload => {
        this.colOptions[this.tagType] = payload.colOptions;
    }
    @action onResolveRow = async () => {
        try {
            const data = await Service.resolveRow({
                summaryId: JSON.stringify(this.rows.toJS())
            });
            runInAction(() => {
                this.onGetOpersList();
                return data;
            });
        } catch (e) {

        }
    }
    @action onGetOpersList = async () => {
        this.timeType = getTimeType();
        this.rows = [];
        this.onLoading();
        try {
            const data = await Service.getErrorsList({
                pageIndex: this.pageIndex,
                status: this.tagType,
                startTime: moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                searchInfo: this.searchValue
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
        } catch (e) {
            throw e;
        }
    }
}

const errorTableStore = new ErrorTableStore();

export default errorTableStore;