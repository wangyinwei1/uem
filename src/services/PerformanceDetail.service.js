import Request from '../utils/request';

export default {
    getOperInfo: payload => Request('get', 'perfor/oper/info/view', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        operType: undefined,
        path: undefined,
        text: undefined,
        selector: undefined,
        isMarked: undefined,
        performanceType: undefined,
        ...payload
    }),
    getOperTrend: payload => Request('get', 'perfor/oper/trend/show', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        text: undefined,
        operType: undefined,
        path: undefined,
        selector: undefined,
        isMarked: undefined,
        columnCode: JSON.stringify(['clickNum', 'apdexs', 'median', 'rspTime', 'percent5', 'thruput', 'clientTime', 'serverTime', 'netTime', 'request', 'response', 'callback']),
        performanceType: undefined,
        ...payload
    }),
};