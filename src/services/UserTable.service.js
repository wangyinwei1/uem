import Request from '../utils/request';

export default {
    getUserList: payload => Request('get', 'user/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: moment().valueOf(),
        pageSize: undefined,
        pageIndex: undefined,
        userType: undefined,
        sort: undefined,
        sortKey: undefined,
        searchKey: undefined,
        ...payload
    }),
};