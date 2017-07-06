import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import DateContainer from './DateContainer.jsx'
import classnames from 'classnames'
require('./datapicker.less');
require('./FormatDate');


const customSetting = localStorage.UYUN_LANGUAGE_CONSTANT == "en_US" ? {text: 'Custom', value: null, type: 'custom'} : {text: '自定义', value: null, type: 'custom'};
const dateSetting = localStorage.UYUN_LANGUAGE_CONSTANT == "en_US" ? [
    {text: 'Month',     value: 1,   type: 'm'},
    {text: 'Week',     value: 7,   type: 'd'},
    {text: '3 Days',     value: 3,   type: 'd'},
    {text: 'Day',     value: 1,   type: 'd'},
    {text: '12 Hour',   value: 12,  type: 'h'},
    {text: '6 Hour',    value: 6,   type: 'h'},
    {text: 'Hour',    value: 1,   type: 'h'},
    {text: '30Mins',   value: 30,  type: 'min'}
]:[
    {text: '1月',     value: 1,   type: 'm'},
    {text: '7天',     value: 7,   type: 'd'},
    {text: '3天',     value: 3,   type: 'd'},
    {text: '1天',     value: 1,   type: 'd'},
    {text: '12小时',   value: 12,  type: 'h'},
    {text: '6小时',    value: 6,   type: 'h'},
    {text: '1小时',    value: 1,   type: 'h'},
    {text: '30分钟',   value: 30,  type: 'min'}
];

const last = localStorage.UYUN_LANGUAGE_CONSTANT == "en_US" ? "Last" :"最近";




let DatePicker = React.createClass({
    getInitialState: function () {
        return {
            text: this.props.defaultValue,
            startTime: '',
            endTime: '',
            num: '',
            units: ''
        }
    },
    onDate: function (values) {
        var startText, endText;
        if (typeof this.props.format == 'string' && this.props.format != '') {
            startText = values.startTime.Format(this.props.format) + '~' + values.endTime.Format(this.props.format);
        } else {
            startText = values.startTime.Format('YYYY-MM-dd hh:mm:ss') + '~' + values.endTime.Format('YYYY-MM-dd hh:mm:ss');
        }
        if (values.text == 'custom') {
            this.setState({text: startText});
            this.props.onChange({
                beginTime: values.startTime,
                endTime: values.endTime,
                type: 'custom'
            });
        } else {
            this.setState({text: `${last} ${values.text}`});
            this.props.onChange({
                beginTime: values.startTime,
                endTime: values.endTime,
                type: values.num,
                units: values.units
            });
        }
    },
    render: function () {
        
        const _customSetting = this.props.customSetting ?  this.props.customSetting : customSetting;
        const _dateSetting = this.props.dateSetting ?  this.props.dateSetting : dateSetting;
        
        const _date = this.props.dateObj ? _.concat(_customSetting, this.props.dateObj) : _.concat(_customSetting, _dateSetting);
        const menu = <DateContainer format={this.props.format} items={_date} onDate={this.onDate} showTime={this.props.showTime} />;
        return (
            <span id="date-main" className={this.props.className} style={{width:this.props.width}}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <span className="bat-datepicker-selection clearfix">
                        <Icon type="clock-circle-o" />
                        <span className="bat-datepicker-text">{this.state.text}</span>
                        <Icon className="bat-arrow-down" type="down" />
                    </span>
                </Dropdown>
            </span>
        )
    }
});

export default DatePicker