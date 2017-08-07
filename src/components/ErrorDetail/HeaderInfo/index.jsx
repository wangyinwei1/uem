import React from 'react';
import styles from './index.scss';

export default class headerInfo extends React.Component {
    indexEnum = [
        { label: '最近发生时间：' ,value: 'lastTime' },
        { label: '首次发生时间：', value: 'firstTime' },
        { label: '发生界面：', value: 'firstPage' }
    ]

    render() {
        return (
            <div className={styles['base-info']}>
                <div className={cls('tile-body')}>
                    {this.indexEnum.map(item => <div className={styles['title-body-inner']} key={item.value}>{`${locale(item.label)}${this.props[item.value]}`}</div>)}
                </div>
            </div>
        );
    }
}