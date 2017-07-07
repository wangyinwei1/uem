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

export default class ControlBar extends React.PureComponent {
    defaultValue = {
        normal: [],
        quota: []
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { type, index } = this.props;
        ['normal', 'quota'].forEach(key => {
            config[type][index].options[key].forEach(item => {
                if (item.checked) {
                    this.defaultValue[key].push(item.value);
                }
            });
        });
        this.onChangeCol();
    }
    onChangeCol() {
        this.props.onChangeCol({
            col: Array.prototype.concat.call([], this.defaultValue.normal, this.defaultValue.quota)
        });
    }
    changeColOptions(type, val) {
        this.defaultValue[type] = val;
        this.onChangeCol();
    }
    makeOptionsContent() {
        const { type, index } = this.props;
        return (
            <dl className={styles['col-option']}>
                <dt>常规</dt>
                <dd>
                    <CheckboxGroup
                        className={styles['checkbox-group']}
                        defaultValue={this.defaultValue.normal}
                        options={config[type][index].options.normal}
                        onChange={this.changeColOptions.bind(this, 'normal')}
                    />
                </dd>
                <dt>指标</dt>
                <dd>
                    <CheckboxGroup
                        className={styles['checkbox-group']}
                        defaultValue={this.defaultValue.quota}
                        options={config[type][index].options.quota}
                        onChange={this.changeColOptions.bind(this, 'quota')}
                    />
                </dd>
            </dl>
        );
    }
    render() {
        return (
            <div className={styles['control-bar']}>
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