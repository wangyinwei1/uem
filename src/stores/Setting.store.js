import { observable, runInAction, action, computed } from 'mobx';
import Service from '../services/Setting.service';

class SettingStore {}

const settingStore = new SettingStore();

export default settingStore;
