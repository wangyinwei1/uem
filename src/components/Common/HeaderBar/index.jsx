import React from 'react';
import styles from './index.scss';
import { Select } from 'antd';
import DatePicker from "../../Public/components/MomentPicker/DatePicker";
// import DateContainer from "../../Public/DatePicker/DateContainer";

const Option = Select.Option;
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
    componentDidMount(){
            // 解决刷新不重新请求版本的问题，在组件显示并且处于移动端的时候，请求版本信息
            if(this.datePickerDisplay[this.props.module] && this.props.platform !== 'pc'){
            // 在显示version的组件显示的时候进行获取
            this.props.onGetAppVersion();
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.module !== nextProps.module){
            // 通过判断 'dn' 属性存在与否来决定是否发送请求，在显示version的组件的时候进行获取
            if(!(!this.datePickerDisplay[nextProps.module] || this.props.platform == 'pc')){
            nextProps.onGetAppVersion();
        }
        }
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
    // 切换版本，存在sessionStorage里
    handleChange(value){
        this.props.onChooseVersion({
            version: value
        });
    }
    render() {
        // const platform = sessionStorage.getItem('UEM_platform');
        const { module,appAllVersions } = this.props;
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
                <Select
                    ref='version_picker'
                    onChange={this.handleChange.bind(this)}
                    className={cls(styles['version-picker'], {
                        'dn': !this.datePickerDisplay[module] || this.props.platform == 'pc'
                    })}
                    placeholder="所有版本"
                    defaultValue={sessionStorage.getItem('UEM_appVersion')}
                >
                {appAllVersions.map((item,index) => {
                    return <Option key={item} value={item}>{item}</Option>
                })}
                <Option key='global' value='global'>所有版本</Option>
                </Select>
            </div>
        );
    }
}