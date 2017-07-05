import { observable, action } from 'mobx';

class FrameStore {
    @observable appId = sessionStorage.getItem('UEM_appId');;
    @observable platform = sessionStorage.getItem('UEM_platform');
    @observable lang = localStorage.getItem('UEM_lang');
    @observable theme = localStorage.getItem('UEM_theme');

    constructor() {
    }
    
    @action chooseApp = payload => {
        this.appId = payload.appId;
        sessionStorage.setItem('UEM_appId', payload.appId);
    }
    @action choosePlatform = payload => {
        this.platform = payload.platform;
        sessionStorage.setItem('UEM_platform', payload.platform);
    }
}

const frameStore = new FrameStore();

export default frameStore;
// export { AppStore };
