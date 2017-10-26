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
        let keyIndicator = this.props.keyIndicator;
        const indicatorEnumPC = [{
            name: locale('会话数'),
            key: 'sessionCount',
            value: _.isNull(keyIndicator['sessionCount']) ? '--' : keyIndicator['sessionCount'],
            tooltip: false
        }, {
            name: locale('访问量UV'),
            key: 'uv',
            value: _.isNull(keyIndicator['uv']) ? '--' : keyIndicator['uv'],
            tooltip: false
        }, {
            name: locale('平均访问页数'), 
            key: 'avgPVNum',
            value: _.isNull(keyIndicator['avgPVNum']) ? '--' : keyIndicator['avgPVNum'],
            tooltip:true,
            tooltipText: locale('平均每次访问浏览的页面数量，平均访问页数=浏览量/访问次数')
        }, {
            name: locale('平均点击数'),
            key: 'avgClickNum',
            value: _.isNull(keyIndicator['avgClickNum']) ? '--' : keyIndicator['avgClickNum'],
            tooltip: true,
            tooltipText: locale('平均每次访问点击的http可交互元素数量')
        },{
            name: locale('平均访问时长'),
            key: 'avgAccessTime',
            value: _.isNull(keyIndicator['avgAccessTime']) ? '--' : window.timeFormat(keyIndicator['avgAccessTime']),
            tooltip: true,
            tooltipText: locale('平均每次访问在网站上的停留时长')
        }];
        const indicatorEnumMobile = [{
            name: locale('启动次数'),
            key: 'sessionCount',
            value: _.isNull(keyIndicator['sessionCount']) ? '--' : keyIndicator['sessionCount']
        },{
            name: locale('独立设备数'),
            key: 'uv',
            value: _.isNull(keyIndicator['uv']) ? '--' : keyIndicator['uv']
        },{
            name: locale('点击数'),
            key: 'clickNum',
            value: _.isNull(keyIndicator['clickNum']) ? '--' : keyIndicator['clickNum']
        },{
            name: locale('平均访问时长'),
            key: 'avgAccessTime',
            value: _.isNull(keyIndicator['avgAccessTime']) ? '--' : window.timeFormat(keyIndicator['avgAccessTime'])            
        }];

        let indicatorEnum = platform == 'pc' ? indicatorEnumPC : indicatorEnumMobile
        return (
            <div className={styles['key-indicator']}>
                <div className={cls('tile-head')}>{locale('关键指标')}</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {indicatorEnum.map(item => (
                            <li key={item.name} className={platform == 'pc' ? styles['item'] :  styles['item-mobile']}>
                                <div className={styles['key']}>{item.name}
                                {item.tooltip && <Tooltip placement="bottom" title={item.tooltipText}>
                                <i className={cls('iconfont icon-bangzhu')}></i>
                                </Tooltip>}
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