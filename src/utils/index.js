export function getTimeType() {
    const defaultTimeType = {
        type: 1,
        units: 'hours'
    };
    try {
        return JSON.parse(sessionStorage.getItem('UEM_timeType')) === null
            ? defaultTimeType
            : JSON.parse(sessionStorage.getItem('UEM_timeType'));
    } catch (error) {
        throw error;
    }
}