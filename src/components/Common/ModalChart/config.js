export default Immutable.fromJS({
        title: { text: '' },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                // textStyle: {
                //     color: 'rgba(0,0,0,0)'
                // }
            }
        },
        legend: {
            data: []
        },
        grid: {
            right: '5%',
            bottom: '10%',
            left: 50,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { textStyle: { color: '#fff' } },
            minInterval : 1
        },
        yAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                axisLine: { lineStyle: { color: '#3479b0' } },
                axisLabel: { textStyle: { color: '#fff', baseline: 'bottom' } },
                offset: 40,
                // data: this.yAxisDatasLocal.slice((currentPage - 1) * 10, currentPage * 10).reverse()
                data: []
            },
            {
                type: 'category',
                axisTick: { show: false },
                axisLine: { lineStyle: { color: '#3479b0' } },
                axisLabel: { textStyle: { color: '#fff', baseline: 'bottom' } },
                position: 'left',
                // data: this.seriesDatasLocal.slice((currentPage - 1) * 10, currentPage * 10).reverse()
                data: []
            }
        ],
        // series: nextprops.seriesDatas,
        series: [{
            // name: this.pillarState == 'avgRspTime' ? UEM_i18n.average_response_time[UEM_lang] : 'Apdex',
            name: '',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                normal: {
                    // color: function (value) {
                    //     let pillarColor;
                    //     pillarColor = value.seriesName == UEM_i18n.average_response_time[UEM_lang] ? UYUN.getTheme('performance-pillar2') : UYUN.getTheme('performance-pillar1');
                    //     let opacity = Number((value.data / maxUv).toFixed(2)) * (1 - window.color_Opacity) + window.color_Opacity;
                    //     return pillarColor + opacity + ")"
                    // }
                    color: '#fff'
                }
            },
            // data: this.seriesDatasLocal.slice((currentPage - 1) * 10, currentPage * 10).reverse()
            data: []
        }]
})