import React from 'react';
import ColorType from './ColorType';
import OperType from './OperType';

export default {
    PerformanceBrowse: [{
        tabName: locale('已标记'),
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
                label: locale('标识'),
                width: 80,
                checked: true,
                disabled: true,
                render: (text, record, index) => <ColorType type={record.type} />,
                // fixed: 'left'
            }, {
                value: 'operType',
                label: locale('类型'),
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left'
                render: (text, record, index) => <OperType type={record.operType} />,
            }, {
                value: 'operName',
                label: locale('页面名称'),
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
                label: locale('URL规则'),
                checked: false,
                disabled: false,
                width: 400,
            }, {
                value: 'creator',
                label: locale('创建人'),
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'createTime',
                label: locale('创建时间'),
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updator',
                label: locale('修改人'),
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updateTime',
                label: locale('最后修改时间'),
                checked: false,
                disabled: false,
                width: 200,
            }],
            quota: [{
                value: 'apdex',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
                render: (text, record, index) => text ? text : '--',
            }, {
                value: 'thruput',
                label: locale('吞吐率'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: locale('访问量UV'),
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }, {
        tabName: locale('未标记'),
        options: {
            normal: [{
                value: 'operType',
                label: locale('类型'),
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left',
                render: (text, record, index) => <OperType type={record.operType} />
            }],
            quota: [{
                value: 'apdex',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
                render: (text, record, index) => text ? text : '--',
            }, {
                value: 'thruput',
                label: locale('吞吐率'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: locale('访问量UV'),
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }],
    PerformanceInteractive: [{
        tabName: locale('已标记'),
        options: {
            normal: [{
                value: 'type',
                label: locale('标识'),
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left',
                render: (text, record, index) => <ColorType type={record.type} />
            }, {
                value: 'operType',
                label: locale('类型'),
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left',
                render: (text, record, index) => <OperType type={record.operType} />,
            }, {
                value: 'operName',
                label: locale('页面名称'),
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
                label: locale('URL规则'),
                checked: false,
                disabled: false,
                width: 400,
            }, {
                value: 'creator',
                label: locale('创建人'),
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'createTime',
                label: locale('创建时间'),
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updator',
                label: locale('修改人'),
                checked: false,
                disabled: false,
                width: 200,
            }, {
                value: 'updateTime',
                label: locale('最后修改时间'),
                checked: false,
                disabled: false,
                width: 200,
            }],
            quota: [{
                value: 'apdex',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
                render: (text, record, index) => text ? text : '--',
            }, {
                value: 'thruput',
                label: locale('吞吐率'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: locale('访问量UV'),
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }, {
        tabName: locale('未标记'),
        options: {
            normal: [{
                value: 'operType',
                label: locale('类型'),
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left',
                render: (text, record, index) => <OperType type={record.operType} />,
            }],
            quota: [{
                value: 'apdex',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 100,
                render: (text, record, index) => text ? text : '--',
            }, {
                value: 'thruput',
                label: locale('吞吐率'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
            }, {
                value: 'uv',
                label: locale('访问量UV'),
                checked: true,
                disabled: false,
                width: 100,
            }]
        }
    }],

    // PerformanceInteractiveMobile: [{
    //     tabName: locale('已标记'),
    //     options: {
    //         normal: [{
    //             value: 'type',
    //             label: locale('标识'),
    //             width: 80,
    //             checked: true,
    //             disabled: true,
    //             // fixed: 'left',
    //             render: (text, record, index) => <ColorType type={record.type} />
    //         }, 
    //         // {
    //         //     value: 'operType',
    //         //     label: locale('类型'),
    //         //     width: 80,
    //         //     checked: true,
    //         //     disabled: true,
    //         //     // fixed: 'left',
    //         //     render: (text, record, index) => <OperType type={record.operType} />,
    //         // }, 
    //         {
    //             value: ' ',
    //             label: locale('手势'),
    //             width: 400,
    //             checked: true,
    //             disabled: false,
    //             // fixed: 'left'
    //         }, {
    //             value: ' ',
    //             label: locale('UI类型'),
    //             checked: false,
    //             disabled: false,
    //             width: 400,
    //         }, {
    //             value: '',
    //             label: locale('名称'),
    //             checked: false,
    //             disabled: false,
    //             width: 400,
    //         },
    //         {
    //             value: '',
    //             label: locale('点击数'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }, {
    //             value: '',
    //             label: locale('满意度'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }, {
    //             value: '',
    //             label: locale('平均响应时间(s)'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }, {
    //             value: '',
    //             label: locale('吞吐率(rmp)'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }, {
    //             value: ' ',
    //             label: locale('错误数'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }],
    //         quota: [
    //         // {
    //         //     value: 'apdex',
    //         //     label: 'Apdex',
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         //     render: (text, record, index) => text ? text : '--',
    //         // }, {
    //         //     value: 'thruput',
    //         //     label: locale('吞吐率'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'errorCount',
    //         //     label: locale('错误数'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'avgRspTime',
    //         //     label: locale('响应时间'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'pv',
    //         //     label: locale('浏览量PV'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'uv',
    //         //     label: locale('访问量UV'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }
    //     ]
    //     }
    // }, {
    //     tabName: locale('未标记'),
    //     options: {
    //         normal: [{
    //             value: '',
    //             label: locale('手势'),
    //             width: 80,
    //             checked: true,
    //             disabled: true,
    //             // fixed: 'left',
    //             // render: (text, record, index) => <OperType type={record.operType} />,
    //         }, {
    //             value: ' ',
    //             label: locale('UI类型'),
    //             checked: false,
    //             disabled: false,
    //             width: 400,
    //         }, {
    //             value: '',
    //             label: locale('名称'),
    //             checked: false,
    //             disabled: false,
    //             width: 400,
    //         }, {
    //             value: '',
    //             label: locale('点击数'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         },{
    //             value: '',
    //             label: locale('满意度'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }, {
    //             value: '',
    //             label: locale('平均响应时间(s)'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }, {
    //             value: '',
    //             label: locale('吞吐率(rmp)'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }, {
    //             value: ' ',
    //             label: locale('错误数'),
    //             checked: false,
    //             disabled: false,
    //             width: 200,
    //         }],
    //         quota: [
    //         // {
    //         //     value: 'apdex',
    //         //     label: 'Apdex',
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         //     render: (text, record, index) => text ? text : '--',
    //         // }, {
    //         //     value: 'thruput',
    //         //     label: locale('吞吐率'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'errorCount',
    //         //     label: locale('错误数'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'avgRspTime',
    //         //     label: locale('响应时间'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'pv',
    //         //     label: locale('浏览量PV'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }, {
    //         //     value: 'uv',
    //         //     label: locale('访问量UV'),
    //         //     checked: true,
    //         //     disabled: false,
    //         //     width: 100,
    //         // }
    //     ]
    //     }
    // }],


    ErrorTable: [{
        tabName: locale('未解决'),
        options: {
            normal: [{
                label: locale('错误ID'),
                value: 'summaryId',
                width: '20%',
            }, {
                label: locale('错误类型'),
                value: 'errorType',
                width: '5%',
            }, {
                label: locale('错误描述'),
                value: 'errorInfo',
                width: '30%',
            }, {
                label: locale('错误数'),
                value: 'errorCount',
                width: '10%',
                // sorter: (a, b) => a.errorCount - b.errorCount,
            }, {
                label: locale('趋势'),
                value: 'trend',
                width: '15%',
            }, {
                label: locale('最近发生时间'),
                value: 'lastTime',
                width: '20%',
                // sorter: (a, b) => a.lastTime - b.lastTime,
            }],
            quota: []
        }
    }, {
        tabName: locale('已解决'),
        options: {
            normal: [{
                label: locale('错误ID'),
                value: 'summaryId',
                width: '20%',
            }, {
                label: locale('错误类型'),
                value: 'errorType',
                width: '5%',
            }, {
                label: locale('错误描述'),
                value: 'errorInfo',
                width: '30%',
            }, {
                label: locale('错误数'),
                value: 'errorCount',
                width: '10%',
                // sorter: (a, b) => a.errorCount - b.errorCount,
            }, {
                label: locale('趋势'),
                value: 'trend',
                width: '15%',
            }, {
                label: locale('最近发生时间'),
                value: 'lastTime',
                width: '20%',
                // sorter: (a, b) => a.lastTime - b.lastTime,
            }],
            quota: []
        }
    }],
    UserTable: [{
        tabName: locale('已登录'),
        options: {
            normal: [{
                label: locale('用户名'),
                value: 'displayName',
                checked: true,
                disabled: true,
            }, {
                label: locale('首次访问时间'),
                value: 'firstViewTimestamp',
                checked: true,
                disabled: true,
            }, {
                label: locale('最后访问时间'),
                value: 'lastTime',
                checked: true,
                disabled: true,
                // sorter: (a, b) => a.lastTime - b.lastTime,
            }, {
                label: locale('会话数'),
                value: 'sessionCount',
                checked: true,
                // sorter: (a, b) => a.sessionCount - b.sessionCount,
            }, {
                label: locale('用户ID'),
                value: 'userId',
                checked: false,
                disabled: false,
            }],
            quota: []
        }
    }, {
        tabName: locale('未登录'),
        options: {
            normal: [{
                label: locale('用户名'),
                value: 'displayName',
                checked: true,
                disabled: true,
            },{
                label: locale('首次访问时间'),
                value: 'firstViewTimestamp',
                checked: true,
                disabled: true,
            }, {
                label: locale('最后访问时间'),
                value: 'lastTime',
                checked: true,
                disabled: true,
                // sorter: (a, b) => a.lastTime - b.lastTime,
            }, {
                label: locale('会话数'),
                value: 'sessionCount',
                checked: true,
                // sorter: (a, b) => a.sessionCount - b.sessionCount,
            }, {
                label: locale('用户ID'),
                value: 'userId',
                checked: false,
                disabled: false,
            }],
            quota: []
        }
    }],
};