import React from 'react';
import styles from './index.scss';

export default class Analysis extends React.Component {
    render() {
        const { props } = this.props;
        return (
            <div className={styles['analysis']}>
                <div className='tile-head'>不满意用户分析</div>
                <div className='tile-body'>
                    TODO
                </div>
            </div>
        );
    }
}