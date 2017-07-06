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
    constructor(props) {
        super(props);
    }
    makeOptionsContent() {
        const { type, index } = this.props;

        const defaultValue = {
            normal: [],
            quota: []
        };
        ['normal', 'quota'].forEach(key => {
            config[type][index].options[key].forEach(item => {
                if (item.checked) {
                    defaultValue[key].push(item.value);
                }
            });
        })
        
        return (
            <dl className={styles['col-option']}>
                <dt>常规</dt>
                <dd>
                    <CheckboxGroup
                        className={styles['checkbox-group']}
                        defaultValue={defaultValue.normal}
                        options={config[type][index].options.normal}
                    />
                </dd>
                <dt>指标</dt>
                <dd>
                    <CheckboxGroup
                        className={styles['checkbox-group']}
                        defaultValue={defaultValue.quota}
                        options={config[type][index].options.quota}
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