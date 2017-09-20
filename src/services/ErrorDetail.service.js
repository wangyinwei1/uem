import Request from '../utils/request';

export default {
    getErrorTopView: payload => Request('get', 'error/top/view', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        // targetDimension: undefined,
        // metrics: undefined,
        dimension: undefined,
        summaryId: undefined,
        version: undefined,
        ...payload
    }),
    getSamplesList: payload => Request('get','error/samples/list',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        summaryId: undefined,
        pageIndex: 1,
        // pageSize: undefined
        ...payload
    }),
    getErrorDetailTrend: payload => Request('get','error/trend/show',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        summary: undefined,
        ...payload
    }),
    getSampleInfo: payload => Request('get','error/sample/info/view',{
        errorId: undefined,
        appId: sessionStorage.getItem('UEM_appId'),
        startTime: undefined,
        endTime: undefined,
        platform: sessionStorage.getItem('UEM_platform'),
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
};