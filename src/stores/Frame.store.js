import { observable, action } from 'mobx';
import {
    getTimeType,
    getTheme,
} from '../utils/storage';

class FrameStore {

    @observable apdex = sessionStorage.getItem('UEM_apdex');
    @observable appId = sessionStorage.getItem('UEM_appId');
    @observable platform = sessionStorage.getItem('UEM_platform') || 'pc';
    @observable appVersion = sessionStorage.getItem('UEM_appVersion') || '' ;
    @observable lang = localStorage.getItem('UEM_lang');
    @observable theme = getTheme();
    @observable timeType = getTimeType();
    // @observable versions = [];

    constructor() {
    }

    @action onChooseApp = payload => {
        this.appId = payload.appId;
        sessionStorage.setItem('UEM_appId', payload.appId);
    }
    @action onChoosePlatform = payload => {
        this.platform = payload.platform;
        sessionStorage.setItem('UEM_platform', payload.platform);
    }
    @action onChooseTimeType = payload => {
        // this.timeType = payload.timeType;
        const timeType = this.timeType;
        timeType.startTime = payload.timeType.startTime;
        timeType.endTime = payload.timeType.endTime;
        this.timeType = timeType;
        sessionStorage.setItem('UEM_timeType', JSON.stringify(timeType));
    }
    @action onChooseVersion = payload => {
        this.appVersion = payload.version;
        sessionStorage.setItem('UEM_appVersion', payload.version);
    }
}

const frameStore = new FrameStore();

export default frameStore;
// export { FrameStore };
