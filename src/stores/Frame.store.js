import { observable, action, runInAction, autorun } from 'mobx';
import { default as CommonService } from '../services/CommonInterface.service';
import { default as SettingService } from '../services/Setting.service';
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
    @observable theme = document.getElementsByTagName('html')[0].className;
    @observable appAllVersions = [];
    // {"addTime":1487646979330,"appName":"113kb","appId":"2222","url":"http://10.1.51.113:8080/kb/dashboard.action","status":1}
    // appInfo应该是当前app的info，当添加一个新应用之后，也要更新appInfo
    @observable appInfo = {};

    constructor() {
    }

    @action onChooseApp = payload => {
        sessionStorage.setItem('UEM_appId', payload.appId);
        this.onGetAppInfomation(payload);
    }
    // 取得app的url，存入localStorage中
    @action onGetAppInfomation = async payload => {
        const appId = typeof payload === 'undefined' ? this.appId : payload.appId;
        if (appId) {
            try {
                const data = await SettingService.getAppInfo({
                    appId: appId
                });
                runInAction(() => {
                    this.appId = appId;
                    this.appInfo = data || {};
                    localStorage.setItem('appUrl', data.url);
                })
            } catch (e) {
                throw e;
            }
        }
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
        sessionStorage.setItem('UEM_appVersion', this.appVersion);
    }
    @action onChangeTheme = payload => {
        this.theme = payload;
        console.log('this.theme',this.theme);
    }
    @action onGetAppVersion = async payload => {
        try {
            const data = await CommonService.getAppVersion({
                ...payload
            });
            runInAction(() => {
                this.appAllVersions = data;
            });
            return data;
        } catch (e) {
            throw e;
        }
    }
    // 添加或删除一个应用之后，要更新appInfo的值
    @action setAppInfo = (appInfo) => {
        if (!appInfo) {
            this.appInfo = {};
            this.appId = '';
            sessionStorage.removeItem('UEM_appId')
        } else {
            this.appInfo = appInfo;
        }
    }
}

const frameStore = new FrameStore();

export default frameStore;
// export { FrameStore };
