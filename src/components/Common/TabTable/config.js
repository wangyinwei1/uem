import React from 'react';
import ColorType from './ColorType';
import OperType from './OperType';
import TableFunction from './TableFunction/index';

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
                // render: (text, record, index) => text ? text : '--',
                render(text, record, index) {
                    // const config = UYUN.getTheme("performanceChart-table1");
                    const config = [
                        {
                            color: "#ff5252",
                            text: locale('不满意')
                        }, {
                            color: "#ffec0c",
                            text: locale('可接受')
                        }, {
                            color: "#66dc6b",
                            text: locale('满意')
                        }
                    ];
                    return TableFunction.tableProgress(record.apdex, record.satisfactionIndex, config);
                }
            }, {
                value: 'thruput',
                label: locale('吞吐率'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a, b) => a.thruput - b.thruput,
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.errorCount - b.errorCount
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a, b) => a.avgRspTime - b.avgRspTime,
                render(text, record, index){
                    const config = [{ color: "#03a9f4", text: locale('客户端') }, { color: "#91eb7c", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    return TableFunction.tableProgress(record.avgRspTime, record.avgRspTimes, config, locale('平均响应时间'));
                } 
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.pc - b.pv
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
                sorter: (a,b) => a.thruput - b.thruput
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.errorCount - b.errorCount
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.avgRspTime - b.avgRspTime
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.pv - b.pv
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
                sorter: (a,b) => a.thruput - b.thruput
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.errorCount - b.errorCount
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.avgRspTime - b.avgRspTime
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
            },
            // 高保真有矛盾 
            // {
            //     value: 'uv',
            //     label: locale('访问量UV'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }
        ]
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
                render(text, record, index) {
                    // const config = UYUN.getTheme("performanceChart-table1");
                    const config = [
                        {
                            color: "#ff5252",
                            text: locale('不满意')
                        }, {
                            color: "#ffec0c",
                            text: locale('可接受')
                        }, {
                            color: "#66dc6b",
                            text: locale('满意')
                        }
                    ];
                    return TableFunction.tableProgress(record.apdex, record.satisfactionIndex, config);
                }
            }, {
                value: 'thruput',
                label: locale('吞吐率'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.thruput - b.thruput
            }, {
                value: 'errorCount',
                label: locale('错误数'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.errorCount - b.errorCount
            }, {
                value: 'avgRspTime',
                label: locale('响应时间'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a, b) => a.avgRspTime - b.avgRspTime,
                render(text, record, index){
                    const config = [{ color: "#03a9f4", text: locale('客户端') }, { color: "#91eb7c", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    return TableFunction.tableProgress(record.avgRspTime, record.avgRspTimes, config, locale('平均响应时间'));
                }
            }, {
                value: 'pv',
                label: locale('浏览量PV'),
                checked: true,
                disabled: false,
                width: 100,
            }, 
            {
                value: 'uv',
                label: locale('访问量UV'),
                checked: true,
                disabled: false,
                width: 100,
            }
        ]
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
                render(text, record, index) {
                    return TableFunction.errorTableTrend(text, record, index);
                }
            }, {
                label: locale('最近发生时间'),
                value: 'lastTime',
                width: '20%',
                sorter: (a, b) => a.lastTime - b.lastTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
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
                sorter: (a, b) => a.errorCount - b.errorCount,
            }, {
                label: locale('趋势'),
                value: 'trend',
                width: '15%',
                render(text, record, index) {
                    return TableFunction.errorTableTrend(text, record, index);
                }
            }, {
                label: locale('最近发生时间'),
                value: 'lastTime',
                width: '20%',
                sorter: (a, b) => a.lastTime - b.lastTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
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
                sorter: (a, b) => a.lastTime - b.lastTime,
            }, {
                label: locale('会话数'),
                value: 'sessionCount',
                checked: true,
                sorter: (a, b) => a.sessionCount - b.sessionCount,
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
                sorter: (a, b) => a.lastTime - b.lastTime,
            }, {
                label: locale('会话数'),
                value: 'sessionCount',
                checked: true,
                sorter: (a, b) => a.sessionCount - b.sessionCount,
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