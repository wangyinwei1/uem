import Request from '../utils/request';
import { getVersion } from '../utils/storage';

export default {
    getRealTimeData: payload => Request('get', 'app/realTimeData/overview', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        // startTime: moment().subtract(30, 'minutes').valueOf(),
        // endTime: moment().valueOf(),
        // indexs: 'sessionCount,operCountPerMin,errorCount/operCount,apdex,percentage',
        // 增加version字段
        version: getVersion(),
        ...payload
    }),
    getTrend: payload => Request('get', 'app/countAndTrend/overview', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        metrics: sessionStorage.getItem('UEM_platform') == 'pc' ? JSON.stringify(['pv', 'uv', 'errorCount', 'clickNum', 'avgRspTime']) :  JSON.stringify(['sessionCount', 'clickNum', 'avgUiRspTime', 'errorCount', 'avgRspTime']),
        // 增加version字段
        version: getVersion(),
        ...payload
    }),
    getUserDistribution: payload => Request('get', 'app/userDistribution/overview', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        pageSize: 100,
        pageIndex: 1,
        areaType: 'province',
         // 增加version字段
         version: getVersion(),
        ...payload
    }),
    getApdex: payload => Request('get', 'app/deploy/apdex/view', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        tenantId: window.USER_INFO.tenantId
    })
};