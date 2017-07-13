import React from 'react';
import {
    Input,
    Checkbox,
    Popover
} from 'antd';
import config from './config';
import styles from './index.scss';

const Search = Input.Search;

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
    makeOptionsContent() {
        const { type, tagType } = this.props;
        return (
            <dl className={styles['col-option']}>
                <dt>常规</dt>
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
                <dt>指标</dt>
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
    render() {
        return (
            <div className={styles['control-bar']} key={this.props.tagType}>
                <Search
                    className={cls('search-bar')}
                    placeholder="名称"
                    style={{ width: 200 }}
                    onSearch={value => console.log(value)}
                />
                <div className={styles['options']}>
                    <Popover trigger="click" placement="bottomRight" content={this.makeOptionsContent()}>
                        <a className={cls('btn')} href="javascript:;">
                            <i className="iconfont icon-xiugaishanchuyibiaopankong"></i>
                            <span>列定制</span>
                        </a>
                    </Popover>
                </div>
            </div>
        );
    }
}