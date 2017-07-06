import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import config from './config';

import styles from './index.scss';

class Quotas extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getTrend } = this.props;
        getTrend();
    }
    render() {
        const { pv = {}, uv = {}, clickNum = {}, avgRspTime = {}, errorCount = {} } = this.props.trend;
        const options = {};
        function random() {
            const arr = [];
            for (let i = 0, len = 24; i < len; i += 1) {
                arr.push(Math.floor(Math.random() * 10));
            }
            return arr;
        }
        const mockArr1 = random();
        const mockArr2 = random();
        ['pv', 'uv', 'clickNum', 'avgRspTime', 'errorCount'].forEach(type => {
            options[type] = config.get('default').mergeDeep(config.get(type))
                .setIn(['series', 0, 'data'], pv['today'])
                .setIn(['series', 1, 'data'], pv['yesterday']);
            // .setIn(['series', 0, 'data'], mockArr1)
            // .setIn(['series', 1, 'data'], mockArr2);
        });
        return (
            <div className={styles['quotas']}>
                <Row>
                    <Col span={8}>
                        <div className={cls('tile-head')}>浏览量 PV</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="pv" options={options.pv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>访问量 UV</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="uv" options={options.uv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>点击数</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="clickNum" options={options.clickNum.toJS()} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={cls('tile-head')}>平均响应时间</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="avgRspTime" options={options.avgRspTime.toJS()} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={cls('tile-head')}>错误数</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="errorCount" options={options.errorCount.toJS()} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Quotas;