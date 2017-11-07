import React from 'react';
import echarts from 'echarts';
import 'echarts/map/js/china';
import styles from './index.scss';
import {
    Switch,
    Icon,
    Table,
    Button,
    Message,
    Modal
} from 'antd';
// require('echarts/lib/chart/map');
// require('echarts/map/js/china');
// // require('echarts/map/js/world');
// require('echarts/map/js/province/beijing');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

       
function ipValidator(ip) {
    if (ip == "") {
        return true
    } else {
        let ipRegex = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/g
        return ipRegex.test(ip)
    }
}
export class SettingMain extends React.Component {
    state = {
            isIpChange: false,
            // status: 1, // 地域设置开关，0为关闭，1为开启
            curProvince: '浙江',
            // ipCityList : [],
            // citys: []
    }
    constructor(props) {
        super(props);
        
    }

    // componentWillUpdate(nextProps, nextState) {
    //     const nextStatus = nextState.status;
    //     const status = this.props.status;
    //     if (nextStatus !== status) {
    //         this.initTable(this.state.curProvince);
    //     }
    // }

    componentDidMount() {
        this.initTable(this.state.curProvince);
        let myChart = echarts.init(document.getElementById('setting-map'), 'blue');
        // echarts组件里调用this只是它内部的，所以需要将外面的this先赋值给that
        let that = this;
        this.myChart = myChart;
        myChart.setOption({
            series: [{
                name: 'ip',
                type: 'map',
                selectedMode: 'single',
                mapType: 'china',
                data: [{
                    name: '浙江',
                    selected: true
                }],
                itemStyle: {
                        normal: {
                            areaColor: 'rgba(0, 0, 0, 0)',
                            borderColor: '#5fbfee'
                        },
                        emphasis: {
                            areaColor: '#68dd69',
                            borderColor: '#fff',
                            borderWidth: 1,
                        }
                    }
            }]
        });
        myChart.on('click', function (params) {
            if(that.state.isIpChange){
                Modal.confirm({
                    content: '切换地域前是否保存当前地域IP地址库？',
                    className: styles['is-save-ip-modal'],
                    onOk() {
                        that.submit();
                        if(that.props.status){
                            that.initTable(params.name);
                            that.setState({
                                isIpChange: false,
                                curProvince: params.name
                            })
                        }
                    },
                    onCancel() {
                        if (that.props.status) {
                            that.initTable(params.name);
                            that.setState({
                                isIpChange: false,
                                curProvince: params.name
                            });
                        }
                    }

                })
            }else{
                if(that.props.status){
                    that.initTable(params.name);
                    that.setState({
                        isIpChange: false,
                        curProvince: params.name
                    })
                }

            }
        })
    }
    initTable(provinceName){
        // var tabData = []
        const province = this.props.provinceList.filter((item,index) => {
            return provinceName.indexOf(item.provinceName) >= 0
        })
        // 获取城市的ip
        this.props.onGetIpCityList({
            provinceId: province[0].provinceId
        })
    }

    //

    submit(){
        let mappingIp = {};
        let mappingIps = [];
        let ipValidatorCount = 0;
        this.props.ipCityList.map((pitem, index) => {
            if(ipValidator(pitem.startIp) && ipValidator(pitem.endIp)){
                let ip = {};
                let sameArea = [];
                let key = pitem.key; 
                mappingIp = {};
                mappingIp.ips=[];
                let city = this.props.citys.filter((citem) => {
                    return citem.areaName == pitem.area;
                });
                mappingIp.areaId = city[0].areaId;
                mappingIp.areaType = city[0].areaType;
                ip.startIp = pitem.startIp;
                ip.endIp = pitem.endIp;
                mappingIp.ips.push(ip);
                sameArea = this.props.ipCityList.filter((Kitem, Kindex) => {
                    if (Kindex < index) {
                        return Kitem.key == pitem.key
                    } else {
                        return false
                    }
                });
                if (sameArea.length > 0) {
                    mappingIps[key].ips.push(ip)
                } else {
                    mappingIps.push(mappingIp)
                }
            } else {
                ipValidatorCount++
            }   
        })
        if(ipValidatorCount == 0){
            let arrMappingIps = mappingIps;
            mappingIps = JSON.stringify(mappingIps);
            let nMappingIps = [];
            arrMappingIps.forEach((item, index) => {
                if(nMappingIps.length == 0){
                    nMappingIps.push(item);
                }else{
                    let isRep = false; // areaId是否重复
                    let nItemData = item;
                    nMappingIps.forEach((nItem, nIndex) => {
                        nItemData = nItem;
                        if(nItem.areaId == item.areaId){
                            nItem.ips.push(item.ips[0]);
                            isRep = true;
                        }
                    });
                    if(!isRep){ // areaId重复的情况
                        nMappingIps.push(item);
                    }
                }
            });
            nMappingIps = JSON.stringify(nMappingIps);
            this.props.onUpdateIpMap({
                mappingIps: nMappingIps
            })
        }else {
            Message.warn("请键入合理的ip地址,例如:10.1.1.50")
        }
    }

    onAdd(record, ele) {
        let tableData = this.props.ipCityList.toJS();
        let temp = {
            key: tableData.length,
            area: record.area,
            startIp: '',
            endIp: '',
            show: false
        }
        tableData.splice(record.indexForSort + 1, 0, temp);
        // console.log('tableData====',tableData);
        // debugger
        this.props.onAddIp({
            tableData: tableData
        })
    }
    onDelete(index) {
        let tableData = this.props.ipCityList.toJS();
        tableData.splice(index,1);
        this.props.onAddIp({
            tableData: tableData
        })
    }
    onChange(checked){
        let status = checked === true ? 1 : 0;
        this.props.onUpdateMappingStatus({
            status: status
        })
    }

    inputStartIp(record, index, ele) {
        let tableData = this.props.ipCityList;
        record.startIp = ele.target.value;
        $.extend(tableData[index], record);
        this.props.onAddIp({
            tableData : tableData 
        });
        this.setState({
            isIpChange: true
        })
    }
    inputEndIp(record, index, ele) {
        let tableData = this.props.ipCityList;
        record.endIp = ele.target.value;
        $.extend(tableData[index], record);
        this.props.onAddIp({
            tableData : tableData 
        });
        this.setState({
            isIpChange: true
        })
    }
    render() {
        let that = this;
        const {
            curProvince,
        } = this.state;
        if (this.myChart) {
            const data = that.props.status === 0 ? [] : [{
                name: curProvince,
                selected: true
            }]
            this.myChart.setOption({
                series: [{
                    name: 'ip',
                    type: 'map',
                    selectedMode: that.props.status === 0 ? false : 'single',
                    mapType: 'china',
                    data: data,
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(0, 0, 0, 0)',
                            borderColor: '#5fbfee'
                        },
                        emphasis: {
                            areaColor: '#68dd69',
                            borderColor: '#fff',
                            borderWidth: 1,
                            // shadowColor: '#5fbfee',
                            // shadowBlur: 1,
                            // shadowOffsetX: 1,
                            // shadowOffsetY: 1,
                            // opacity: 0.8
                        }
                    }
                }]
            })
        }
        let columns = [{
            title: locale('地域'),
            dataIndex: 'area',
            key: 'area',
            width: '20%'
        }, {
            title: locale('起始IP'),
            dataIndex: 'startIp',
            key: 'startIp',
            width: '35%',
            render(startIp, record, index) {
                return (
                    <input type="text" className={styles['ip-input']} onChange={that.inputStartIp.bind(that,record, index)} value={that.props.ipCityList[index].startIp} />
                );
            }
        }, {
            title: locale('结束IP'),
            dataIndex: 'endIp',
            key: 'endIp',
            width: '35%',
            render(endIp, record, index) {
                return (
                    <input type="text" className={styles['ip-input']} onChange={that.inputEndIp.bind(that,record, index)} value={that.props.ipCityList[index].endIp} />
                );
            }
        }, {
            title: locale('操作'),
            key: 'operation',
            width: '10%',
            render(text, record, index) {
                let icon = record.show ? <Icon type="plus-circle" className={styles['icon']} onClick={that.onAdd.bind(that,record)} /> : <Icon type="cross-circle" className={styles['icon']} onClick={that.onDelete.bind(that,index)} />
                return (
                    <span>
                        {icon}
                    </span>
                );
            }
        }];
        let show = this.props.status === 1 ? 'block' : 'none';
        let isOpen = this.props.status === 0 ? false : true;

        // const mockData = [{ 'area': '浙江', 'startIp': '255.255.255.1', 'endIp': '255.255.255.255', 'operation': { 'show': true } }];
        return (
            <div className={styles['setting-modal']}>
                <div className={styles['modal-inner']}>
                    <div id='setting-map' className={styles['setting-map']}></div>
                    <div className={styles['tab-content']}>
                        <div className={styles['clearfix']}>
                            <span className={styles['tip']}>{locale('地域设置，启用需自己手动设置IP地址库，关闭状态使用公共IP地址库')}</span>
                            <Switch
                                className='switch'
                                checkedChildren="启用"
                                unCheckedChildren="关闭"
                                defaultChecked={isOpen}
                                checked={isOpen}
                                onChange={this.onChange.bind(this)} />
                        </div>
                        <div style={{ display: show }}>
                            <Table
                                columns={columns}
                                dataSource={this.props.ipCityList.toJS()}
                                pagination={false}
                                className={styles['common-tab']} />
                            <Button type="primary" className={styles['save-btn']} onClick={this.submit.bind(this)}>{locale('保存设置')}</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}