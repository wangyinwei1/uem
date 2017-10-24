import React from 'react';
import styles from './index.scss';
import { Select } from 'antd';
const Option = Select.Option;

export default class Metrics extends React.Component {
    metricsOverview = {
        'pv': 'pv',
        'uv': 'uv',
        'apdex': 'apdex',
        'thruput': '吞吐率'
    }

    type = {
        redirect: '重定向',
        xhr: 'AJAX',
        form: '表单',
        link: '链接'
    }
    // 字段需要后端提供
    metrics = {
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
        this.props.changeDisplayType(e.key.split('-')[0], e.label);

    }
    _render() {
        const platform = sessionStorage.getItem('UEM_platform');
        if (this.props.type == 'browse') {
            const { data } = this.props;
            let arr = [];
            for (let i in data) {
                for(let n in this.metricsOverview){
                    if( i == n ){
                        const o = {};
                        o.label = n;
                        o.value = data[n];
                        if (o.value !== undefined) {
                            arr.push(o);
                    }
                }
                } 
            }
            // console.log('arr是',arr);
            return arr.map(item =>
                <li key={item.label}>
                    <dl>
                        <dt className={styles['key']}>{locale(this.metricsOverview[item.label])}</dt>
                        <dd title={item.value} className={styles['value']}>{item.value}</dd>
                    </dl>
                </li>
            );
        } else {
            const { data } = this.props;
            let arr = [];
            for (let i in data) {
                for(let n in this.metrics){
                    if( i == n ){
                        const o = {};
                        o.label = i;
                        o.value = data[i];
                        if (o.value !== undefined) {
                            arr.push(o);
                    }
                }
                } 
            }
            // console.log('arr是',arr);
            return arr.map(item =>
                <li key={item.label}>
                    <dl>
                        <dt className={styles['key']}>{locale(this.metrics[item.label])}</dt>
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
                                props.specificUrls && props.specificUrls.length > 0 ?
                                 <dd>
                                    <Select labelInValue defaultValue={{key:props.requestPath}} style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                                        {props.specificUrls.map((item,index) => {
                                            return <Option key={`${item.displayType}-${index}`} value={`${item.displayType}-${index}`}>{item.url}</Option>
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