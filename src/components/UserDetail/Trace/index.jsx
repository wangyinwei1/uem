import React from 'react';
import styles from './index.scss';
import {
    UserTrace
} from '../../Common';

export default class Trace extends React.Component {
    render() {
        const { data = [] } = this.props;
        return (
            <div className={styles['trace']}>
                {data.map(item => <UserTrace key={item.baseInfo.sessionId+Math.random(1,1000)} data={item} />)}
            </div>
        );
    }
}