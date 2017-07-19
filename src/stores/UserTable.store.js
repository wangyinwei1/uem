import { observable, action, runInAction, autorun, computed } from 'mobx';
import Service from '../services/UserTable.service';
import {
    getTimeType,
    getColOptions
} from '../utils/storage';

class UserTableStore {
    @observable loading = false;
    @observable data = [];
    @observable total = 0;
    @observable pageIndex = 1;
    @observable searchKey = 'display_name';
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('UserTable');
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
        localStorage.setItem('UEM_colOptions_UserTable', JSON.stringify(this.colOptions));
    }
    @action onGetOpersList = async () => {
        this.timeType = getTimeType();
        this.onLoading();
        try {
            const data = await Service.getUserList({
                pageIndex: this.pageIndex,
                userType: this.tagType === 0 ? 1 : 0,
                startTime: moment().subtract(this.timeType.startTime.type, this.timeType.startTime.units).valueOf(),
                endTime: moment().subtract(this.timeType.endTime.type, this.timeType.endTime.units).valueOf(),
                searchKey: this.searchKey,
                searchInfo: this.searchValue,
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

const userTableStore = new UserTableStore();

export default userTableStore;