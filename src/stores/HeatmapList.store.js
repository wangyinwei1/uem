import { observable, runInAction, action, computed } from 'mobx';
import Service from '../services/HeatmapList.service';

class HeatmapList {
    @observable list = [];
    @observable version = '';
    @observable pageIndex = 1;

    get dataList() {
        return this.list.toJS();
    }

    @action onGetHeatmapList = async () => {
        try {
            const data = await Service.getHeatmapList({
                version: this.version,
                pageIndex: this.pageIndex,
            });
            runInAction(() => {
                this.list = data.data;
            });
            return data;
        } catch (e) {
            throw e;
        }
    }
}

const heatmapListStore = new HeatmapList();

export default heatmapListStore;
