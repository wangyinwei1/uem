import React from 'react';
import styles from './index.scss';

export default class HeaderBar extends React.PureComponent {
    render() {
        return (
            <div className={styles['header-bar']}>头部</div>
        );
    }
}