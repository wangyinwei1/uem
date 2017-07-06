import React from 'react';
import {
    Input,
    Popover
} from 'antd';
import styles from './index.scss';

const Search = Input.Search;

export default class ControlBar extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const content = (
            <dl className={styles['col-option']}>
                <dt>常规</dt>
                <dd>...</dd>
                <dt>指标</dt>
                <dd>...</dd>
            </dl>
        );
        return (
            <div className={styles['control-bar']}>
                <Search
                    className={cls('search-bar')}
                    placeholder="名称"
                    style={{ width: 200 }}
                    onSearch={value => console.log(value)}
                />
                <div className={styles['options']}>
                    <Popover trigger="click" placement="bottomRight" arrowPointAtCenter content={content}>
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