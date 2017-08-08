import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss'; 

const indicatorEnum = [{
    name: '会话数',
    key: 'sessionCount'
}, {
    name: '访问量UV',
    key: 'uv'
}, {
    name: '平均访问页数', 
    key: 'avgPVNum'
}, {
    name: '平均点击数',
    key: 'avgClickNum'
},{
    name: '平均访问时长',
    key: 'avgAccessTime'
}];

class KeyIndicator extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getKeyIndicator } = this.props;
        getKeyIndicator({
            metrics: JSON.stringify(['sessionCount','uv','avgClickNum','avgAccessTime','avgPvNum'])
        });
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        
        let keyIndicator = this.props.keyIndicator;

        return (
            <div className={styles['key-indicator']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {indicatorEnum.map(item => (
                            <li key={item.name} className={styles['item']}>
                                <div className={styles['key']}>{locale(item.name)}</div>
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