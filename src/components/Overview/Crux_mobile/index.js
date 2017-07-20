import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss';

const dataEnum = [{
    name: '访问用户',
    key: 'uv'
}, {
    name: '操作数/分',
    key: 'operCountPerMin'
}, {
    name: '错误数/操作数', // ?
    key: 'errorCountPerOperCount'
}, {
    name: '平均响应时间',
    key: 'avgRspTime'
}];

class CruxMobile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getRealTimeData, getApdex } = this.props;
        getRealTimeData();
        getApdex();

        
    }
    componentWillReceiveProps(nextProps) {
        this.hackProgress();
    }
    hackDashboard() {
        const totalScore = this.props.realTimeData ? this.props.realTimeData.totalScore : null;
        // const title = (
        //     <div>
        //         <p>对真实用户操作的响应时间进行采样。</p>
        //         <p>采集一定时间之后，经过计算可以得出 Apdex 指数。</p>
        //         <p>计算公式为：</p>
        //         <p>Apdex 指数 = [满意数量 + (可容忍数量 / 2)] / 总样本数。</p>
        //         <p>从公式可以看出，Apdex指数越接近于1，代表应用性能越好。</p>
        //     </div>
        // );
        return (
            <span id="dashboard-text" className={cls(styles['dashborad-text'])}>
                <h2 style={{display:'block',textAlign:'center'}}>{ totalScore ? Number(totalScore.split('%')[0].split(',').join(''))*0.01 : '暂无数据' } </h2>
                <span>应用健康度</span>
            </span>
        );
    }
    hackProgress() {
        const totalScore = this.props.realTimeData ? this.props.realTimeData.totalScore : null;
        const dashboardText = totalScore === null
            ? '暂无数据'
            : totalScore === 0
                ? '0'
                : `${Number(totalScore.split('%')[0].split(',').join(''))*0.01 || '暂无数据'}`;

        $('.ant-progress-text-hack').remove();
        $('.ant-progress-text').hide();
        $('.ant-progress-text').after(`<span class="ant-progress-text-hack">${dashboardText}</span>`);
    }
    render() {
        // const { realTimeData = {}, apdex: apdexT = 2000 } = this.props;
        // const T = apdexT / 1000;
        // const apdex = realTimeData['apdex'];
        // this.apdex = apdex;
        const { realTimeData = {} } = this.props;
        let totalScore = realTimeData['totalScore'];
        totalScore = totalScore == undefined ? 0 : Number(totalScore.split('%')[0].split(',').join(''))*0.01
    
        const dashboardText = totalScore === null
            ? '暂无数据'
            : totalScore === 0
                ? '0'
                : `${totalScore || '暂无数据'}`;
        let dashboardClass;
        switch (true) {
            case totalScore === null:
                dashboardClass = styles['nodata'];
                break;
            case totalScore >= 80:
                dashboardClass = styles['high'];
                break;
            case totalScore >= 50:
                dashboardClass = styles['middle'];
                break;
            default:
                dashboardClass = styles['low'];
        }
        // $('.ant-progress-text').html(dashboardText);

        window.$ = $;
        return (
            <div className={styles['crux']}>
                <div className={cls('tile-head')}>关键指标</div>
                <div className={cls('tile-body')}>
                    <ul className={styles['list']}>
                        {dataEnum.map(item => (
                            <li key={item.name} className={styles['item']}>
                                <div className={styles['key']}>{item.name}</div>
                                <div className={cls('toe', styles['value'])}>{_.isNull(realTimeData[item.key]) ? '--' : realTimeData[item.key]}</div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['apdex']}>
                        <Progress className={cls(dashboardClass)} strokeWidth={8} type="dashboard" percent={totalScore} />
                        {this.hackDashboard()}
                        {/*<ul className={styles['range']}>
                            <li><i className={cls('iconfont icon-manyi')}></i><span>{`${realTimeData['dPercentage'] || '--'} 的操作响应快（0 ~ ${T.toFixed(1)}s）`}</span></li>
                            <li><i className={cls('iconfont icon-yiban')}></i><span>{`${realTimeData['tPercentage'] || '--'} 的操作可接受（${T.toFixed(1)} ~ ${(4 * T).toFixed(1)}s）`}</span></li>
                            <li><i className={cls('iconfont icon-bumanyi')}></i><span>{`${realTimeData['sPercentage'] || '--'} 的操作响应慢（> ${(4 * T).toFixed(1)}s）`}</span></li>
                        </ul>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default CruxMobile;