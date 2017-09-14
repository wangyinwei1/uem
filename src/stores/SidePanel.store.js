import { observable, runInAction, action, computed, autorun } from 'mobx';

class SidePanelStore {
    id = 0;
    @observable panelList = [];

    @action onChangePanelList = payload => {
        // debugger
        const panelList = this.panelList.toJS();
        payload.panelItem.sidePanelId = this.id ++;
        if (panelList.length === 2) {
            if (panelList[1] !== payload.panelItem) {
                panelList.push(payload.panelItem);
            }
        } else {
            panelList.push(payload.panelItem);
        }
        if (panelList.length >= 3) {
            panelList.shift();
        }
        this.panelList = panelList;
    }
}

const sidePanelStore = new SidePanelStore();

export default sidePanelStore;
