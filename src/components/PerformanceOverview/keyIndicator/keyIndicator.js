import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss'; 

const indicatorEnum = [{
    name: '平均响应时间',
    key: 'avgRspTime'
}, {
    name: '平均与服务端建立网络连接时间',
    key: 'avgNetworkTime'
}, {
    name: '平均服务端处理请求和数据传输时间', // ?
    key: 'avgServerTime'
}, {
    name: '平均客户端和渲染时间',
    key: 'avgClientTime'
}];

class KeyIndicator extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getKeyIndicator } = this.props;
        getKeyIndicator({startTime: moment().subtract(this.props.startTime.type, this.props.startTime.units).valueOf()});
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        
        let keyIndicator = this.props.keyIndicator;

        return (
            <div className={styles['key-indicator']}>
                <div className={cls('tile-head')}>关键指标</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {indicatorEnum.map(item => (
                            <li key={item.name} className={styles['item']}>
                                <div className={styles['key']}>{item.name}</div>
                                <div className={cls('toe', styles['value'])}>{_.isNull(keyIndicator[item.key]) ? '--' : keyIndicator[item.key]}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default KeyIndicator;