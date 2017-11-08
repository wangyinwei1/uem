import { ModalChart } from '../../Common'
import React from "react"
// import { override } from 'core-decorators';

export default class ErrorModalChart extends ModalChart {
    state = {
        // 组件内的一些状态
    }
    constructor(props){
        super(props)
    }

    displayModalChart(){
        let maxQuota = this.seriesDatasLocal ? Math.max.apply(null, this.seriesDatasLocal) : 100;
        let maxPageNum = Math.ceil(this.total / 10);
        let currentPage = this.state.defaultCurrent;
        let total = this.total;
        const theme = this.props.theme;
        if(currentPage < maxPageNum){
            this.state = {
                ...this.state,
                option : this.config.mergeDeep(Immutable.fromJS({
                    yAxis: [
                        {data: this.yAxisDatasLocal.slice((currentPage - 1) * 10, currentPage * 10).reverse()},
                        {data: this.seriesDatasLocal.slice((currentPage - 1) * 10, currentPage * 10).reverse()}
                    ],
                    series: [
                        {
                            name: this.pillarState == 'sessionCount' ? '会话数' : '访客数',
                            itemStyle: {
                                normal:{
                                    color: function (value) {
            
                                        let opacity = Number((value.data / maxQuota).toFixed(2)) * (1 - 0.5) + 0.5;
                                        return themeChange('overviewPillarColor',theme) + opacity + ")"
                                        // // return '#fff';
                                        // console.log(value)
                                    }
                                }
                            },
                            data:this.seriesDatasLocal.slice((currentPage - 1) * 10, currentPage * 10).reverse()
                        },
                    ]
                })).toJS()

            }
        } else if( currentPage = maxPageNum ){
            this.state ={
                ...this.state,
                option: this.config.mergeDeep(Immutable.fromJS({
                    yAxis:[
                        {data:maxPageNum > 1 ? this.yAxisDatasLocal.slice((currentPage - 1) * 10, total).reverse() : this.yAxisDatasLocal.reverse()},
                        {data: maxPageNum > 1 ? this.seriesDatasLocal.slice((currentPage - 1) * 10, total).reverse() : this.seriesDatasLocal.reverse()}
                    ],
                    series: [{
                        name: this.pillarState == 'sessionCount' ? '会话数' : '访客数',
                        itemStyle: {
                            normal: {
                                color: function (value) {
                                    let opacity = Number((value.data / maxQuota).toFixed(2)) * (1 - 0.5) + 0.5;
                                    return themeChange('overviewPillarColor',theme) + opacity + ")"
                                }
                            }
                        },
                        data: maxPageNum > 1 ? this.seriesDatasLocal.slice((currentPage - 1) * 10, total).reverse() : this.seriesDatasLocal.reverse()
                    }]
                })).toJS()
            }
        } else {
            this.state ={
                ...this.state,
                option: this.config.mergeDeep(Immutable.fromJS({
                    series: []
                })).toJS()
            }
        }
        if(this.echart){
            this.echart.setOption(this.state.option)
        }

    }
}




