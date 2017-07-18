import React from 'react';
import styles from './index.scss';

export default class ColorType extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <i className={cls(styles['color-type'], styles[`color-type${this.props.type}`])}>{this.props.type}</i>
        );
    }
}