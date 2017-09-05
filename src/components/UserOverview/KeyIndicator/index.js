import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss'; 

class KeyIndicator extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getKeyIndicator } = this.props;
        getKeyIndicator({
            metrics: JSON.stringify(['sessionCount','uv','avgClickNum','avgAccessTime','avgPvNum',"clickNum"])
        });
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        const platform = sessionStorage.getItem('UEM_platform');
        const indicatorEnumPC = [{
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
        const indicatorEnumMobile = [{
            name: '启动次数',
            key: 'sessionCount'
        },{
            name: '独立设备数',
            key: 'uv'
        },{
            name: '点击数',
            key: 'clickNum'
        },{
            name: '平均访问时长',
            key: 'avgAccessTime'
        }];
        let keyIndicator = this.props.keyIndicator;
        let indicatorEnum = platform == 'pc' ? indicatorEnumPC : indicatorEnumMobile
        return (
            <div className={styles['key-indicator']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {indicatorEnum.map(item => (
                            <li key={item.name} className={platform == 'pc' ? styles['item'] :  styles['item-mobile']}>
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