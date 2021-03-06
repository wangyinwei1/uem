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
    @observable dataStatus = false;
    @observable pageIndex = 1;
    @observable pageSize = 10;
    @observable searchKey = 'display_name';
    @observable searchValue = undefined;
    @observable tagType = 0;
    @observable colOptions = getColOptions('UserTable');
    @observable sortKey = 'lastTime';
    @observable order = 'descend';
    @observable userDefinedColumn = [];
    timeType = getTimeType();

    get dataList() {
        return this.data.toJS();
    }

    get columns() {
        return this.colOptions[this.tagType].toJS();
    }
    // 改变用户轨迹搜索框边上的切换searchKey
    @action onChangeSearchKey = payload => {
        this.searchKey = payload
    }

    @action onGetUserDefineColumn = async payload => {
        try{
            const data = await Service.getUserDefineColumn();
            runInAction(() => {
                this.userDefinedColumn = data;
                return data;
            });
        }catch(e){
            throw(e)
        }
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
        this.data = [];
        this.searchValue = undefined;
        if(payload.pageIndex){
            this.pageIndex = payload.pageIndex;
            this.onGetOpersList();
        }
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
                startTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().startTime.type/86400000) == getTimeType().startTime.type/86400000 ? moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(): moment().subtract(getTimeType().startTime.type, getTimeType().startTime.units).valueOf(),
                endTime: getTimeType().startTime.units == 'milliseconds' && Math.floor(getTimeType().endTime.type/86400000) == getTimeType().endTime.type/86400000 ?  moment(moment().format('YYYY-MM-DD')).subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf() + 86400000 : moment().subtract(getTimeType().endTime.type, getTimeType().endTime.units).valueOf(),
                searchKey: this.searchKey,
                searchInfo: this.searchValue,
                // 点击sortkey排序
                sortKey: this.sortKey,
                sort: this.order == 'descend' ? 'desc' : 'asc'
            });
            runInAction(() => {
                this.data = data.data.map((item, index) => {
                    item.key = index;
                    return Immutable.fromJS(item).merge(item.userDefined).toJS();
                });
                // console.log('this.data',this.data.toJS());
                this.total = data.total;
                this.dataStatus = data.status;
                setTimeout(() => {
                    this.onLoaded();
                }, 300);
                return data;
            });
            this.onGetUserDefineColumn();
        } catch (error) {
            throw error;
        }
    }
}

const userTableStore = new UserTableStore();

export default userTableStore;