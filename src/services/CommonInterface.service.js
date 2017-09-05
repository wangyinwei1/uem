import Request from '../utils/request';
import { getVersion } from '../utils/storage';

export default {
    getKeyIndicator: payload => Request('get', 'indicators/get', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        metrics: JSON.stringify(["avgRspTime", "avgClientTime", "avgNetworkTime", "avgServerTime", "errorCount"]),
        version: getVersion(),
        ...payload
    }),

    getTrend: payload => Request('get','indexs/trend/view',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        metrics: JSON.stringify(["avgRspTime", "apdex", "errorCount", "clickNum", "pv", "sessionCount"]),
        version: getVersion(),
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
        version: getVersion(),
        ...payload
    }),

    getAppVersion: payload => Request('get','versions/get',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        ...payload
    })
   
};