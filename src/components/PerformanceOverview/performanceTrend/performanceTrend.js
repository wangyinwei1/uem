import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import config from './config';

// import styles from './index.scss';

class PerformanceTrend extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getPerformanceTrend } = this.props;
        getPerformanceTrend();
    }
    render() {
        const { performanceTrend } = this.props.performanceTrend;
        let options = {};
        // function random() {
        //     const arr = [];
        //     for (let i = 0, len = 24; i < len; i += 1) {
        //         arr.push(Math.floor(Math.random() * 10));
        //     }
        //     return arr;
        // }
        // const mockArr1 = random();
        // const mockArr2 = random();
        ['avgRspTime','pv','clickNum'].forEach(type =>{ 
            options[type] = config.get('default').mergeDeep(config.get(type))
            .setIn(['series', 0, 'data'], performanceTrend[type]).toJS()
         });
        
        // .setIn(['series', 0, 'data'], mockArr1)
        // .setIn(['series', 1, 'data'], mockArr2);

        return (
            <div>
                <Row>
                    <Col span={8}>
                        <div className={cls('tile-head')}>性能趋势</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="PerformanceTrend" chartId="PerformanceTrend" options={options} />
                        </div>
                    </Col>
                    <Col>111</Col>
                </Row>
                
            </div>
        );
    }
}

export default PerformanceTrend;