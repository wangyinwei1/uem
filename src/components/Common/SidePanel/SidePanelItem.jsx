import React from 'react';

// 详情页
import {
    PerformanceDetail,
    ErrorDetail,
    UserDetail
} from '../../../containers';
import styles from './index.scss';

export default class SidePanelItem extends React.Component {
    // state = {
    //     remove: false
    // }
    constructor(props) {
        super(props);

        this.module = props.module;
        this.closeSidePanel = this.closeSidePanel.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
            this.$dom = $(this.refs.SidePanel);
            this.$dom.addClass(styles['active']);
        }, 50);
        this.$win = $(window);
        this.$win.on('click', this.closeSidePanel);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.index === 0){
            this.$dom.removeClass(styles['active']);
            // setTimeout(() => {
            //     this.setState({
            //         remove: true
            //     });
            // }, 1000);
        }
    }
    componentWillUnmount() {
        this.$win.off('click', this.closeSidePanel);
    }
    closeSidePanel(e) {
        if ($(e.target).parents().hasClass(styles['side-panel-wrap']) || $(e.target).parents().hasClass('ant-table-tbody')) {
            
        } else {
            setTimeout(() => {
                this.$dom.removeClass(styles['active']);
            }, 50);
        }
    }
    renderDetail(module, data, index) {
        const tag = index === 0 ? false : true;
        const components = {
            performance_browse: <PerformanceDetail data={data} type='browse' tag={tag} itemId={this.props.itemId} />,
            performance_interactive: <PerformanceDetail data={data} type='interaction' tag={tag} itemId={this.props.itemId} />,
            error_table: <ErrorDetail data={data} tag={tag} itemId={this.props.itemId} />,
            user_table: <UserDetail data={data} tag={tag} itemId={this.props.itemId} />,
        };
        return components[module];
    }
    render() {
        const { index } = this.props;
        // if (this.state.remove) {
        //     return null;
        // } else {
            return (
                <div ref='SidePanel' className={cls(styles['side-panel-item'])}>
                    {this.renderDetail(this.module, this.props.data, index)}
                </div>
            );
        // }
    }
}