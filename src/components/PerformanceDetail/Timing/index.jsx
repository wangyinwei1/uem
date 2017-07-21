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
    }
    componentWillReceiveProps(nextProps) {
        const {
            firstByteTime,
            lastByteTime,
            domLoadingTime,
            pageAvgRspTime
        } = this.props.data;
        clearTimeout(this.timer);
        const all = firstByteTime + lastByteTime + domLoadingTime + pageAvgRspTime;
        if (all > 0) {
            this.timer = setTimeout(() => {
                this.setState({
                    showTimingCurve: true
                });
            }, 1500);
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    convertPercent(value) {
        if (value === undefined) {
            return '0%';
        }
        return `${value.percent * 100}%`;
    }
    timingCurve() {
        const {
            firstByteTime,
            lastByteTime,
            domLoadingTime,
            pageAvgRspTime
        } = this.props.data;
        const widths = [];
        this.items.map(item => {
            widths.push($(this.items[item]).width());
        });
        const firstByteTimeWidth = widths[0] + widths[1] + widths[2] + widths[3] + 15;
        const lastByteTimeWidth = firstByteTimeWidth + widths[4];
        const domLoadingTimeWidth = lastByteTimeWidth + widths[5] + 15;
        const pageAvgRspTimeWidth = domLoadingTimeWidth + widths[6];
        return (
            <div className={styles['curve']}>
                <div style={{
                    width: firstByteTimeWidth + 'px'
                }}>
                    <span>首字节时间 {firstByteTime}s</span>
                </div>
                <div style={{
                    width: lastByteTimeWidth + 'px'
                }}>
                    <span>末字节时间 {lastByteTime}s</span>
                </div>
                <div style={{
                    width: domLoadingTimeWidth + 'px'
                }}>
                    <span>DOM加载时间 {domLoadingTime}s</span>
                </div>
                <div style={{
                    width: pageAvgRspTimeWidth + 'px'
                }}>
                    <span>页面平均响应时间 {pageAvgRspTime}s</span>
                </div>
            </div>
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
                        <span>与服务端建立<br />网络连接时间</span>
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
                        <span>服务端处理请求<br />及数据传输时间</span>
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