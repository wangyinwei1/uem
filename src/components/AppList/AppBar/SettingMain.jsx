import React from 'react';
import echarts from 'echarts';
import 'echarts/map/js/china';
import styles from './index.scss';
// require('echarts/lib/chart/map');
// require('echarts/map/js/china');
// // require('echarts/map/js/world');
// require('echarts/map/js/province/beijing');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');



function ipValidator(ip) {
    if (ip == "") {
        return true
    } else {
        let ipRegex = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/g
        return ipRegex.test(ip)
    }
}
export class SettingMain extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let myChart = echarts.init(document.getElementById('setting-map'),'map');
        // debugger
        this.myChart = myChart;
        myChart.setOption({
            series: [{
                name: 'ip',
                type: 'map',
                selectedMode: 'single',
                mapType: 'china',
                data: [{
                    name: '浙江',
                    selected: true
                }]
            }]
        });
        myChart.on('click', function(params) {

        })
    }
    onAdd(){

    }
    onDelete(){

    }
    onchange(){

    }
render(){
    if (this.myChart) {
            // const data = status === 0 ? [] : [{
            //     name: curProvince,
            //     selected: true
            // }]
            this.myChart.setOption({
                series: [{
                    name: 'ip',
                    type: 'map',
                    selectedMode: 'single',
                    mapType: 'china',
                    data: []
                }]
            })
    }
    return (
        <div className={styles['setting-modal']}>
            <div id='setting-map'></div>
            <div className={styles['tab-content']}>
            表格
            </div>
        </div>
    )
}

}