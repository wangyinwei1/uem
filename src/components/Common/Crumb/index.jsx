import React from 'react';
import styles from './index.scss';

export default class Crumb extends React.PureComponent {
    crumbText = {
        app_list: '所有应用',
        overview: '今日概况',
        performance_overview: '性能概况',
        error_overview: '错误概况',
        user_overview: '用户概况',
        performance_browse: '页面浏览',
        performance_interactive: '页面交互',
        error_table: '错误跟踪',
        user_table: '用户轨迹',
        heatmap_list: '热力图',
        setting: '设置'
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles['crumb']}>{locale(this.crumbText[this.props.module])}</div>
        );
    }
}
