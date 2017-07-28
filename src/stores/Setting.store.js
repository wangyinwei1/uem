import { observable, runInAction, action, computed, toJS } from 'mobx';
import Service from '../services/Setting.service';

class SettingStore {
  @observable appInfo = {};
  @observable config = {};
  @observable userDataModelList = [];
  @observable versionSettings = [];

  // 部署说明
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

  // 参数设置
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

  // 用户数据模型
  @action getUserDataModelList = async () => {
    try {
      const result = await Service.getUserDataModelList();
      runInAction(() => {
        this.userDataModelList = result.data;
      })
    } catch (error) {
      throw error;
    }
  }

  @action deleteUserDataModel = async (payload) => {
    try {
      const result = await Service.deleteUserDataModel(payload);
      this.getUserDataModelList();
      return result;
    } catch (error) {
      throw error.responseJSON;
    }
  }

  @action saveUserDataModel = async (payload) => {
    try {
      const result = await Service.saveUserDataModel(payload);
      this.getUserDataModelList();
      return result;
    } catch (error) {
      throw error.responseJSON;
    }
  }

  // 版本控制
  @action getVersionSettings = async () => {
    try {
      const data = await Service.getVersionSettings();
      runInAction(() => {
        this.versionSettings = data;
      });
    } catch (error) {
      throw error.responseJSON;
    }
  }

  @action updateVersionStatus = async payload => {
    try {
      this.updateVersionSatusOnStore(payload)
      const result = await Service.updateVersionStatus(payload);
      // runInAction(() => {
      //   this.updateVersionSatusOnStore(payload)
      // })
      return result;
    } catch (error) {
      throw error.responseJSON;
    }
  }

  @action updateVersionSatusOnStore = ({ version, status }) => {
    const tempVersionSettings = toJS(this.versionSettings);
    for (let i = 0, len = tempVersionSettings.length; i < len; i++) {
      if (tempVersionSettings[i].version === version) {
        tempVersionSettings[i].status = status;
        break;
      }
    }
    this.versionSettings = tempVersionSettings;
  }



}




const settingStore = new SettingStore();

export default settingStore;
