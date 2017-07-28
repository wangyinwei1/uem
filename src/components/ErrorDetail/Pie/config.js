export default Immutable.fromJS({
    title: {
        text: '',
        x: 'center',
        left: 'center'
    },
    legend: {
        orient: 'vertical',
        data:[]
    },
    xAxis: [{ 
        show: false,
        // axisLine: { show: false },
        // axisTick: { show: false },
        // splitLine: { show: false }
    }],
    yAxis: [{ 
        show: false,
        // axisLine: { show: false },
        // axisTick: { show: false },
        // splitLine: { show: false }
    }],
    series: [
        {
            name:'',
            data:[ ]
        }
    ]
});