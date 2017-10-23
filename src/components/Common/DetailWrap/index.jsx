import React from 'react';
import styles from './index.scss';

export default class DetailWrap extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles['detail-wrap']}>
               <i id='hideBtn' className={cls('iconfont icon-anonymous-iconfont',{'fr': true},styles['hideBtn'])}></i>
                <div className={styles['detail-content']}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}