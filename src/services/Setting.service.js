import Request from '../utils/request';

export default {
    getConfig: payload => Request('get','app/config/view',{
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform')
    })
};