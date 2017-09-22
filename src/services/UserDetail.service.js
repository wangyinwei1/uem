import Request from '../utils/request';

export default {
    getUserTrend: payload => Request('get', 'user/trend/show', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        uId: undefined,
        ...payload
    }),
    getUserSessionsList: payload => Request('get', 'user/sessions/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        uId: undefined,
        pageIndex: undefined,
        pageSize: undefined,
        version: undefined,
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
}