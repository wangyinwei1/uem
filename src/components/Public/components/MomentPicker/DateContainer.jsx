import React from 'react'
import { DatePicker } from 'antd';

const RangePicker = DatePicker.RangePicker;

let DateContainer = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            currentIndex: null,
            content: '',
            num: 1,
            _state: typeof this.props.format == 'string' && this.props.format != '' ? true : false
        }
    },
    onChange: function (value) {
        this.setState({
            visible: false
        });
        if (value[0] === null) {
            return;
        }
        const dateObj = {
            startTime: value[0],
            endTime: value[1],
            text: 'custom'
        };
        this.props.onDate(dateObj);
        $('.bat-datepicker-selection').click();
    },
    handleClick: function (item, index, e) {
        this.setState({ currentIndex: index, num: 2 });
        const disabledDate = function (current) {
            return current && current.valueOf() > Date.now();
        };
        if (item.type == 'custom') {
            if (this.state.visible) {
                this.setState({
                    visible: !this.state.visible,
                    content: ''
                })
            } else {
                this.setState({
                    visible: !this.state.visible,
                    content: <RangePicker
                        disabledDate={disabledDate}
                        showTime={this.props.showTime}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={this.onChange}
                        getCalendarContainer={() => document.getElementById('bat-data-main')}
                    />
                })
            }
        } else {
            var time, num = parseInt(item.value);
            switch (item.type.toLowerCase()) {
                case 'y': time = num * 365 * 24 * 3600 * 1000;
                    break;
                case 'm': time = num * 30 * 24 * 3600 * 1000;
                    break;
                case 'd': time = num * 24 * 3600 * 1000;
                    break;
                case 'h': time = num * 3600 * 1000;
                    break;
                case 'min': time = num * 60 * 1000;
                    break;
            }
            let scopeTime = new Date().getTime() - time;
            this.setState({
                visible: false,
                content: ''
            });
            const dateObj = {
                startTime: new Date(scopeTime),
                endTime: new Date(),
                text: item.text,
                num: item.value,
                units: item.type
            };
            this.props.onDate(dateObj);
            $('.bat-datepicker-selection').click();
        }
    },
    isActive: function (index) {
        return index == this.state.currentIndex ? 'active' : '';
    },
    componentDidMount: function () {

    },
    render: function () {
        const _l = this.props.items.length > 9 ? this.props.items.length : 9;
        const _width = _l * 58 + 30;
        const ul_width = _l * 58 + 10;
        console.log(this.props.items);
        return (
            <div className="bat-date-container" style={{ width: _width }}>
                <div className="bat-date-tags clearfix">
                    <ul>
                        {this.props.items.map((item, index) => {
                            return <li key={index}><a href="javascript:;" className={this.isActive(index)} onClick={this.handleClick.bind(this, item, index)} >{item.text}</a></li>
                        })}
                    </ul>
                </div>
                <div className="bat-data-main" id="bat-data-main" style={this.state.visible ? { display: "block" } : { display: "none" }}>
                    {this.state.content}
                </div>
            </div>
        )
    }
});

export default DateContainer