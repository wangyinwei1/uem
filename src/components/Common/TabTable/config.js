export default {
    PerformanceBrowse: [{
        tabName: '已标记',
        // filter: [{
        //     label: 'AJAX',
        //     checked: true,
        //     value: 'xhr'
        // },{
        //     label: '链接',
        //     checked: true,
        //     value: 'link'
        // },{
        //     label: '重定向',
        //     checked: true,
        //     value: 'redirect'
        // },{
        //     label: '表单',
        //     checked: true,
        //     value: 'form'
        // }],
        options: {
            normal: [{
                value: 'type',
                label: '标识',
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }, {
                value: 'operType',
                label: '类型',
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }, {
                value: 'operName',
                label: '页面名称',
                width: 400,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }, {
                value: 'path',
                label: 'URL',
                checked: false,
                disabled: false,
                width: 400,
            }, {
                value: 'match',
                label: 'URL规则',
                checked: false,
                disabled: false,
                width: 400,
            }, {
                value: 'creator',
                label: '创建人',
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'createTime',
                label: '创建时间',
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updator',
                label: '修改人',
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updateTime',
                label: '最后修改时间',
                checked: false,
                disabled: false,
                width: 200,
            }],
            quota: [{
                value: 'apdexD',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'thruput',
                label: '吞吐率',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: '错误数',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: '响应时间',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: '浏览量PV',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: '访问量UV',
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }, {
        tabName: '未标记',
        options: {
            normal: [{
                value: 'operType',
                label: '类型',
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }],
            quota: [{
                value: 'apdexD',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'thruput',
                label: '吞吐率',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: '错误数',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: '响应时间',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: '浏览量PV',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: '访问量UV',
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }],
    PerformanceInteractive: [{
        tabName: '已标记',
        options: {
            normal: [{
                value: 'type',
                label: '标识',
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }, {
                value: 'operType',
                label: '类型',
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }, {
                value: 'operName',
                label: '页面名称',
                width: 400,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }, {
                value: 'path',
                label: 'URL',
                checked: false,
                disabled: false,
                width: 400,
            }, {
                value: 'match',
                label: 'URL规则',
                checked: false,
                disabled: false,
                width: 400,
            }, {
                value: 'creator',
                label: '创建人',
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'createTime',
                label: '创建时间',
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updator',
                label: '修改人',
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updateTime',
                label: '最后修改时间',
                checked: false,
                disabled: false,
                width: 200,
            }],
            quota: [{
                value: 'apdexD',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'thruput',
                label: '吞吐率',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: '错误数',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: '响应时间',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: '浏览量PV',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: '访问量UV',
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }, {
        tabName: '未标记',
        options: {
            normal: [{
                value: 'operType',
                label: '类型',
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }],
            quota: [{
                value: 'apdexD',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'thruput',
                label: '吞吐率',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: '错误数',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: '响应时间',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: '浏览量PV',
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: '访问量UV',
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }]
};