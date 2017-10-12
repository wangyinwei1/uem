import Request from '../utils/request';
import { getVersion } from '../utils/storage';

export default {
    getOperInfo: payload => Request('get', 'perfor/oper/info/view', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        operType: undefined,
        path: undefined,
        text: undefined,
        selector: undefined,
        isMarked: undefined,
        displayType: undefined,
        performanceType: undefined,
        // 增加version
        version: getVersion(),
        ...payload
    }),
    getOperTrend: payload => Request('get', 'perfor/oper/trend/show', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        text: undefined,
        operType: undefined,
        path: undefined,
        selector: undefined,
        isMarked: undefined,
        columnCode:JSON.stringify(['clickNum', 'apdexs', 'median', 'rspTime', 'percent5', 'thruput', 'clientTime', 'serverTime', 'netTime', 'request', 'response', 'callback']),
        performanceType: undefined,
        // 增加displayType和 version
        displayType: undefined,
        version: getVersion(),
        ...payload
    }),
    getOperSamplesList: payload => Request('get', 'perfor/oper/samples/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        text: undefined,
        operType: undefined,
        path: undefined,
        selector: undefined,
        isMarked: undefined,
        pageIndex: undefined,
        performanceType: undefined,
        version: getVersion(),
        ...payload
    }),
    getOperBaseInfo: payload => Request('get', 'perfor/oper/sample/baseinfo/view', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        // startTime: undefined,
        // endTime: undefined,
        sampleId: undefined,
        operType: undefined,
        ...payload
    }),
    getSessionTrace: payload => Request('get', 'session/trace/show', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        sessionId: undefined,
        time: undefined,
        ...payload
    }),
    getOperAnalyze: payload => Request('get', 'perfor/oper/sample/perfor/analyze', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        sampleId: undefined,
        operType: undefined,
        ...payload
    }),
    getSampleAnalyze: payload => Request('get', 'perfor/oper/sample/res/analyze', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        sampleId: undefined,
        type: undefined,
        sort: undefined,
        pageIndex: undefined,
        ...payload
    }),
};