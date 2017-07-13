export function getTimeType() {
    const defaultValue = {
        type: 1,
        units: 'hours'
    };
    try {
        return JSON.parse(sessionStorage.getItem('UEM_timeType')) === null
            ? defaultValue
            : JSON.parse(sessionStorage.getItem('UEM_timeType'));
    } catch (error) {
        throw error;
    }
}

export function getColOptions(type) {
    switch (type) {
        case 'PerformanceBrowse':
            const defaultValue = [[
                "type",
                "operType",
                "operName",
                "apdex",
                "thruput",
                "errorCount",
                "avgRspTime",
                "pv",
                "uv"
            ], [
                "operType",
                "apdex",
                "thruput",
                "errorCount",
                "avgRspTime",
                "pv",
                "uv"
            ]];
            try {
                return JSON.parse(localStorage.getItem('UEM_colOptions_PerformanceBrowse')) === null
                    ? defaultValue
                    : JSON.parse(localStorage.getItem('UEM_colOptions_PerformanceBrowse'));
            } catch (error) {
                throw error;
            }
        default:
            throw new Error('type 参数未指定');
    }
}