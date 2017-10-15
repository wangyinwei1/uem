import Request from '../utils/request';
import { getVersion } from '../utils/storage';

export default {
    getHeatmapList: payload => Request('get', 'heatMap/list', {
        appId: sessionStorage.getItem('UEM_appId'),
        platform: sessionStorage.getItem('UEM_platform'),
        pageSize: 100,
        version: undefined,
        pageIndex: undefined,
        ...payload
    }),

    deleteHeatMap: payload => Request('post','heatMap/del',{
        appId: undefined,
        url: undefined,
        platform:sessionStorage.getItem('UEM_platform'),
        version: getVersion(),
        ...payload
    })
};