import echarts from 'echarts/lib/echarts';

export const blue = {
    grid: {
        borderWidth:0,
        x:0,
        x2:0,
        y: 0,
        y2:0
    },
    visualMap:{
         left: 20,
    },
    legend: {
        textStyle:{
            color: '#fff'
        },
    },
    textStyle:{
        color: '#ffffff',
    },
    dataRange: {
        color: ['#66dc6b','#ffec0c','#ff5252'],
        textStyle:{
            color: '#ffffff',
        },
    },
    map:{
        itemStyle: {
            normal: {
                areaColor: 'transparent',
                borderColor: '#5eb1e7'
            },
            emphasis: {
                areaColor: '#66dc6b'
            }
        }
    },
    backgroundColor: '#1d4471',
};

export const white = {
    grid: {
        borderWidth:0,
        x:0,
        x2:0,
        y: 0,
        y2:0
    },
    visualMap:{
         left: 20,
    },
    textStyle:{
        color: '#6c7480'
    },
    legend: {
        textStyle:{
            color: '#6c7480'
        },
    },
    dataRange: {
        color: ['#f27183','#ffe04d','#73e6bf'],
        textStyle:{
            color: '#6c7480'
        },
    },
    map:{
        itemStyle: {
            normal: {
                areaColor: '#e4e7eb',
                borderColor: '#fff'
            },
            emphasis: {
                areaColor: '#66dc6b'
            }
        }
    },
    backgroundColor: '#fff',
}
