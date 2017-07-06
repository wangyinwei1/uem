import React from 'react';
import styles from './index.scss';

import DatePicker from "../../Public/components/MomentPicker/DatePicker";

export default class HeaderBar extends React.PureComponent {
    datePickerDisplay = {
        app_list: false,
        overview: false,
        performance_overview: true,
        error_overview: true,
        user_overview: true,
        performance_browse: true,
        performance_interactive: true,
        error_table: true,
        user_table: true,
        heatmap_list: false,
        setting: false
    }
    dateSetting = [
        { text: '1月', value: 1, type: 'months' },
        { text: '7天', value: 7, type: 'days' },
        { text: '3天', value: 3, type: 'days' },
        { text: '1天', value: 1, type: 'days' },
        { text: '12小时', value: 12, type: 'hours' },
        { text: '6小时', value: 6, type: 'hours' },
        { text: '1小时', value: 1, type: 'hours' },
    ]
    constructor(props) {
        super(props);

        this.takeDefaultValue = this.takeDefaultValue.bind(this);
    }
    handleSelectTime(obj) {
        const { type, units } = obj;
        const timeType = `${type}${units}`;

        clearTimeout(this.timer);
        // 防止 DatePicker 组件触发两次 onChange 事件
        this.timer = setTimeout(() => {
            this.props.chooseTimeType({timeType});
        }, 0);
    }
    takeDefaultValue() {
        switch(this.props.timeType) {
            case '1months':
                return '最近 1月';
            case '7days':
                return '最近 7天';
            case '3days':
                return '最近 3天';
            case '1days':
                return '最近 1天';
            case '12hours':
                return '最近 12小时';
            case '6hours':
                return '最近 6小时';
            case '1hours':
                return '最近 1小时';
            default:
                return '最近 1小时'
        }
    }
    render() {
        const { module } = this.props;
        return (
            <div className={styles['header-bar']}>
                <DatePicker
                    format="YYYY-MM-dd"
                    dateObj={this.dateSetting}
                    onChange={this.handleSelectTime.bind(this)}
                    defaultValue={this.takeDefaultValue()}
                    className={cls(styles['date-picker'], {
                        'dn': !this.datePickerDisplay[module]
                    })}
                />
            </div>
        );
    }
}