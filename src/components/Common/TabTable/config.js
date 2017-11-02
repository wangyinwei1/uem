import React from 'react';
import ColorType from './ColorType';
import OperType from './OperType';
import { tableProgress, errorTableTrend } from './TableFunction/index';

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
                width: 70,
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
                sorter: (a, b) => a.createTime - b.createTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
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
                sorter: (a, b) => a.updateTime - b.updateTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
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
                    return tableProgress(record.apdex, record.satisfactionIndex, config);
                }
            }, {
                value: 'thruput',
                label: locale('吞吐率(rpm)'),
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
                label: locale('响应时间(s)'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a, b) => a.avgRspTime - b.avgRspTime,
                render(text, record, index){
                    const config = [{ color: "#91eb7c", text: locale('客户端') }, { color: "#03a9f4", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    return tableProgress(record.avgRspTime, record.avgRspTimes, config, locale('平均响应时间'));
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
            },{
                value: 'path',
                label: 'URL',
                width: 150,
                checkd: true,
                disabled: true
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
                    return tableProgress(record.apdex, record.satisfactionIndex, config);
                }
            }, {
                value: 'thruput',
                label: locale('吞吐率(rpm)'),
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
                label: locale('响应时间(s)'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a,b) => a.avgRspTime - b.avgRspTime,
                render(text, record, index){
                    const config = [{ color: "#03a9f4", text: locale('客户端') }, { color: "#91eb7c", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    return tableProgress(record.avgRspTime, record.avgRspTimes, config, locale('平均响应时间'));
                } 
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
                width: 70,
                checked: true,
                disabled: true,
                // fixed: 'left',
                render: (text, record, index) => <ColorType type={record.type} />
            }, 
            {
                value: 'operType',
                label: locale('类型'),
                width: 80,
                checked: true,
                disabled: true,
                // fixed: 'left',
                render: (text, record, index) => <OperType type={record.operType} />,
            }, 
            {
                value: 'operName',
                label: locale('名称'),
                width: 200,
                checked: true,
                disabled: true,
                // fixed: 'left'
            },
            {
                value: 'clickNum',
                label: locale('点击数'),
                checked: true,
                disabled: true,
                width: 100,
                sorter: (a,b) => a.clickNum - b.clickNum
            },
            {
                value: 'srcName',
                label: locale('所在界面'),
                checked: true,
                disabled: true,
                width: 200,
            },
            {
                value: 'path',
                label: 'URL',
                checked: true,
                disabled: false,
                width: 200,
            }, 
            // {
            //     value: 'match',
            //     label: locale('URL规则'),
            //     checked: true,
            //     disabled: false,
            //     width: 200,
            // }, 
            {
                value: 'creator',
                label: locale('创建人'),
                checked: false,
                disabled: false,
                width: 120,
            }, 
            {
                value: 'createTime',
                label: locale('创建时间'),
                checked: false,
                disabled: false,
                width: 200,
                sorter: (a, b) => a.createTime - b.createTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
            }, {
                value: 'updator',
                label: locale('修改人'),
                checked: false,
                disabled: false,
                width: 150,
            }, {
                value: 'updateTime',
                label: locale('最后修改时间'),
                checked: false,
                disabled: false,
                width: 200,
                sorter: (a, b) => a.updateTime - b.updateTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
            }],
            quota: [{
                value: 'apdex',
                label: 'Apdex',
                checked: true,
                disabled: false,
                width: 120,
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
                    return tableProgress(record.apdex, record.satisfactionIndex, config);
                }
            }, {
                value: 'thruput',
                label: locale('吞吐率(rpm)'),
                checked: true,
                disabled: false,
                width: 100,
                render: (text, record, index) => text == null || text == undefined ? '--' : text,
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
                label: locale('响应时间(s)'),
                checked: true,
                disabled: false,
                width: 150,
                sorter: (a,b) => a.avgRspTime - b.avgRspTime,
                render(text, record, index){
                    const config = record.displayType == 'xhr' ?
                    [{ color: "#91eb7c", text: locale('回调') }, { color: "#03a9f4", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    :
                    [{ color: "#91eb7c", text: locale('客户端') }, { color: "#03a9f4", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    
                    return tableProgress(record.avgRspTime, record.avgRspTimes, config, locale('平均响应时间'));
                } 
            }
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
            },{
                value: 'operName',
                label: locale('名称'),
                checked: true,
                disabled: true,
                width: 100,
            },{
                value: 'srcName',
                label: locale('所在界面'),
                checked: true,
                disabled: true,
                width: 200,
            },
            {
                value: 'clickNum',
                label: locale('点击数'),
                checked: true,
                disabled: true,
                width: 100,
                sorter: (a,b) => a.clickNum - b.clickNum
            },
            {
                value: 'path',
                label: locale('目标URL'),
                checked: true,
                disabled: false,
                width: 200,
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
                    return tableProgress(record.apdex, record.satisfactionIndex, config);
                }
            }, {
                value: 'thruput',
                label: locale('吞吐率(rpm)'),
                checked: true,
                disabled: false,
                width: 100,
                // render: (text, record, index) => text ? text : '--',
                render: (text, record, index) => text == null || text == undefined ? '--' : text,
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
                label: locale('响应时间(s)'),
                checked: true,
                disabled: false,
                width: 100,
                sorter: (a, b) => a.avgRspTime - b.avgRspTime,
                render(text, record, index){
                    const config = record.displayType == 'xhr' ?
                    [{ color: "#91eb7c", text: locale('回调') }, { color: "#03a9f4", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    :
                    [{ color: "#91eb7c", text: locale('客户端') }, { color: "#03a9f4", text: locale('网络传输') }, { color: "#6270ef", text: locale('服务器') }]
                    return tableProgress(record.avgRspTime, record.avgRspTimes, config, locale('平均响应时间'));
                }
            }
        ]
        }
    }],

    PerformanceInteractiveMobile: [{
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
            }, 
            // {
            //     value: 'operType',
            //     label: locale('类型'),
            //     width: 80,
            //     checked: true,
            //     disabled: true,
            //     // fixed: 'left',
            //     render: (text, record, index) => <OperType type={record.operType} />,
            // }, 
            {
                value: 'operType',
                label: locale('手势'),
                width: 200,
                checked: true,
                disabled: true,
                // fixed: 'left'
            }, {
                value: 'uiType',
                label: locale('UI类型'),
                checked: true,
                disabled: true,
                width: 200,
            }, {
                value: 'name',
                label: locale('名称'),
                checked: true,
                disabled: true,
                width: 250,
            },
            ],
            quota: [
                {
                    value: 'clickNum',
                    label: locale('点击数'),
                    checked: false,
                    disabled: false,
                    width: 200,
                }, {
                    value: 'apdex',
                    label: locale('满意度'),
                    checked: false,
                    disabled: false,
                    width: 300,
                }, {
                    value: 'avgRspTime',
                    label: locale('平均响应时间(s)'),
                    checked: false,
                    disabled: false,
                    width: 200,
                }, {
                    value: 'thruput',
                    label: locale('吞吐率(rpm)'),
                    checked: false,
                    disabled: false,
                    width: 200,
                }, {
                    value: 'errorCount',
                    label: locale('错误数'),
                    checked: false,
                    disabled: false,
                    width: 200,
                }
            // {
            //     value: 'apdex',
            //     label: 'Apdex',
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            //     render: (text, record, index) => text ? text : '--',
            // }, {
            //     value: 'thruput',
            //     label: locale('吞吐率'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
            //     value: 'errorCount',
            //     label: locale('错误数'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
            //     value: 'avgRspTime',
            //     label: locale('响应时间'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
            //     value: 'pv',
            //     label: locale('浏览量PV'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
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
                label: locale('手势'),
                width: 200,
                checked: true,
                disabled: true,
                // fixed: 'left',
                // render: (text, record, index) => <OperType type={record.operType} />,
            }, {
                value: 'uiType',
                label: locale('UI类型'),
                checked: true,
                disabled: true,
                width: 200,
            }, {
                value: 'name',
                label: locale('名称'),
                checked: true,
                disabled: true,
                width: 200,
            }, ],
            quota: [
                {
                    value: 'clickNum',
                    label: locale('点击数'),
                    checked: false,
                    disabled: false,
                    width: 200,
                },{
                    value: 'apdex',
                    label: locale('满意度'),
                    checked: false,
                    disabled: false,
                    width: 200,
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
                        return tableProgress(record.apdex, record.satisfactionIndex, config);
                    }
                }, {
                    value: 'avgRspTime',
                    label: locale('平均响应时间(s)'),
                    checked: false,
                    disabled: false,
                    width: 200,
                }, {
                    value: 'thruput',
                    label: locale('吞吐率(rpm)'),
                    checked: false,
                    disabled: false,
                    width: 200,
                }, {
                    value: 'errorCount',
                    label: locale('错误数'),
                    checked: false,
                    disabled: false,
                    width: 200,
                }
            // {
            //     value: 'apdex',
            //     label: 'Apdex',
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            //     render: (text, record, index) => text ? text : '--',
            // }, {
            //     value: 'thruput',
            //     label: locale('吞吐率'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
            //     value: 'errorCount',
            //     label: locale('错误数'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
            //     value: 'avgRspTime',
            //     label: locale('响应时间'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
            //     value: 'pv',
            //     label: locale('浏览量PV'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }, {
            //     value: 'uv',
            //     label: locale('访问量UV'),
            //     checked: true,
            //     disabled: false,
            //     width: 100,
            // }
        ]
        }
    }],


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
                    return errorTableTrend(text, record, index);
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
                    return errorTableTrend(text, record, index);
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
                label: locale('用户ID'),
                value: 'displayName',
                checked: true,
                disabled: true,
                width: 100
            }, {
                label: locale('首次访问时间'),
                value: 'firstViewTimestamp',
                checked: true,
                disabled: true,
                width: 250,
                // sorter: (a, b) => a.firstViewTimestamp - b.firstViewTimestamp,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
            }, {
                label: locale('最后访问时间'),
                value: 'lastTime',
                checked: true,
                disabled: true,
                width: 250,
                sorter: (a, b) => a.lastTime - b.lastTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
            }, {
                label: locale('会话数'),
                value: 'sessionCount',
                checked: true,
                width: 150,
                sorter: (a, b) => a.sessionCount - b.sessionCount,
            }, 
            // {
            //     label: locale('用户ID'),
            //     value: 'userId',
            //     checked: false,
            //     disabled: false,
            //     width: 150,
            // }
        ],
            quota: []
        }
    }, {
        tabName: locale('未登录'),
        options: {
            normal: [{
                label: locale('用户ID'),
                value: 'displayName',
                checked: true,
                disabled: true,
                width: 150,
            },{
                label: locale('首次访问时间'),
                value: 'firstViewTimestamp',
                checked: true,
                disabled: true,
                width: 250,
                // sorter: (a, b) => a.firstViewTimestamp - b.firstViewTimestamp,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
            }, {
                label: locale('最后访问时间'),
                value: 'lastTime',
                checked: true,
                disabled: true,
                width: 250,
                sorter: (a, b) => a.lastTime - b.lastTime,
                render(text, record, index) {
                    const time = moment(Number(text)).format("YYYY-MM-DD HH:mm");
                    return time == "Invalid date" ? "--" : time;
                }
            }, {
                label: locale('会话数'),
                value: 'sessionCount',
                checked: true,
                width: 100,
                sorter: (a, b) => a.sessionCount - b.sessionCount,
            }, 
            // {
            //     label: locale('用户ID'),
            //     value: 'userId',
            //     checked: false,
            //     disabled: false,
            // }
        ],
            quota: []
        }
    }],
};