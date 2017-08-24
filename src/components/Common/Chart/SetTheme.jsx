
import echarts from 'echarts/lib/echarts';
import {
    BarChart,
    LineChart,
    MapChart,
    PieChart,
    Chart
} from './EchartTheme/index';

import echartsColors from "../../../assets/styles/echartsColors";

window.UYUN = {
    getTheme() {
        console.log('getTheme()方法声明但是未定义');
    }
}

type theme = "default" | "white" | "blue"

export class setTheme {

    themes = [
        { name: "LineChart",value: LineChart },
        { name: "Chart", value: Chart },
        { name: "MapChart",  value: MapChart },
        { name: "PieChart",   value: PieChart },
        { name: "BarChart",     value: BarChart },
    ];
    theme:theme = "default";
    constructor(theme:theme){
        // console.log(theme)
        this.theme = theme != "white" ? "blue" : theme;
        this.setEchartTheme();
        window.UYUN.getTheme = this.getTheme.bind(this);
    }

    setEchartTheme(){
        this.themes.forEach((obj,index)=>{
            const {name,value} = obj;
            echarts.registerTheme(name, value[this.theme]);
        })
    }

    getTheme(name:string){
        if(!echartsColors[name]){
           throw `没有找到相对应的颜色变量 ···  请在theme 中设置对应 的 ${name} 颜色字段`;
        }
        return echartsColors[name][this.theme];
    }
}
