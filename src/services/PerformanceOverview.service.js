import Request from '../utils/request';

export default {

    getPerformanceApdex: payload => Request('get','deploy/apdex/view',{
        tenantId: window.USER_INFO.tenantId,
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        ...payload
    })
    
};