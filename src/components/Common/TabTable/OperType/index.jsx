import React from 'react';
import styles from './index.scss';

export default class OperType extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles['oper-type']}>{this.props.type || '--'}</div>
        );
    }
}