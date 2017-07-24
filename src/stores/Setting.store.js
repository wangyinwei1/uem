import { observable, runInAction, action, computed } from 'mobx';
import Service from '../services/Setting.service';

class SettingStore {
  @observable appInfo = {};
  @action getAppInfo = async () => {
    try {
      const data = await Service.getAppInfo();
      runInAction(() => {
        this.appInfo = data;
        return 'abc'
      });
    } catch (error) {
      throw erro;
    }
  }
  @action updateAppInfo = async (appInfo) => {
    try {
      const data = await Service.updateAppInfo(appInfo);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @action updateAppInfoOnFront = (appInfo) => {
    this.appInfo = appInfo;
  }
} 

const settingStore = new SettingStore();

export default settingStore;
