import React from 'react';
import styles from './index.scss';

export default class Timing extends React.Component {
    type = [{
        label: 'DNS',
        value: 'dns'
    }, {
        label: '连接',
        value: 'connect'
    }, {
        label: '重定向',
        value: 'redirect'
    }, {
        label: '请求文档',
        value: 'request'
    }, {
        label: '响应并传输数据',
        value: 'response'
    }, {
        label: 'DOM树解析',
        value: 'domLoading'
    }, {
        label: 'DOM内容加载',
        value: 'domComplete'
    }, {
        label: '渲染完成',
        value: 'load'
    }]
    state = {
        showTimingCurve: false
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.items = $(this.refs.timing).find('dl').children('dd').children('span');
        this.items.map(item => {
            console.log(item);
        })
    }
    convertPercent(value) {
        if (value === undefined) {
            return '0%';
        }
        return `${value.percent * 100}%`;
    }
    timingCurve() {
        return (
            <svg width="100%" height="120px" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <g>
                    <path d="M0,120A100,20,0,0,1,300,120" stroke="#fff" strokeWidth="1" fill="none" />
                </g>
                <g>
                    <path d="M0,120A100,40,0,0,1,300,120" stroke="#fff" strokeWidth="1" fill="none" /> 
                </g>
                <g>
                    <path d="M0,120A100,60,0,0,1,300,120" stroke="#fff" strokeWidth="1" fill="none" /> 
                </g>
                <g>
                    <path d="M0,120A100,80,0,0,1,300,120" stroke="#fff" strokeWidth="1" fill="none" /> 
                </g>
            </svg>
        );
    }
    timingCol() {
        const {
            netTime = {},
            serverTime = {},
            clientTime = {},
        } = this.props.data;
        return (
            <div ref="timing" className={styles['timgin-col']}>
                <dl>
                    <dt>
                        <span>与服务端建立<br/>网络连接时间</span>
                        <span>{`${netTime.value}s`}</span>
                    </dt>
                    <dd className={styles['col-wrap']}>
                        <span className={styles['dns']} style={{
                            width: this.convertPercent(netTime.dns)
                        }}>dns</span>
                        <span className={styles['connect']} style={{
                            width: this.convertPercent(netTime.connect)
                        }}>connect</span>
                        <span className={styles['redirect']} style={{
                            width: this.convertPercent(netTime.redirect)
                        }}>redirect</span>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <span>服务端处理请求<br/>及数据传输时间</span>
                        <span>{`${serverTime.value}s`}</span>
                    </dt>
                    <dd className={styles['col-wrap']}>
                        <span className={styles['request']} style={{
                            width: this.convertPercent(serverTime.request)
                        }}>request</span>
                        <span className={styles['response']} style={{
                            width: this.convertPercent(serverTime.response)
                        }}>response</span>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <span>客户端加载和渲染时间</span>
                        <span>{`${clientTime.value}s`}</span>
                    </dt>
                    <dd className={styles['col-wrap']}>
                        <span className={styles['domLoading']} style={{
                            width: this.convertPercent(clientTime.domLoading)
                        }}>domLoading</span>
                        <span className={styles['domComplete']} style={{
                            width: this.convertPercent(clientTime.domComplete)
                        }}>domComplete</span>
                        <span className={styles['load']} style={{
                            width: this.convertPercent(clientTime.load)
                        }}>load</span>
                    </dd>
                </dl>
            </div>
        );
    }
    render() {
        const { data } = this.props;
        return (
            <div className={styles['timing']}>
                <div className='tile-head'>响应时间分解图</div>
                <div className='tile-body'>
                    {this.state.showTimingCurve && this.timingCurve()}
                    {this.timingCol()}
                    <ul className={styles['timeline-list']}>
                        {this.type.map(item => {
                            return <li key={item.label}><i className={styles[item.value]}></i><span>{item.label}</span></li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}