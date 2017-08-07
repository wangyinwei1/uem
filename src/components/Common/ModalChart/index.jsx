import React from 'react'
import { Map, is, fromJS } from 'immutable'
import modalChartConfig from './config'
import { Radio, Modal, Button, Pagination } from 'antd'
import styles from './index.scss'

export default class ModalChart extends React.Component {
    // static defaultProps ={
    // yAxisDatas: [],
    // seriesDatas: [],
    // total: 1
    // }
    pillarState = 'avgRspTime';
    isFirstShowModal = true;
    state = { modalVisible: false, defaultCurrent: 1 };
    echart = null;
    total = 1;
    yAxisDatas = [];
    seriesDatas = [];
    config = modalChartConfig;
    constructor(props) {
        super(props);
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(nextprops) {
        this.seriesDatasLocal = nextprops.mapData.series;
        this.yAxisDatasLocal = nextprops.mapData.yAxis;
        this.total = nextprops.mapData.total;
        // let maxUv = nextprops.mapData.series ? Math.max.apply(null, nextprops.mapData.series) : 100;
        // let maxPageNum = Math.ceil(nextprops.mapData.total / 10);
        this.pillarState = nextprops.pillarState;
        this.displayModalChart();
        if (this.echart) {
            this.echart.setOption(this.state.option);
        }
    }

    displayModalChart(){
        // 子组件里重写
        debugger
    }

    handleModalCancel = (e) => {
        this.setState({
            modalVisible: false
        }, () => this.onChange(1) );
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    onChange(page){
        this.setState({
            defaultCurrent: page
        }, () => this.displayModalChart())
    }

    componentDidUpdate() {
        if (this.state.modalVisible && this.isFirstShowModal) {
            this.isFirstShowModal = false;
            var echarts = require('echarts');
            this.echart = echarts.init(document.getElementById('modal-chartPillar'));
            this.echart.setOption(this.state.option);
        }
    }

    render(){

        const pillarStateEnum = {
            'avgRspTime': '平均响应时间',
            'apdex': 'Apdex',
            'occurErrorUserRate': '用户错误率',
            'effectedUserNum' : '影响用户数',
            'sessionCount': '会话数',
            'uv':'访客数',
            'userDistribution': '用户分布数据'
        }
        // console.log('-----config', modalChartConfig);
        return (
           <div className={styles["modal-chart"]}>
                <div onClick={this.showModal} className={styles['check-all']}>查看更多>></div>
                <Modal
                    title={pillarStateEnum[this.pillarState]}
                    className={styles['modalChart-pillar']}
                    visible={this.state.modalVisible}
                    footer={null}
                    onCancel={this.handleModalCancel}
                >
                    <div id="modal-chartPillar" style={{height: 542}}></div>
                    <Pagination defaultCurrent={1}  current={this.state.defaultCurrent}  total={this.total} onChange={this.onChange.bind(this)} />
                </Modal>
            </div> 
        )
    }

}
