import Request from '../utils/request';

export default {

    getPerformanceTrend: payload => Requset('get','indexs/trend/view',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        metrics: JSON.parse(["avgRspTime", "apdex", "errorCount", "clickNum", "pv", "sessionCount"]),
        ...payload
    })
    
};