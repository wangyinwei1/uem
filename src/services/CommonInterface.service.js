import Request from '../utils/request';

export default {
    getKeyIndicator: payload => Request('get', 'indicators/get', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        metrics: JSON.stringify(["avgRspTime", "avgClientTime", "avgNetworkTime", "avgServerTime", "errorCount", "wrongPageNum", "effectedUserNum", "occurErrorUserRate", "sessionCount", "uv", "pv", "avgPvNum", "avgClickNum", "avgAccessTime"]),
        ...payload
    }),

    getPerformanceTrend: payload => Request('get','indexs/trend/view',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        metrics: JSON.stringify(["avgRspTime", "apdex", "errorCount", "clickNum", "pv", "sessionCount"]),
        ...payload
    }),

    getMapData: payload => Request('get', 'map/data/list',{
        appId: sessionStorage.getItem('UEM_appId'),
        endTime: moment().valueOf(),
        startTime: undefined,
        province: undefined,
        platform: sessionStorage.getItem('UEM_platform'),
        metrics: JSON.stringify(['avgRspTime']),
        pageindex: 1,
        pageSize: 10,
        sort: 'desc',
        sortKey: undefined,
        areaType: 'province',
        ...payload
    })
   
};