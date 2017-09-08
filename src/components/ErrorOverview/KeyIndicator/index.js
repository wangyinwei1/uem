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
            metrics: JSON.stringify(['errorCount','wrongPageNum','effectedUserNum','occurErrorUserRate']),
        });
    }
    // componentWillReceiveProps(nextProps) {
    //     if(this.props.version !== nextProps.version){
    //         nextProps.getKeyIndicator({
    //             metrics: JSON.stringify(['errorCount','wrongPageNum','effectedUserNum','occurErrorUserRate']),
    //             version: nextProps.version
    //         });
    //     }
        
    // }

    render() {
        
        let keyIndicator = this.props.keyIndicator;
        const indicatorEnum = [{
            name: '错误数',
            key: 'errorCount',
            value: _.isNull(keyIndicator['errorCount']) ? '--' : keyIndicator['errorCount'],
            tooltip: false
        }, {
            name: '影响用户数', 
            key: 'effectedUserNum',
            value: _.isNull(keyIndicator['effectedUserNum']) ? '--' : keyIndicator['effectedUserNum'],
            tooltip: false            
        }, {
            name: '用户错误率',
            key: 'occurErrorUserRate',
            value: _.isNull(keyIndicator['occurErrorUserRate']) ? '--' : parseFloat(keyIndicator['occurErrorUserRate'] * 100).toFixed(1) + '%',
            tooltip: true,
            tooltipText: '出错用户数/UV'
        }];

        return (
            <div className={styles['key-indicator']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {indicatorEnum.map(item => (
                            <li key={item.name} className={styles['item']}>
                                <div className={styles['key']}>{locale(item.name)}
                                {
                                    item.tooltip && <Tooltip placement="bottom" title={item.tooltipText}>
                                        <i className={cls('iconfont icon-bangzhu')}></i>
                                    </Tooltip>
                                }
                                </div>
                                <div className={cls('toe', styles['value'])}>{item.value}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default KeyIndicator;