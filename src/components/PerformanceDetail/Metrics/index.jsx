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
        'avgRspTime': '平均响应时间',
        'apdexD': '响应时间 > 1s的次数'
    }
    mobileType = {
        // UIType ?
        'html': 'HTML',
        'native': 'NATIVE',

    }
    handleSelectChange(e){
        // 切换url应有的操作
    }
    _render () {
        const platform = sessionStorage.getItem('UEM_platform');
        if(platform == 'pc'){
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
        }else{
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
            platform == 'pc' || props.uiType != 'NATIVE' ?
                <div className={cls('tile-body', styles['metrics'])}>
                    <div className={styles['props']}>
                        <dl>
                            <dt>{locale('操作类型')}：</dt>
                            <dd>{locale(this.type[props.operType])}</dd>
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
                :
                 <div className={cls('tile-body', styles['metrics'])}>
                    <div className={styles['props']}>
                        <dl>
                            <dt>{locale('UI类型')}：</dt>
                            <dd>{props.uiType}</dd>
                        </dl>                     
                        <dl>
                             <dt>名称:</dt>
                             <dd>{props.operName}</dd>

                             {/* <dd>
                                 <Select defaultValue={props.url} style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                                    <Option value={props.url}>{props.url}</Option>
                                 </Select>
                             </dd> */}
                         </dl>         
                    </div>
                    <ul className={styles['list']}>
                        {this._render()}
                    </ul>
                </div> 
        );
    }
}