import React from 'react';
import styles from './index.scss';

export default class SidePanel extends React.Component {
    state = {
        mounted: false
    }
    componentDidMount() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({
                mounted: true
            });
        }, 50);
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    render() {
        const { index, data } = this.props;
        return (
            <div className={cls(styles['side-panel'], {
                [styles['next']]: data.length === 2 && index === 0 || data.length === 2 && index === 1 && this.state.mounted || data.length === 1 && this.state.mounted,
                [styles['prev']]: data.length === 2 && index === 0 && this.state.mounted
            })}>
                {this.props.children}
            </div>
        );
    }
}