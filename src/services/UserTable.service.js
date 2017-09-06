import Request from '../utils/request';
import { getVersion } from '../utils/storage';

export default {
    getUserList: payload => Request('get', 'user/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        pageSize: undefined,
        pageIndex: undefined,
        userType: undefined,
        sort: undefined,
        sortKey: undefined,
        searchKey: undefined,
        version: getVersion(),
        ...payload
    }),
};