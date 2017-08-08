import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss'; 

const indicatorEnum = [{
    name: '错误数',
    key: 'errorCount'
}, {
    name: '错误页面数',
    key: 'wrongPageNum'
}, {
    name: '影响用户数', 
    key: 'effectedUserNum'
}, {
    name: '用户错误率',
    key: 'occurErrorUserRate'
}];

class KeyIndicator extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getKeyIndicator } = this.props;
        getKeyIndicator({
            metrics: JSON.stringify(['errorCount','wrongPageNum','effectedUserNum','occurErrorUserRate'])
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