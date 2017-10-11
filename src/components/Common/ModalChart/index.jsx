import React from 'react'
import { Map, is, fromJS } from 'immutable'
import modalChartConfig from './config'
import { Radio, Modal, Button, Pagination } from 'antd'
import styles from './index.scss'
import { countryNameInCN, countryNameInEN } from '../Chart/WorldCountryName'

export default class ModalChart extends React.Component {
    // static defaultProps ={
    // yAxisDatas: [],
    // seriesDatas: [],
    // total: 1
    // }
    pillarState = 'avgRspTime';
    mapState = 'china';
    isFirstShowModal = true;
    // state = { modalVisible: false, defaultCurrent: 1 };
    echart = null;
    total = 1;
    yAxisDatas = [];
    seriesDatas = [];
    config = modalChartConfig;
    constructor(props) {
        super(props);
        this.state = { 
            modalVisible: false, 
            defaultCurrent: 1 
        };
        this.componentWillReceiveProps(props);

    }

    componentWillReceiveProps(nextprops) {
        let yAxisTemp = nextprops.mapData.yAxis;
        if(nextprops.mapStatus && nextprops.mapStatus == 'world'){
            for(let i =0, len = yAxisTemp.length; i< len; i++ ){
                for(let n in countryNameInEN){
                    if( yAxisTemp[i] == countryNameInEN[n]){
                        yAxisTemp[i] = countryNameInCN[n];
                    }
                }
            }
            this.yAxisDatasLocal = yAxisTemp;
        } else{
            this.yAxisDatasLocal = nextprops.mapData.yAxis;
        }
        this.seriesDatasLocal = nextprops.mapData.series;
        this.total = nextprops.mapData.total;
        this.pillarState = nextprops.pillarState;
        this.displayModalChart();

        // if (this.echart) {
        //     this.echart.setOption(this.state.option);
        // }
    }

    displayModalChart(){
        // 子组件里重写
    }

    handleModalCancel = (e) => {
        this.setState({
            modalVisible: false
        }, () => this.onChange(1) );
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        },() => this.onChange(1))
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
            'avgRspTime': locale('平均响应时间'),
            'apdex': 'Apdex',
            'occurErrorUserRate': locale('用户错误率'),
            'effectedUserNum' : locale('影响用户数'),
            'sessionCount': locale('会话数'),
            'uv':locale('访客数'),
            'userDistribution': locale('用户分布数据')
        }
        // console.log('-----config', modalChartConfig);
        return (
           <div className={styles["modal-chart"]}>
                {/* {this.total > 10 && <div onClick={this.showModal} className={styles['check-all']}>{locale('查看全部')}</div>} */}
                <div onClick={this.showModal} className={styles['check-all']}>{locale('查看全部')}</div>
                <Modal
                    title={pillarStateEnum[this.pillarState]}
                    className={styles['modalChart-pillar']}
                    visible={this.state.modalVisible}
                    footer={null}
                    onCancel={this.handleModalCancel}
                    wrapClassName='webModal'
                >
                    <div id="modal-chartPillar" style={{height: 542}}></div>
                    <Pagination defaultCurrent={1} current={this.state.defaultCurrent}  total={this.total} onChange={this.onChange.bind(this)} />
                </Modal>
            </div> 
        )
    }

}
