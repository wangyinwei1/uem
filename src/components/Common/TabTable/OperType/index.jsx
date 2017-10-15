import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.scss';

export default class OperType extends React.Component {
    constructor(props) {
        super(props);
    }
    renderIcon() {
        let icon = '', title = '';
        switch(this.props.type) {
            case 'link': 
                icon = 'icon-click2';
                title = '链接';
                break;
            case 'form': 
                icon = 'icon-submit';
                title = '表单';
                break;
            case 'xhr': 
                icon = 'icon-click';
                title = 'Ajax';
                break;
            case 'redirect': 
                icon = 'icon-shuaxin';
                title = '重定向';
                break;
            case 'click':
                icon = 'icon-dianji';
                title = '点击'; 
                break;   
            default: 
                return '--';
        }
        return (
            <Tooltip placement="right" title={locale(title)}>
                <i className={cls('iconfont', icon, styles['icon'])}></i>
            </Tooltip>
        );
        
    }
    render() {
        return (
            <div className={styles['oper-type']}>{this.renderIcon()}</div>
        );
    }
}