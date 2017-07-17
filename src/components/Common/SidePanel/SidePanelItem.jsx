import React from 'react';

// 详情页
import {
    PerformanceDetail,
    ErrorDetail,
    UserDetail
} from '../../../containers';
import styles from './index.scss';

export default class SidePanelItem extends React.Component {
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
        }
    }
    componentWillUnmount() {
        this.$win.off('click', this.closeSidePanel);
    }
    closeSidePanel(e) {
        if ($(e.target).parents().hasClass(styles['side-panel-item']) || $(e.target).parents().hasClass('ant-table-tbody')) {
            
        } else {
            setTimeout(() => {
                this.$dom.removeClass(styles['active']);
            }, 50);
        }
    }
    renderDetail(module, data) {
        const components = {
            performance_browse: <PerformanceDetail data={data} />,
            performance_interactive: <PerformanceDetail data={data} />,
            error_table: <ErrorDetail data={data} />,
            user_table: <UserDetail data={data} />,
        };
        return components[module];
    }
    render() {
        return (
            <div ref='SidePanel' className={cls(styles['side-panel-item'])}>
                <pre>
                    {JSON.stringify(this.props.data, null, 4)}
                </pre>
                {this.renderDetail(this.module, this.props.data)}
            </div>
        );
    }
}