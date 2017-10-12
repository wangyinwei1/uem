import { observable, action, runInAction, autorun } from 'mobx';
import Service from '../services/AppList.service';

class AppListStore {
    @observable appList = [];
    @observable appListMenu = [];
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
    @action onPageJump = payload => {
        this.pageIndex = payload.index;
        this.onGetApps();
    }
    @action onSortBy = payload => {
        this.sortKey = payload;
        this.onGetApps();
    }
    @action onGetApps = async (payload, type) => {
        if (type === 'appListMenu') {
            try {
                const data = await Service.getApps({
                    sortKey: this.sortKey,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                    ...payload
                });
                runInAction(() => {
                    this.appListMenu = data.data;
                    return data;
                });
            } catch (error) {
                throw error;
            }
        } else {
            this.onLoading();
            try {
                const data = await Service.getApps({
                    sortKey: this.sortKey,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
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
    }
    @action onUpdateApp = async payload => {
        try {
            const data = await Service.updateApp(payload);
            this.onGetApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onDelApp = async payload => {
        try {
            this.appListMenu = this.appListMenu.filter(item => item.appId !== payload.appId)
            const data = await Service.delApp(payload);
            this.onGetApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onAddApp = async payload => {
        try {
            
            const data = await Service.addApp(payload);
            this.appListMenu = [
                {
                    ...payload,
                    ...data
                },
                ...this.appListMenu
            ];
            this.onGetApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    // @action onStartApp = async payload => {
    //     try{
    //         const data = await Service.startOrStopApp(payload);
    //         this.onGetApps();
    //         return data;
    //     } catch(e){
    //         console.log(e)
    //     }
    // }
}

const appListStore = new AppListStore();

export default appListStore;