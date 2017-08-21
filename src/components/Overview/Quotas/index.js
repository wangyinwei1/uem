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
    quotasMobile(){
        // 后端字段未定，这里用的还是pc端的字段名称。
        const options={};
        ['avgRspTime','clickNum','errorCount','pv','uv'].forEach(type => {
            options[type]= config.get('default').mergeDeep(config.get(type))
            .setIn(['series', 0, 'data'], this.props.trend[type]['today'])
            .setIn(['series', 1, 'data'], this.props.trend[type]['yesterday']);
        })
        return (
            <div className={styles['quotas']}>
                <Row>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('启动次数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="pv" options={options.pv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('点击数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="uv" options={options.uv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('平均UI响应时间')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="clickNum" options={options.clickNum.toJS()} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('平均HTTP响应时间')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="avgRspTime" options={options.avgRspTime.toJS()} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('错误数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="errorCount" options={options.errorCount.toJS()} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    render() {
        const { trend } = this.props;
        const options = {};
        ['pv', 'uv', 'clickNum', 'avgRspTime', 'errorCount'].forEach(type => {
            options[type] = config.get('default').mergeDeep(config.get(type))
                .setIn(['series', 0, 'data'], trend[type]['today'])
                .setIn(['series', 1, 'data'], trend[type]['yesterday']);
        });
        // const optionsMobile = {};
        // ['']
        return (          
            sessionStorage.getItem('UEM_platform') !== 'pc' ?  
                this.quotasMobile() :    
                <div className={styles['quotas']}>
                <Row>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('浏览量PV')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="pv" options={options.pv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('访问量UV')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="uv" options={options.uv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('点击数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="clickNum" options={options.clickNum.toJS()} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('平均响应时间')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="avgRspTime" options={options.avgRspTime.toJS()} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('错误数')}</div>
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