import React from 'react';
import styles from './index.scss';

export default class BaseInfo extends React.Component {
    render() {
        return (
            <div className={styles['base-info']}>
                <div className={cls('tile-body')}>TODO</div>
            </div>
        );
    }
}