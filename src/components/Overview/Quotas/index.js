import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
    LineChart
} from '../../Common/Chart';
import config from './config';

import styles from './index.scss';

class Quotas extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getTrend } = this.props;
        getTrend();
    }
    quotasMobile(){
        const options={};
        ['avgRspTime','clickNum','errorCount','sessionCount','avgUiRspTime'].forEach(type => {
            options[type]= config.get('default').mergeDeep(config.get(type))
            .setIn(['series', 0, 'data'], this.props.trendMobile[type]['today'])
            .setIn(['series', 1, 'data'], this.props.trendMobile[type]['yesterday']).setIn(['tooltip','formatter'],this.formatterForOverview);
        })
        return (
            <div className={styles['quotas']}>
                <Row>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('启动次数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="sessionCount" options={options.sessionCount.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('点击数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="cliclNum" options={options.clickNum.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('原生UI平均响应时间')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="avgUiRspTime" options={options.avgUiRspTime.toJS()} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('H5平均响应时间')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="avgRspTime" options={options.avgRspTime.toJS()} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('错误数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="errorCount" options={options.errorCount.toJS()} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    // 今日概况几个指标图的params的格式和其他地方不一样，单独的formatter 
    formatterForOverview(params, ticket, callback){
        let relVal = params[0].dataIndex + ":00" + " - " + (parseInt(params[0].dataIndex) + 1) + `:00${locale('数据')}<br />`;
        if ((parseInt(params[0].dataIndex) + 1) > 24) {
            relVal = (params[0].dataIndex) + ":00" + " - " + `1:00${locale('数据')}<br />`;
        }
        let days = [{
            "day": locale('今日'),
            'color': '#66dc6a',
            'value':  params.filter(item =>{ return item['seriesName'] == locale('今日') }).length == 0 ?  locale('暂无数据'): params.filter(item =>{return item['seriesName'] == locale('今日') })[0]['value']
        }, {
            "day": locale('昨日'),
            'color': '#00c0ff',
            'value':  params.filter(item =>{return item['seriesName'] == locale('昨日') }).length == 0 ?  locale('暂无数据') : params.filter(item =>{return item['seriesName'] == locale('昨日') })[0]['value']
        }];
        let val = [];

        days.map((item, index) => {
            let text = item['value'] == undefined ? locale('暂无数据'): item['value'];
            relVal += "<i style='display:inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; background-color:" + item['color'] + ";'></i>" + item['day'] + " " + text + "<br />";
        });
        return relVal;
        
        // const description = params[0].data.description;
        // const text = (description === undefined ? '时间段:' : description);
        // // const ntimesParse = params[0].data.timesParse;
        // const ntimeParse =  (`${moment(params[0].data.time).format("MM-DD HH:mm")} ${locale('至')} ${moment(params[0].data.time+3600000).format("MM-DD HH:mm")}`);
        // return `
        //      <ul>
        //          <li><span>  ${ ntimeParse && typeof ntimeParse !== "undefined" ? text + ' ' + ntimeParse : ""} </span></li>
        //          ${params.map((val, index) => {
        //         return `<li>
        //                 <span style="background:${val.color};display:inline-block;height:10px;width:10px;border-radius:50%"></span>
        //                 <span>${val.seriesName} : ${val.value == null ? locale("暂无数据") : val.value}</span>
        //              </li>`
        //     }).join('')}
        //      </ul>`; 
    }
    render() {
        const { trend } = this.props;
        const options = {};
        ['pv', 'uv', 'clickNum', 'avgRspTime', 'errorCount'].forEach(type => {
            options[type] = config.get('default').mergeDeep(config.get(type))
                .setIn(['series', 0, 'data'], trend[type]['today'])
                .setIn(['series', 1, 'data'], trend[type]['yesterday']).setIn(['tooltip','formatter'],this.formatterForOverview);
        });
        // const optionsMobile = {};
        // ['']
        return (          
            sessionStorage.getItem('UEM_platform') !== 'pc' ?  
                this.quotasMobile() :    
                <div className={styles['quotas']}>
                <Row>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('浏览量PV')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="pv" options={options.pv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('访问量UV')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="uv" options={options.uv.toJS()} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={cls('tile-head')}>{locale('点击数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="clickNum" options={options.clickNum.toJS()} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('平均响应时间')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="avgRspTime" options={options.avgRspTime.toJS()} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={cls('tile-head')}>{locale('错误数')}</div>
                        <div className={cls('tile-body')}>
                            <LineChart group="quotas" chartId="errorCount" options={options.errorCount.toJS()} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Quotas;