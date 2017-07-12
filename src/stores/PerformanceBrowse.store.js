import { observable, action, runInAction, autorun } from 'mobx';
import Service from '../services/PerformanceBrowse.service';
import {
    getTimeType
} from '../utils';

class PerformanceBrowseStore {
    @observable data = [];
    @observable type = JSON.stringify([0, 1, 2, 3, 4, 5, 6]);
    @observable pageIndex = 1;
    @observable operType = 'redirect';
    @observable tagType = 0;
    @observable colOptions = [[],[]];
    timeType = getTimeType();

    constructor() {
        autorun(() => {
            console.log('[tagType]', this.tagType);
            // console.log('[colOptions]', this.colOptions.toJS());
        });
    }

    get dataList() {
        return this.data.toJS();
    }

    // @action onChangeType = payload => {
    //     this.type = payload.type;
    //     this.onGetOpersList();
    // }
    @action onChangeTagType = payload => {
        this.tagType = payload.tagType;
        this.onGetOpersList();
    }
    // @action onChangeColOptions = payload => {
    //     this.colOptions = payload.colOptions;
    // }
    @action onGetOpersList = async () => {
        try {
            const data = await Service.getOpersList({
                type: this.type,
                pageIndex: this.pageIndex,
                operType: this.operType,
                tagType: this.tagType === '0' ? 'marked' : 'unmarked',
                startTime: moment().subtract(this.timeType.type, this.timeType.units).valueOf()
            });
            runInAction(() => {
                this.data = data.data.map((item, index) => {
                    item.key = index;
                    return item;
                });
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
}

const performanceBrowseStore = new PerformanceBrowseStore();

export default performanceBrowseStore;