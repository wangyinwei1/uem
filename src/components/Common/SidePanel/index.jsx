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
        const $panel = $('J_side-panel');
        $panel.addClass('prev')
    }
    render() {
        const { index, currentRow, data } = this.props;
        return (
            <div className={cls('J_side-panel', styles['side-panel'], {
                //'next': currentRow.length === 2 && index === 0 || currentRow.length === 2 && index === 1 && this.state.mounted || currentRow.length === 1 && this.state.mounted,
                //'prev': currentRow.length === 2 && index === 0 && this.state.mounted
            })}>
                {this.props.children}
            </div>
        );
    }
}