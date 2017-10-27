import React from 'react';
import styles from './index.scss';

export default class BaseInfo extends React.Component {
    list = [{
        label: '用户ID',
        value: 'displayName'
    }]
    render() {
        return (
            <div className={styles['base-info']}>
                <div className={cls('tile-body', styles['list'])}>
                    {this.list.map(item => <div key={item.value}>{`${locale(item.label)}：${this.props[item.value]}`}</div>)}
                </div>
            </div>
        );
    }
}