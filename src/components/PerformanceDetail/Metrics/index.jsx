import React from 'react';
import styles from './index.scss';
import { Select } from 'antd';
const Option = Select.Option;

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
        link: '链接'
    }
    // 字段需要后端提供
    mobileMetrics = {
        // 'avgRspTime': '平均响应时间',
        'apdexD': '响应时间 > 1s的次数',
        'clickNum': '点击数',
        'thruput' : '吞吐率'
    }
    // mobileType = {
    //     // UIType ?
    //     'html': 'H5',
    //     'native': 'NATIVE',
    // }
    handleSelectChange(e) {
        // 切换url应有的操作
        this.props.changeDisplayType(e.key)

    }
    _render() {
        const platform = sessionStorage.getItem('UEM_platform');
        if (platform == 'pc') {
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
                        <dt className={styles['key']}>{locale(this.metrics[item.label])}</dt>
                        <dd title={item.value} className={styles['value']}>{item.value}</dd>
                    </dl>
                </li>
            );
        } else {
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
                        <dt className={styles['key']}>{locale(this.mobileMetrics[item.label])}</dt>
                        <dd title={item.value} className={styles['value']}>{item.value}</dd>
                    </dl>
                </li>
            );
        }
    }
    render() {
        const platform = sessionStorage.getItem('UEM_platform');
        const { props } = this.props;
        return (

                    <div className={cls('tile-body', styles['metrics'])}>
                       { props.uiType == 'NATIVE' ?
                        <div className={styles['props']}>
                            <dl>
                                <dt>{locale('UI类型')}：</dt>
                                <dd>{props.uiType}</dd>
                            </dl>
                            <dl>
                                <dt>{locale('名称')}:</dt>
                                <dd>{props.operName}</dd>
                            </dl>
                        </div>
                        :
                        <div className={styles['props']}>
                            <dl>
                                <dt>{locale('UI类型')}：</dt>
                                <dd>{props.uiType ? props.uiType : 'H5'}</dd>
                            </dl>
                            <dl>
                                <dt>URL :</dt>
                                 {
                                props.specificUrls ?
                                 <dd>
                                    <Select labelInValue defaultValue={{key:props.specificUrls[0].displayType}} style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                                        {props.specificUrls.map((item,index) => {
                                            return <Option value={item.displayType}>{item.url}</Option>
                                        })}
                                    </Select>
                                </dd>
                                :
                                <dd>{props.path}</dd> 
                                 }    
                            </dl>
                        </div>}
                        <ul className={styles['list']}>
                            {this._render()}
                        </ul>
                    </div> 
        );
    }
}