import React from 'react';
import styles from './index.scss';

export default class Analysis extends React.Component {
    render() {
        return (
            <div className={styles['analysis']}>
                <div className={cls('tile-head')}>错误分析</div>
                <div className={cls('tile-body')}>TODO</div>
            </div>
        );
    }
}