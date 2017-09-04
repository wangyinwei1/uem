import Request from '../utils/request';

export default {
    getKeyIndicator: payload => Request('get', 'indicators/get', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        metrics: JSON.stringify(["avgRspTime", "avgClientTime", "avgNetworkTime", "avgServerTime", "errorCount"]),
        version: sessionStorage.getItem('UEM_platform') == 'pc' ? JSON.stringify(' ') : sessionStorage.getItem('UEM_appVersion') ? sessionStorage.getItem('UEM_appVersion') : 'global',
        ...payload
    }),

    getTrend: payload => Request('get','indexs/trend/view',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        metrics: JSON.stringify(["avgRspTime", "apdex", "errorCount", "clickNum", "pv", "sessionCount"]),
        version: sessionStorage.getItem('UEM_platform') == 'pc' ? JSON.stringify(' ') : 'global',
        ...payload
    }),

    getMapData: payload => Request('get', 'map/data/list',{
        appId: sessionStorage.getItem('UEM_appId'),
        endTime: moment().valueOf(),
        startTime: undefined,
        province: undefined,
        platform: sessionStorage.getItem('UEM_platform'),
        metrics: JSON.stringify(['avgRspTime']),
        pageIndex: 1,
        pageSize: 10,
        sort: 'desc',
        sortKey: undefined,
        areaType: 'province',
        version: sessionStorage.getItem('UEM_platform') == 'pc' ? JSON.stringify(' ') : sessionStorage.getItem('UEM_appVersion') ? sessionStorage.getItem('UEM_appVersion') : 'global',
        ...payload
    })
   
};