import React from 'react';
import styles from './index.scss';

export default class TimingH5 extends React.Component {
    typePage = [{
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
    }, 
    {
        label: 'DOM树解析',
        value: 'domLoading'
    }, 
    {
        label: 'DOM内容加载',
        value: 'domComplete'
    }, 
    {
        label: '页面渲染',
        value: 'load'
    },
    ]
    typeXhr = [
        {
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
    }, 
    {
        label: '回调',
        value: 'callback'
    }, 
    ]
    state = {
        showTimingCurve: false
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.items = $(this.refs.timing).find('dl').children('dd').children('span');
        this.colWraps = $(this.refs.timing).find('dl').children('dd');
    }
    componentWillReceiveProps(nextProps) {
        const {
            firstByteTime,
            lastByteTime,
            domLoadingTime,
            avgRspTime
        } = this.props.data;
        clearTimeout(this.timer);
        let all;
        if(domLoadingTime == undefined){
            all = firstByteTime + lastByteTime + avgRspTime;
        }else{
            all = firstByteTime + lastByteTime + domLoadingTime + avgRspTime;
        }
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
        // 每次进来的时候要重新获取每个item的信息
        this.items = $(this.refs.timing).find('dl').children('dd').children('span');
        this.colWraps = $(this.refs.timing).find('dl').children('dd');

        const {
            firstByteTime,
            lastByteTime,
            domLoadingTime,
            avgRspTime
        } = this.props.data;
        const { displayType } = this.props;
        const widths = [];
        this.items.map(item => {
            widths.push($(this.items[item]).width());
        });
        let domLoadingTimeWidth, avgRspTimeWidth;
        const firstByteTimeWidth = (() => {
            const colWrap_1 = widths[0] + widths[1] + widths[2];
            if (colWrap_1 === 0) {
                return this.colWraps.eq(1).width() + widths[3] + 15;
            }
            return colWrap_1 + widths[3] + 15;
        })();
        const lastByteTimeWidth = firstByteTimeWidth + widths[4];
        if(displayType == 'page'){
            domLoadingTimeWidth = lastByteTimeWidth + widths[5] + 15;
            avgRspTimeWidth = domLoadingTimeWidth + widths[6];
        }else{
            domLoadingTimeWidth = 0;
            avgRspTimeWidth = lastByteTimeWidth+widths[5] + 15;
        }

        return (
            <div className={styles['curve']}>
                <div style={{
                    width: firstByteTimeWidth + 'px'
                }}>
                    <span>{locale('首字节时间')} {firstByteTime}s</span>
                </div>
                <div style={{
                    width: lastByteTimeWidth + 'px'
                }}>
                    <span>{locale('末字节时间')} {lastByteTime}s</span>
                </div>
                {
                    domLoadingTime!==undefined && <div style={{
                        width: domLoadingTimeWidth + 'px'
                    }}>
                        <span>{locale('DOM加载时间')} {domLoadingTime}s</span>
                    </div>
                }
                <div style={{
                    width: avgRspTimeWidth + 'px'
                }}>
                    <span>{locale('平均响应时间')} {avgRspTime}s</span>
                </div>
            </div>
        );
    }
    timingCol() {
        const {
            networkTime = {},
            serverTime = {},
            clientTime = {},
            callbackTime = {}
        } = this.props.data;
        const { displayType } = this.props;
        return (
            <div ref="timing" className={styles['timgin-col']}>
                <dl>
                    <dt>
                        <span>{locale('与服务端建立')}<br />{locale('网络连接时间')}</span>
                        <span>{`${networkTime.value}s`}</span>
                    </dt>
                    <dd className={styles['col-wrap']}>
                        <span className={styles['dns']} style={{
                            width: this.convertPercent(networkTime.dns)
                        }}>dns</span>
                        <span className={styles['connect']} style={{
                            width: this.convertPercent(networkTime.connect)
                        }}>connect</span>
                        <span className={styles['redirect']} style={{
                            width: this.convertPercent(networkTime.redirect)
                        }}>redirect</span>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <span>{locale('服务端处理请求')}<br />{locale('及数据传输时间')}</span>
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
                
                {displayType == 'page' && <dl>
                    <dt>
                        <span>{locale('客户端加载和渲染时间')}</span>
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
                </dl>}

                {displayType == 'xhr' && <dl>
                    <dt>
                        <span>{locale('回调时间')}</span>
                        <span>{`${callbackTime.value}s`}</span>
                    </dt>
                    <dd className={styles['col-wrap']}>
                        <span className={styles['callback']} style={{
                            width: this.convertPercent({percent:1,value:callbackTime.value})
                        }}>callback</span>
                        
                    </dd>
                </dl>}
            </div>
        );
    }
    render() {
        const { data } = this.props;
        return (
            <div className={styles['timing']}>
                <div className='tile-head'>{locale('响应时间分解图')}</div>
                {this.props.specificUrls.length > 0 ? 
                    <div className='tile-body'>
                        {this.state.showTimingCurve && this.timingCurve()}
                        {this.timingCol()}
                        <ul className={styles['timeline-list']}>
                            {   this.props.displayType == 'page' ?
                                this.typePage.map(item => {
                                return <li key={item.label}><i className={styles[item.value]}></i><span>{locale(item.label)}</span></li>
                                })
                                :
                                this.typeXhr.map(item => {
                                return <li key={item.label}><i className={styles[item.value]}></i><span>{locale(item.label)}</span></li>
                                })
                            }
                        </ul>
                    </div>
                    :
                    <div className='tile-body'>
                        <span className={styles['emptyText']}>
                            <i className={cls('iconfont icon-jinggao')}></i>
                            {locale('此点击行为不是一个HTTP请求，因此无数据')}
                        </span>
                    </div>
                    }
            </div>
        );
    }
}