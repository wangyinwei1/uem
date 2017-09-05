import { observable, action, runInAction,autorun } from 'mobx';
import { default as CommonService  } from '../services/CommonInterface.service';
import {
    getTimeType,
    getTheme,
    getVersion
} from '../utils/storage';

class FrameStore {
    @observable apdex = sessionStorage.getItem('UEM_apdex');
    @observable appId = sessionStorage.getItem('UEM_appId');
    @observable platform = sessionStorage.getItem('UEM_platform') || 'pc';
    @observable appVersion = getVersion();
    @observable lang = localStorage.getItem('UEM_lang');
    @observable theme = getTheme();
    @observable timeType = getTimeType();
    @observable theme = 'blue';
    @observable appAllVersions = [];

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
        this.appVersion =  payload.version;
        sessionStorage.setItem('UEM_appVersion', this.appVersion);
    }
    @action onChangeTheme = payload => {
        this.theme = payload;
    }
    @action onGetAppVersion = async payload => {
        try{
            const data = await CommonService.getAppVersion({
                ...payload
            });
            runInAction(() => {
                this.appAllVersions = data;
            });
            return data;
        }catch(e){
            throw e;
        }
    }
}

const frameStore = new FrameStore();

export default frameStore;
// export { FrameStore };
