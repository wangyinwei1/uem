import { observable, action } from 'mobx';

function getTimeType() {
    try {
        return JSON.parse(sessionStorage.getItem('UEM_timeType'));
    } catch (e) {
        return {
            type: 1,
            units: 'hours'
        };
    }
}

class FrameStore {
    
    @observable appId = sessionStorage.getItem('UEM_appId');
    @observable platform = sessionStorage.getItem('UEM_platform');
    @observable lang = localStorage.getItem('UEM_lang');
    @observable theme = localStorage.getItem('UEM_theme');
    @observable timeType = getTimeType();

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
        this.timeType = payload.timeType;
        console.log(payload.timeType)
        sessionStorage.setItem('UEM_timeType', JSON.stringify(payload.timeType));
    }
}

const frameStore = new FrameStore();

export default frameStore;
// export { FrameStore };
