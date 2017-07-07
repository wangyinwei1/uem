import React, { Component } from 'react';
import echarts from 'echarts';

import '../../../assets/maps/china';
import '../../../assets/maps/world';

// 全局图表配置
const globalOptions = Immutable.fromJS({
    title: {
        textStyle: {
            color: '#70c3fb',
            fontSize: 12
        },
        left: 15,
        top: 15
    },
    legend: {
        itemWidth: 8,
        itemHeight: 8,
        top: 15,
        right: 15,
        textStyle: {
            color: '#fff'
        }
    },
    grid: {
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true
    },
    xAxis: {
        axisLine: {
            lineStyle: {
                color: '#70c3fb'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#236592'
            }
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#70c3fb'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#236592'
            }
        }
    },
    color: ['#195d95', '#1767a2', '#1470ae', '#1275b5', '#0e83c7', '#0a90d6', '#0997de', '#03a9f5'].reverse(),
    tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.7)',
        textStyle: {
            color: '#fff'
        },
        // formatter: formatterFoo,
        axisPointer: {
            type: 'shadow',
            shadowStyle: {
                color: 'rgba(0, 0, 0, .1)'
            }
        }
    }
});

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.chartId = props.chartId;
        this.className = props.className;
        this.options = props.options;
        this.group = props.group;
        this.customOptions = Immutable.fromJS(props.options || {});
    }
    componentDidMount() {
        if (!this.chartId) {
            console.log(this.chartId)
            throw new Error('chartID 未定义!');
        }
        this.chartDom = echarts.init(document.getElementById(this.chartId));
        // this.chartDom.showLoading('default', {
        //     text: '载入中...',
        //     color: '#fff',
        //     textColor: '#fff',
        //     maskColor: 'rgba(0, 0, 0, 0)',
        //     zlevel: 0
        // });
        if (this.group) {
            // 图表联动
            this.chartDom.group = this.group;
            // echarts.connect(this.group);
        }
        this._setOption();
        console.log(`[${this.type}]: #${this.chartId} 已渲染`);
        $(window).on('resize', this._resizeChart.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        this.chartDom.setOption(Immutable.fromJS(this._mergeOptions()).mergeDeep(nextProps.options).toJS());
    }
    componentWillUnmount() {
        $(window).off('resize', this._resizeChart.bind(this));
    }
    _resizeChart() {
        this.chartDom.resize();
    }
    _mergeOptions() {
        return globalOptions.mergeDeep(this.defaultOptions.mergeDeep(this.options)).toJS();
    }
    _setOption() {
        console.log(this.defaultOptions.mergeDeep(this.options).toJS())
        this.chartDom.setOption(this._mergeOptions());
        // setTimeout(() => {
        //     this.chartDom.hideLoading();
        // }, 3000);
    }
    draw() {
        return (
            <div id={this.chartId} className={cls('chart', this.className)}></div>
        );
    }
    render() {
        return this.draw();
    }
}

export default Chart;