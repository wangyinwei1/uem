import Request from '../utils/request';
// import Mock from 'mockjs';

/**
 * Service 层主要是发起请求，以及对返回的数据进行初步处理
 */

export default {
    getApps: payload => Request('get', 'apps/info/view', {
        tenantId: window.USER_INFO.tenantId,
        pageIndex: 1,
        pageSize: 9,
        sortKey: 'createTime',
        ...payload
    }).then(res => {
        // 此处可以对数据进行初步处理
        // code here ...
        return res;
    }),
    addApp: payload => Request('post', 'app/add', {
        tenantId: window.USER_INFO.tenantId,
        appName: undefined,
        url: undefined,
        ...payload
    }),
    delApp: payload => Request('post', 'app/delete', {
        appId: sessionStorage.getItem('UEM_appId'),
        ...payload
    }),
    updateApp: payload => Request('post', 'app/status/update', {
        appId: sessionStorage.getItem('UEM_appId'),
        status: undefined,
        ...payload
    }),
    // 获取省份的名称和邮政编码
    getProvinceList: payload => Request('get','area/provinces/list',{
        tenantId: window.USER_INFO.tenantId,
        ...payload
    }),

    getIpCityList: payload => Request('get', 'area/cities/list',{
        tenantId: window.USER_INFO.tenantId,
        provinceId: undefined,
        ...payload
    }),

    getMappingStatus: payload => Request('get','area/ip/mapping/enabled/view',{
        tenantId: window.USER_INFO.tenantId,
        ...payload
    }),

    updateMappingStatus: payload => Request('post', 'area/ip/mapping/enable', {
        tenantId: window.USER_INFO.tenantId,
        status: undefined,
        ...payload
    }),

    updateIpMap: payload => Request('post', 'area/ip/map',{
        tenantId: window.USER_INFO.tenantId,
        mappingIps: undefined,
        ...payload
    } )

};