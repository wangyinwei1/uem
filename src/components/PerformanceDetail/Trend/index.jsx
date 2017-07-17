import React from 'react';
import styles from './index.scss';

export default class Trend extends React.Component {
    render() {
        const { props } = this.props;
        return (
            <div className={styles['trend']}>
                <div className='tile-head'>趋势图</div>
                <div className='tile-body'>
                    TODO
                </div>
            </div>
        );
    }
}