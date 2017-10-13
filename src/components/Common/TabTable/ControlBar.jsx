import React from 'react';
import {
    Input,
    Checkbox,
    Popover
} from 'antd';
import config from './config';
import styles from './index.scss';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

export default class ControlBar extends React.Component {
    constructor(props) {
        super(props);

        this.options = config[props.type][props.tagType].options;
    }
    componentWillMount() {
        const { columns } = this.props;
        this.initCol(columns);
    }
    componentWillReceiveProps(nextProps) {
        const { type, tagType, columns } = nextProps;
        if (this.props.tagType !== tagType) {
            this.options = config[type][tagType].options;
            this.initCol(columns);
        }
    }
    initCol(columns) {
        this.colOptions = columns;
    }
    changeColOptions(e) {
        // debugger
        const checked = e.target.checked;
        const value = e.target.value;
        for (let i = this.colOptions.length - 1; i >= 0; i -= 1) {
            if (checked) {
                if (this.colOptions[i] === value) {
                    break;
                } else {
                    this.colOptions.push(value);
                    break;
                }
            } else {
                if (this.colOptions[i] === value) {
                    delete this.colOptions[i];
                }
            }
        }
        this.colOptions = _.remove(this.colOptions, function (n) {
            return n !== undefined;
        });
        this.props.changeColOptions(this.colOptions);
    }
    changeResTime(e) {
        const resTime = e.target.checked
            ? this.props.apdexTime
            : undefined;
        this.props.changeResTime(resTime);
    }
    makeOptionsContent() {
        const { type, tagType } = this.props;
        console.log(this.options);
        return (
            <dl className={styles['col-option']}>
                <dt>{locale('常规')}</dt>
                <dd>
                    {this.options.normal.map(item => {
                        return (
                            <Checkbox
                                key={item.value}
                                defaultChecked={this.colOptions.some(col => col === item.value)}
                                value={item.value}
                                disabled={item.disabled}
                                onChange={this.changeColOptions.bind(this)}
                            >{item.label}</Checkbox>
                        );
                    })}
                </dd>
                <dt>{`${type === 'UserTable' ? locale('自定义属性') : locale('指标')}`}</dt>
                <dd>
                    {this.options.quota.map(item => {
                        return (
                            <Checkbox
                                key={item.value}
                                defaultChecked={this.colOptions.some(col => col === item.value)}
                                value={item.value}
                                disabled={item.disabled}
                                onChange={this.changeColOptions.bind(this)}
                            >{item.label}</Checkbox>
                        );
                    })}
                </dd>
            </dl>
        );
    }
    switchControl(type) {
        if (type === 'ErrorTable') {
            if (this.props.tagType === 0) {
                return (
                    <div className={styles['options']}>
                        <a className={cls('btn', {
                            [styles['not-allow']]: this.props.rows.length === 0
                        })} href="javascript:;" onClick={() => {
                            return this.props.rows.length === 0
                                ? null
                                : this.props.resolveRow()
                        }}>{locale('标记为已解决')}</a>
                    </div>
                );
            }
            return null;
        }

        if (type === 'UserTable') {
            return (
                <div className={styles['options']}>
                    <Popover trigger="click" placement="bottomRight" content={this.makeOptionsContent()}>
                        <a className={cls('btn')} href="javascript:;">
                            <i className="iconfont icon-xiugaishanchuyibiaopankong"></i>
                            <span>{locale('列定制')}</span>
                        </a>
                    </Popover>
                </div>
            );
        }

        return (
            <div className={styles['options']}>
                <div className={styles['filter']}>
                    <Checkbox value={this.props.apdexTime} onChange={this.changeResTime.bind(this)}>{`${locale('响应时间')}>${this.props.apdexTime}s(4T)`}</Checkbox>
                </div>
                <Popover trigger="click" placement="bottomRight" content={this.makeOptionsContent()}>
                    <a className={cls('btn')} href="javascript:;">
                        <i className="iconfont icon-xiugaishanchuyibiaopankong"></i>
                        <span>{locale('列定制')}</span>
                    </a>
                </Popover>
            </div>
        );
    }
    render() {
        return (
            <div className={styles['control-bar']} key={this.props.tagType}>
                <Search
                    className={cls('search-bar')}
                    placeholder={locale("名称")}
                    style={{ width: 200 }}
                    onSearch={value => this.props.search(value)}
                />
                {this.switchControl(this.props.type)}
            </div>
        );
    }
}