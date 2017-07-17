import React from 'react';
import styles from './index.scss';

export default class Metrics extends React.Component {
    metrics = {
        pv: 'PV',
        uv: 'UV',
        apdex: 'Apdex',
        thruput: '吞吐率',
        bounceRate: '跳出率'
    }
    type = {
        redirect: '重定向',
        xhr: 'AJAX',
        form: '表单',
        link: '超链接'
    }
    _render () {
        const { data } = this.props;
        let arr = [];
        for (let i in data) {
            const o = {};
            o.label = i;
            o.value = data[i];
            if (o.value !== undefined) {
                arr.push(o);
            }
        }
        return arr.map(item => 
            <li key={item.label}>
                <dl>
                    <dt className={styles['key']}>{this.metrics[item.label]}</dt>
                    <dd title={item.value} className={styles['value']}>{item.value}</dd>
                </dl>
            </li>
        );
    }
    render() {
        const { props } = this.props;
        return (
            <div className={cls('tile-body', styles['metrics'])}>
                <div className={styles['props']}>
                    <dl>
                        <dt>操作类型：</dt>
                        <dd>{this.type[props.operType]}</dd>
                    </dl>
                    <dl>
                        <dt>URL：</dt>
                        <dd>{props.url}</dd>
                    </dl>
                </div>
                <ul className={styles['list']}>
                    {this._render()}
                </ul>
            </div>
        );
    }
}