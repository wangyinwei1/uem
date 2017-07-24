import Request from '../utils/request';

export default {
    getUserTrend: payload => Request('get', '', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        uId: undefined,
        ...payload
    })
}