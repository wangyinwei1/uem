import { observable, action, runInAction, autorun } from 'mobx';
import Service from '../services/AppList.service';
import { Message } from 'antd';

class AppListStore {
    @observable appList = [];
    @observable appListMenu = [];
    @observable total = 0;
    @observable loading = false;
    @observable pageSize = 9;
    @observable pageIndex = 1;
    @observable sortKey = 'createTime';
    @observable provinceList = [];
    // 组装后的放在表格中数据
    @observable ipCityList = [];
    // 带城市邮编的原始数据
    @observable citys = [];
    @observable status = 1;
    constructor() {
        
    }

    @action onLoading = () => {
        this.loading = true;
    }
    @action onLoaded = () => {
        this.loading = false;
    }
    @action onInitPaginationIndex = () => {
        this.pageIndex = 1;
    }
    @action onPageJump = payload => {
        this.pageIndex = payload.index;
        this.onGetApps();
    }
    @action onSortBy = payload => {
        this.sortKey = payload.key;
        // 重置为第一页
        this.pageIndex = 1;
        this.onGetApps();
    }
    @action onGetApps = async (payload, type) => {
        if (type === 'appListMenu') {
            try {
                const data = await Service.getApps({
                    sortKey: this.sortKey,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                    ...payload
                });
                runInAction(() => {
                    this.appListMenu = data.data;
                    return data;
                });
            } catch (error) {
                throw error;
            }
        } else {
            this.onLoading();
            try {
                const data = await Service.getApps({
                    sortKey: this.sortKey,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                });
                runInAction(() => {
                    this.appList = data.data;
                    this.total = data.total;
                    setTimeout(() => {
                        this.onLoaded()
                    }, 300);
                    return data;
                });
            } catch (error) {
                this.onLoaded();
                throw error;
            }
        }
    }

    @action onAddIp =  payload => {
        this.ipCityList = payload.tableData;
    }

    @action onUpdateApp = async payload => {
        try {
            const data = await Service.updateApp(payload);
            this.onGetApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onDelApp = async payload => {
        try {
            this.appListMenu = this.appListMenu.filter(item => item.appId !== payload.appId)
            const data = await Service.delApp(payload);
            this.onGetApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    @action onAddApp = async payload => {
        try {
            
            const data = await Service.addApp(payload);
            this.appListMenu = [
                {
                    ...payload,
                    ...data
                },
                ...this.appListMenu
            ];
            this.onGetApps();
            return data;
        } catch (error) {
            throw error;
        }
    }
    // 获取省份和邮编
    @action onGetProvinceList = async payload => {
        try{
            const data = await Service.getProvinceList(payload);
            runInAction(() => {
                this.provinceList = data;
            })
        }catch(e){
            throw(e)
        }
    }
    // 获取城市的ip信息
    @action onGetIpCityList = async payload =>{
        try {
            const data = await Service.getIpCityList(payload);
            const ipCityList = [];
            runInAction(()=>{
                data.map( (item,index) => {
                    if(!item.ips.length){
                        ipCityList.push({
                            key: index + Math.random(),
                            area: item.areaName,
                            startIp: '',
                            endIp: '',
                            show: true
                        })
                    }else{
                        item.ips.length && item.ips.map( (nextItem, j) => {
                            ipCityList.push({
                                key: index + Math.random(),
                                area: item.areaName,
                                startIp : nextItem.startIp,
                                endIp: nextItem.endIp,
                                show: j == 0 ? true : false
                            })
                        })
                    }
                } )
                this.ipCityList = ipCityList;
                this.citys = data;
            })
        }catch(e){
            throw(e);
        }
    }
    // @action onStartApp = async payload => {
    //     try{
    //         const data = await Service.startOrStopApp(payload);
    //         this.onGetApps();
    //         return data;
    //     } catch(e){
    //         console.log(e)
    //     }
    // }
    @action onGetMappingStatus = async payload => {
        try{
            const data = await Service.getMappingStatus(payload); 
            runInAction(()=>{
                this.status = result.isEnabled === 'true' ? 1 : 0
            })
        }catch(e){
            throw e;
        }   
    }

    @action onUpdateMappingStatus = async payload => {
        try{    
            const data = await Service.updateMappingStatus(payload);
            runInAction(()=>{
                if(data.message !== 'successful'){
                    Message.info('请先创建应用！')
                    this.status = 0;
                }else{
                    this.status = payload.status;
                    if (payload.status === 1 ) {
                        Message.info('请选择地域进行IP地址库设置');
                    }
                }
            })
            
        }catch(e){
            throw e
        }
    }

    @action onUpdateIpMap = async payload => {
        try{
            const data = await Service.updateIpMap(payload);
            if(data.message == 'successful'){
                Message.info('保存成功')
            }
        }catch(e){
            throw e;
            Message.info('保存失败')
        }
    }
}

const appListStore = new AppListStore();

export default appListStore;