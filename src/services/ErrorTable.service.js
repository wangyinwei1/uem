import Request from '../utils/request';

export default {
    getErrorsList: payload => Request('get', 'errors/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        pageSize: undefined,
        pageIndex: undefined,
        status: undefined,
        sort: undefined,
        sortKey: undefined,
        ...payload
    }),
    resolveRow: payload => Request('post', 'errorStatus/update', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        summaryId: undefined,
        ...payload
    })
};