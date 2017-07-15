import { observable, runInAction, action, computed } from 'mobx';
import Service from '../services/Setting.service';

class SettingStore {
  @observable appInfo = {};
  @action getAppInfo = async () => {
    try {
      const data = await Service.getAppInfo();
      runInAction(() => {
        this.appInfo = data;
        console.log(data)
        return data;
      })
    } catch (error) {
      
    }
  }
}

const settingStore = new SettingStore();

export default settingStore;
