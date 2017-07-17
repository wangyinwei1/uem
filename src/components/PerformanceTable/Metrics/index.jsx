import React from 'react';
import styles from './index.scss';

export default class Metrics extends React.Component {
    render() {
        return (
            <div className={styles['metrics']}>
                <pre>
                    {JSON.stringify(this.props.data, null, 2)}
                </pre>
            </div>
        );
    }
}