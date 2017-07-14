export default {
    platform: [{
        name: 'pc',
        icon: 'icon-pc1'
    }, {
        name: 'ios',
        icon: 'icon-ios'
    }, {
        name: 'android',
        icon: 'icon-android'
    }],
    menus: [{
        name: 'dataBoard',
        list: [{
            name: '今日概况',
            to: '/overview',
            icon: 'icon-1'
        }, {
            name: '性能概况',
            to: '/performance_overview',
            icon: 'icon-3'
        }, {
            name: '错误概况',
            to: '/error_overview',
            icon: 'icon-2'
        }, {
            name: '用户概况',
            to: '/user_overview',
            icon: 'icon-4'
        }]
    }, {
        name: 'frontendMonitor',
        list: [{
            name: '页面浏览',
            to: '/performance_browse',
            icon: 'icon-xingneng'
        }, {
            name: '页面交互',
            to: '/performance_interactive',
            icon: 'icon-xingneng'
        }, {
            name: '错误跟踪',
            to: '/error_table',
            icon: 'icon-jinggao'
        }]
    }, {
        name: 'userAction',
        list: [{
            name: '用户轨迹',
            to: '/user_table',
            icon: 'icon-yonghu'
        }, {
            name: '热力图',
            to: '/heatmap_list',
            icon: 'icon-retu'
        }]
    }]
};