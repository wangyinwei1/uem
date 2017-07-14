import Request from '../utils/request';

export default {
    getHeatmapList: payload => Request('get', 'heatMap/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        pageSize: 100,
        version: undefined,
        pageIndex: undefined,
        ...payload
    })
};