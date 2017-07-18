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
    })
};