import Request from '../utils/request';
import { getVersion } from '../utils/storage';

export default {
    getOpersList: payload => Request('get', 'perfor/opers/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        startTime: undefined,
        endTime: undefined,
        pageIndex: undefined,
        sortKey: undefined,
        sort: undefined,
        tagType: undefined,
        operType: undefined,
        performanceType: undefined,
        type: undefined,
        version: getVersion(),
        ...payload
    })
};