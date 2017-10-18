export default Immutable.fromJS({
    title: {
        text: '',
        // x: 'center',
        // left: 'center',
        top: 25,
        left: 40
    },
    legend: {
        orient: 'vertical',
        // align: 'left',
        x: 'middle',
        y:'center',
        left: 170,
        icon: 'circle',
        data:[]
    },
    grid: { x:10,y:-20,x2:0,y2:0 },
    tooltip: {
        trigger: 'item',
        width: 10,
        textStyle: {
            color: '#fff'
        },
        formatter: function(params,ticket, callback){
            return pieTooltipFormatter(params, ticket, callback);
        },
        position: 'right'
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
            type: 'pie',
            center:['87','center'],
            radius: ['30%', '42%'],
            avoidLabelOverLap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis : {
                    show: false,
                    textStyle: {
                        fontSize: '13',
                        // fontWeight: 'bold'
                    }
                }    
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[ ]
        }
    ]
});

function pieTooltipFormatter(params, ticket, callback){
    const number =  params.value.length == 0  ?  0 : params.value;
    const nParamsname = params.name.indexOf('...') == -1 ? params.name : params.data.Nname;
    if(params.data.child && params.data.child.length > 0){
        const nName = nParamsname.split(' ')[0];
        return `<ul style="padding:6px 8px">
            <li>${nName} </li>
            ${params.data.child.map((val,index)=>{
                return `
                <li style="margin-top:5px;">
                    <span style="background:${params.color};display:inline-block;height:10px;width:10px;border-radius:50%"></span>
                    <span style="margin-left:5px">${ params.data.name != val.name ? val.name : params.data.name }</span>
                    <span style="margin-left:5px">${val.value == null ? UEM_i18n.no_data[UEM_lang] : (val.percent*100).toFixed(1) }%</span>
                </li>`
            }).join('')}
        </ul>`;
    }
    return `
        <ul style="padding:6px 8px">
             <li style="margin-top:5px;">${ nParamsname }</li>
             <li style="margin-top:5px;">${locale('百分比')}：${ params.percent }%</li>
             <li style="margin-top:5px;">${locale('次数')}：${ number} ${locale('次')}</li>
        </ul>`;
}