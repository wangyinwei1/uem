import { observable, action, runInAction } from 'mobx';
import Service from '../services/PerformanceBrowse.service';

class PerformanceBrowseStore {
    @observable dataList = [];
    @observable type = JSON.stringify([0, 1, 2, 3, 4, 5, 6]);
    @observable pageIndex = 1;
    @observable operType = 'redirect';
    @observable tagType = 'marked';
    @observable col = []; 

    constructor() {
    }

    @action onChangeType = payload => {
        this.type = payload.type;
    }
    @action onChangeTagType = payload => {
        this.tagType = payload.tagType;
    }
    @action onChangeCol = payload => {
        console.log(payload.col)
        this.col = payload.col;
    }
    @action onGetOpersList = async payload => {
        try {
            const data = await Service.getOpersList(payload);
            runInAction(() => {
                this.dataList = data.data.map((item, index) => {
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