import { observable, action, runInAction, autorun } from 'mobx';
import Service from '../services/AppList.service';

class AppListStore {
    @observable appList = [];
    @observable total = 0;
    @observable loading = false;
    @observable pageSize = 9;
    @observable pageIndex = 1;
    @observable sortKey = 'createTime';

    constructor() {
    }
    
    @action onLoading = () => {
        this.loading = true;
    }
    @action onLoaded = () => {
        this.loading = false;
    }
    @action pageJump = payload => {
        this.pageIndex = payload;
        this.getApps();
    }
    @action sortBy = payload => {
        this.sortKey = payload;
        this.getApps();
    }
    @action getApps = async () => {
        this.onLoading();
        try {
            const data = await Service.getApps({
                sortKey: this.sortKey,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            });
            runInAction(() => {
                this.appList = data.data;
                this.total = data.total;
                setTimeout(() => {
                    this.onLoaded()
                }, 300);
                return data;
            });
        } catch (error) {
            this.onLoaded();
            throw error;
        }
    }
    @action updateApp = async payload => {
        try {
            const data = await Service.updateApp(payload);
            this.getApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action delApp = async payload => {
        try {
            const data = await Service.delApp(payload);
            this.getApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action addApp = async payload => {
        try {
            const data = await Service.addApp(payload);
            this.getApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
}

const appListStore = new AppListStore();

export default appListStore;
// export { AppStore };
