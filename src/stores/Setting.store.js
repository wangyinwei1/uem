import { observable, runInAction, action, computed } from 'mobx';
import Service from '../services/Setting.service';

class SettingStore {
  @observable appInfo = {};
  @action getAppInfo = async () => {
    try {
      const data = await Service.getAppInfo();
      runInAction(() => {
        this.appInfo = data;
      });
    } catch (error) {
      throw erro;
    }
  }
  @action updateAppInfo = async (appInfo) => {
    try {
      const result = await Service.updateAppInfo(appInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @action updateAppInfoOnFront = (appInfo) => {
    this.appInfo = appInfo;
  }
  @action sendEmail = async (emailObj) => {
    try {
      const result = await Service.sendEmail(emailObj);
      return result;
    } catch (error) {
      throw error;
    }
  }
} 

const settingStore = new SettingStore();

export default settingStore;
