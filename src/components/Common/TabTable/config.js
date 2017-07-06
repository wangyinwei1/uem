export default {
    PerformanceBrowse: [{
        tabName: '已标记',
        options: {
            normal: [{
                value: 'type',
                label: '标识',
                width: 80,
                checked: true,
                disabled: true,
                fixed: 'left'
            }, {
                value: 'operType',
                label: '类型',
                width: 100,
                checked: true,
                disabled: true,
                fixed: 'left'
            }, {
                value: 'operName',
                label: '页面名称',
                width: 200,
                checked: true,
                disabled: true,
                fixed: 'left'
            }, {
                value: 'path',
                label: 'URL',
                checked: false,
                disabled: false
            }, {
                value: 'match',
                label: 'URL规则',
                checked: false,
                disabled: false
            }, {
                value: 'creator',
                label: '创建人',
                checked: false,
                disabled: false
            }, {
                value: 'createTime',
                label: '创建时间',
                checked: false,
                disabled: false
            }, {
                value: 'updator',
                label: '修改人',
                checked: false,
                disabled: false
            }, {
                value: 'updateTime',
                label: '最后修改时间',
                checked: false,
                disabled: false
            }],
            quota: [{
                value: 'apdex',
                label: 'Apdex',
                checked: true,
                disabled: false
            }, {
                value: 'thruput',
                label: '吞吐率',
                checked: true,
                disabled: false
            }, {
                value: 'errorCount',
                label: '错误数',
                checked: true,
                disabled: false
            }, {
                value: 'avgRspTime',
                label: '响应时间',
                checked: true,
                disabled: false
            }, {
                value: 'pv',
                label: '浏览量PV',
                checked: true,
                disabled: false
            }, {
                value: 'uv',
                label: '访问量UV',
                checked: true,
                disabled: false
            }]
        }
    }, {
        tabName: '未标记',
        options: {
            normal: [],
            quota: []
        }
    }]
};