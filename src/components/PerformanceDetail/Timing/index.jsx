import React from 'react';
import styles from './index.scss';

export default class Timing extends React.Component {
    render() {
        const { props } = this.props;
        return (
            <div className={styles['timing']}>
                <div className='tile-head'>响应时间分解图</div>
                <div className='tile-body'>
                    TODO
                </div>
            </div>
        );
    }
}