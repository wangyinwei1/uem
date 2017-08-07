import React from 'react';
import styles from './index.scss';

import DatePicker from "../../Public/components/MomentPicker/DatePicker";
// import DateContainer from "../../Public/DatePicker/DateContainer";

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
        { text: locale('1月'), value: 1, type: 'months' },
        { text: locale('7天'), value: 7, type: 'days' },
        { text: locale('3天'), value: 3, type: 'days' },
        { text: locale('1天'), value: 1, type: 'days' },
        { text: locale('12小时'), value: 12, type: 'hours' },
        { text: locale('6小时'), value: 6, type: 'hours' },
        { text: locale('1小时'), value: 1, type: 'hours' },
    ]
    constructor(props) {
        super(props);

        this.takeDefaultValue = this.takeDefaultValue.bind(this);
    }
    handleSelectTime(obj) {
        const startTime = {
            type: 0,
            units: 'milliseconds'
        }, endTime = {
            type: 0,
            units: 'milliseconds'
        };

        if (obj.type === 'custom') {
            startTime.type = moment().valueOf() - obj.beginTime.valueOf();
            endTime.type = moment().valueOf() - obj.endTime.valueOf();
        } else {
            const { type, units } = obj;
            startTime.type = type;
            startTime.units = units;
        }

        clearTimeout(this.timer);
        // 防止 DatePicker 组件触发两次 onChange 事件
        this.timer = setTimeout(() => {
            this.props.chooseTimeType({
                timeType: {
                    startTime: startTime,
                    endTime: endTime
                }
            });
        }, 0);
    }
    takeDefaultValue() {
        const { startTime, endTime } = this.props.timeType;
        const { type, units } = startTime;
        switch (`${type}${units}`) {
            case '1months':
                return `${locale('最近')} ${locale('1月')}`;
            case '7days':
                return `${locale('最近')} ${locale('7天')}`;
            case '3days':
                return `${locale('最近')} ${locale('3天')}`;
            case '1days':
                return `${locale('最近')} ${locale('1天')}`;
            case '12hours':
                return `${locale('最近')} ${locale('12小时')}`;
            case '6hours':
                return `${locale('最近')} ${locale('6小时')}`;
            case '1hours':
                return `${locale('最近')} ${locale('1小时')}`;
            default:
                return `${moment().subtract(startTime.type, startTime.units).format('YYYY-MM-DD')} ~ ${moment().subtract(endTime.type, endTime.units).format('YYYY-MM-DD')}`
        }
    }
    render() {
        const { module } = this.props;
        return (
            <div className={styles['header-bar']}>
                <DatePicker
                    format="YYYY-MM-DD"
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