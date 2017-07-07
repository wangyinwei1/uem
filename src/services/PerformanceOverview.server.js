import Request from '../utils/request';

export default {
    getKeyIndicator: payload => Request('get', 'indicators/get', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        metrics: JSON.parse(["avgRspTime", "avgClientTime", "avgNetworkTime", "avgServerTime", "errorCount", "wrongPageNum", "effectedUserNum", "occurErrorUserRate", "sessionCount", "uv", "pv", "avgPvNum", "avgClickNum", "avgAccessTime"]),
        ...payload
    }),

    getPerformanceTrend: payload => Requset('get','indexs/trend/view',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        metrics: JSON.parse(["avgRspTime", "apdex", "errorCount", "clickNum", "pv", "sessionCount"])
        ...payload
    })
    
};