import { observable, runInAction, action, computed, toJS } from 'mobx';
import Service from '../services/Setting.service';

class SettingStore {
  @observable appInfo = {};
  @observable config = {};

  @action getAppInfo = async () => {
    try {
      const data = await Service.getAppInfo();
      runInAction(() => {
        this.appInfo = data;
      });
    } catch (error) {
      throw error;
    }
  }
  @action updateAppInfo = async (appInfo) => {
    try {
      return await Service.updateAppInfo(appInfo);
    } catch (error) {
      throw error;
    }
  }

  @action updateAppInfoOnFront = (appInfo) => {
    this.appInfo = appInfo;
  }
  @action sendEmail = async (emailObj) => {
    try {
      return await Service.sendEmail(emailObj);
    } catch (error) {
      throw error;
    }
  }

  @action getConfig = async () => {
    try {
      const data = await Service.getConfig();
      runInAction(() => {
        this.config = data;
      });
    } catch (error) {
      throw error;
    }
  }

  @action updateConfig = async (payload) => {
    try {
      const { slowLoadThreshold } = this.config;
      const result = await Service.updateConfig({
        ...payload,
        slowLoadThreshold,
      })
      this.getConfig();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

const settingStore = new SettingStore();

export default settingStore;
