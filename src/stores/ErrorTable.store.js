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
    @observable dataStatus = false;
    @observable pageIndex = 1;
    @observable pageSize = 10;
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('ErrorTable');
    @observable rows = [];
    @observable errorType = [];
    @observable sortKey = 'errorCount';
    @observable order = 'descend';
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
    @action onChangePage = payload => {
        this.pageIndex = payload.page;
        this.pageSize = payload.pageSize;
        this.onGetOpersList();
    }
    // 点击表格的排序
    @action onChangeSortkey = payload => {
        this.sortKey = payload.columnKey;
        this.order = payload.order;
        this.onGetOpersList();
    }

    @action onChangeRows = payload => {
        this.rows = payload.rows;
        this.errorType = payload.errorType;
    }
    @action onChangeTagType = payload => {
        this.tagType = payload.tagType;
        this.data = [];
        this.searchValue = undefined;
        if(payload.pageIndex){
            this.pageIndex = payload.pageIndex;
            this.onGetOpersList();
        }
    }
    @action onChangeColOptions = payload => {
        this.colOptions[this.tagType] = payload.colOptions;
    }
    @action onResolveRow = async () => {
        try {
            const data = await Service.resolveRow({
                summaryId: JSON.stringify(this.rows.toJS()),
                errorType: JSON.stringify(this.errorType.toJS()),
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
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                searchInfo: this.searchValue,
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
                this.dataStatus  = data.status;
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