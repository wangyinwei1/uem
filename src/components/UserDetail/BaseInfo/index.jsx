import React from 'react';
import styles from './index.scss';

export default class BaseInfo extends React.Component {
    list = [{
        label: '用户名：',
        value: 'displayName'
    }, {
        label: '用户ID：',
        value: 'userId'
    }]
    render() {
        return (
            <div className={styles['base-info']}>
                <div className={cls('tile-body', styles['list'])}>
                    {this.list.map(item => <div>{`${item.label}${this.props[item.value]}`}</div>)}
                </div>
            </div>
        );
    }
}