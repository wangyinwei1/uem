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
        case 'PerformanceBrowse': {
            const defaultValue = [[
                'type',
                'operType',
                'operName',
                'apdex',
                'thruput',
                'errorCount',
                'avgRspTime',
                'pv',
                'uv'
            ], [
                'operType',
                'apdex',
                'thruput',
                'errorCount',
                'avgRspTime',
                'pv',
                'uv'
            ]];
            try {
                return JSON.parse(localStorage.getItem('UEM_colOptions_PerformanceBrowse')) === null
                    ? defaultValue
                    : JSON.parse(localStorage.getItem('UEM_colOptions_PerformanceBrowse'));
            } catch (error) {
                throw error;
            }
            break;
        }
        case 'PerformanceInteractive': {
            const defaultValue = [[
                'type',
                'operType',
                'operName',
                'apdex',
                'thruput',
                'errorCount',
                'avgRspTime',
                'pv',
                'uv'
            ], [
                'operType',
                'apdex',
                'thruput',
                'errorCount',
                'avgRspTime',
                'pv',
                'uv'
            ]];
            try {
                return JSON.parse(localStorage.getItem('UEM_colOptions_PerformanceInteractive')) === null
                    ? defaultValue
                    : JSON.parse(localStorage.getItem('UEM_colOptions_PerformanceInteractive'));
            } catch (error) {
                throw error;
            }
            break;
        }
        case 'ErrorTable': {
            const defaultValue = [[
                'summaryId',
                'errorType',
                'errorInfo',
                'errorCount',
                'trend',
                'lastTime'
            ], [
                'summaryId',
                'errorType',
                'errorInfo',
                'errorCount',
                'trend',
                'lastTime'
            ]];
            return defaultValue;
            break;
        }
        case 'UserTable': {
            const defaultValue = [[
                'displayName',
                'firstViewTimestamp',
                'lastTime',
                'sessionCount'
            ], [
                'displayName',
                'firstViewTimestamp',
                'lastTime',
                'sessionCount'
            ]];
            try {
                return JSON.parse(localStorage.getItem('UEM_colOptions_UserTable')) === null
                    ? defaultValue
                    : JSON.parse(localStorage.getItem('UEM_colOptions_UserTable'));
            } catch (error) {
                throw error;
            }
            break;
        }
        default:
            throw new Error('type 参数未指定');
    }
}

export function getDeploy(type) {
    const defaultValue = {
        apdex: 100,
        appId: '2222',
        reportPeriod: 60000,
        slowLoadThreshold: 40000
    };
    try {
        return JSON.parse(sessionStorage.getItem('UEM_deploy')) === null
            ? defaultValue
            : JSON.parse(sessionStorage.getItem('UEM_deploy'));
    } catch (error) {
        throw error;
    }
}

export function getTheme() {
    const defaultValue = 'blue';
    try {
        return sessionStorage.getItem('UEM_theme') === null
            ? defaultValue
            : sessionStorage.getItem('UEM_theme');
    } catch (error) {
        throw error;
    }
}