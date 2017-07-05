import Request from '../utils/request';

export default {
    getRealTimeData: payload => Request('get', 'app/realTimeData/overview', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: moment().subtract(30, 'minutes').valueOf(),
        endTime: moment().valueOf(),
        indexes: 'sessionCount,operCountPerMin,errorCount/operCount,apdex,percentage',
        ...payload
    }),
    getTrend: payload => Request('get', 'app/countAndTrend/overview', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        metrics: JSON.stringify(['pv', 'uv', 'errorCount', 'clickNum', 'avgRspTime']),
        ...payload
    }),
    getUserDistribution: payload => Request('get', 'app/userDistribution/overview', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        dataNum: 100,
        pageIndex: 1,
        areaType: 'province',
        ...payload
    }),
    getApdex: payload => Request('get', 'app/deploy/apdex/view', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        tenantId: window.USER_INFO.tenantId
    })
};