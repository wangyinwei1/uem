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

    sendEmail: payload => Request('post', 'mail/send', payload),

    // 传递的参数中有数组，默认的$.param()解析会有问题，所以先转换成字符串
    updateConfig: payload => Request('post', 'app/config/update', JSON.stringify({
        ...payload,
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
    }), { contentType: 'application/json' }),

    getUserDataModelList: () => Request('get', 'userDefine/keys/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform')
    })

};