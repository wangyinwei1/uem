import React, { Component } from 'react';
import { Tooltip, Progress } from 'antd';
import styles from './index.scss';

class CruxMobile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getRealTimeData, getApdex } = this.props;
        // 获取移动端30分钟指标
        getRealTimeData({ indexs: '' });
        getApdex();

    }
    componentWillReceiveProps(nextProps) {
        this.hackProgress();
    }
    hackDashboard() {
        const totalScore = this.props.realTimeData.totalScore ? this.props.realTimeData.totalScore : undefined;
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
                {/* <h2 style={{ display: 'block', textAlign: 'center' }}>{totalScore ? Number(totalScore.split('%')[0].split(',').join('')) * 0.01 : '暂无数据'} </h2> */}
                <span>应用健康度</span>
            </span>
        );
    }
    hackProgress() {
        const totalScore = this.props.realTimeData.totalScore && this.props.realTimeData.totalScore !==''  ? this.props.realTimeData.totalScore : null;
        const dashboardText = totalScore === null
            ? '暂无数据'
            : totalScore === 0
                ? '0'
                : `${Number(totalScore.split('%')[0].split(',').join('')) * 0.01 || '暂无数据'}`;

        $('.ant-progress-text-hack').remove();
        $('.ant-progress-text').hide();
        $('.ant-progress-text').after(`<span class="ant-progress-text-hack">${dashboardText}</span>`);
    }
    mobileIndicatorList() {
        let realTimeData = this.props.realTimeData;
        let score = [
            { key: '原生响应时间', value: realTimeData.avgUiRspTime },
            { key: 'H5响应时间', value: realTimeData.avgRspTime },
            { key: '用户错误率', value: realTimeData.errorRate }
        ];
        let lostScore = realTimeData.lostScore || [];
        if (lostScore.length === 5) {
            let tempScore = [];
            lostScore.forEach((item, index) => {
                tempScore[index] = parseFloat(item).toFixed(0);
            });
            lostScore = tempScore;
        }
        return (
            <div >
                <ul key={`list-${Math.random()}`} className={styles['box_list']}>
                    {
                        score.map((item, index) => {
                            if (item.key === '原生响应时间' || 'H5响应时间' ) {
                                if (item.value == null || undefined) {
                                    item.value = '--';
                                } else if (item.value < 1 && item.value != 0) {
                                    item.value = parseInt(item.value.toFixed(3).substr(2, 3)) + 'ms'
                                } else if(item.value > 1) {
                                    item.value = item.value.toFixed(1) + 's';
                                } else {
                                    item.value = item.value.toFixed(1) + '%';
                                }
                            }
                            return (
                                    <li key={index+'score'} className={styles['li']}>
                                            <div className={styles["value"]}>-{lostScore[index] || '0'}<em>分</em></div>
                                            <div className={styles["percent"]}>{item.value}</div>
                                            <div className={styles["key"]}>{item.key}</div>
                                    </li>
                            )
                            
                        })
                    }
                </ul>
            </div>
        )
    }
    render() {   
        // const dataEnum = [{
        //     name: '访问用户',
        //     key: 'uv'
        // }, {
        //     name: '操作数/分',
        //     key: 'operCountPerMin'
        // }, {
        //     name: '错误数/操作数', // ?
        //     key: 'errorCountPerOperCount'
        // }, {
        //     name: '平均响应时间',
        //     key: 'avgRspTime'
        // }];
        const dataEnum = [{
            name: '启动次数',
            key: 'sessionCount',
            unit: '次'
        }, {
            name: '点击数',
            key: 'clickNum',
            unit: '次',
        }, {
            name: '原生UI平均响应时时间', 
            key: 'avgUiRspTime',
            unit: '秒'
        }, {
            name: 'H5平均响应时间',
            key: 'avgRspTime',
            unit: '秒'
        },{
            name: '平均访问时长',
            key: 'avgAccessTime',
            unit: '秒'
        },{
            name: '用户错误率',
            key: 'errorRate',
            unit: '%'
        }];
        const { realTimeData = {} } = this.props;
        let totalScore = realTimeData['totalScore'];
        // debugger
        totalScore = totalScore == undefined  ? null : Number((totalScore.split('%')[0].split(',').join('')) * 0.01)
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
                                <div className={cls('toe', styles['value'])}>{_.isNull(realTimeData[item.key]) ? '--' : realTimeData[item.key]}<span className={styles["percent"]}>{item.unit}</span></div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['apdex']}>
                        <Progress className={cls(dashboardClass)} strokeWidth={8} type="dashboard" percent={totalScore ? totalScore : 0 } />
                        {this.hackDashboard()}
                        {this.mobileIndicatorList()}
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