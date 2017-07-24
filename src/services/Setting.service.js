import Request from '../utils/request';

export default {
    getConfig: payload => Request('get', 'app/config/view', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform')
    }),

    getAppInfo: payload => Request('get', 'app/info/get', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform')
    }),

    updateAppInfo: payload => Request('post', 'app/update', payload),

    sendEmail: payload => Request('post', 'mail/send', payload)
};