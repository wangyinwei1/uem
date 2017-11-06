import React from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination } from 'antd';
import {
    AppBar,
    Apps
} from '../components/AppList';
import styles from '../components/AppList/Apps/index.scss';

@inject('frameStore', 'appListStore')
@observer
export default class AppList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOrTable: 'chart'
        };
    }
    componentDidMount() {
        const {
            onGetApps,
            onInitPaginationIndex,
            onGetProvinceList
        } = this.props.appListStore;
        onInitPaginationIndex();
        onGetApps();
        onGetProvinceList();
    }

    selectChartOrTable(value){
        this.setState({
            chartOrTable: value
        })
    }

    render() {
        const {
            appId,

            // action
            onChooseApp,
            onChoosePlatform,
            setAppInfo
        } = this.props.frameStore;
        const {
            appList,
            total,
            sortKey,
            pageSize,
            pageIndex,
            loading,
            provinceList,
            ipCityList,
            onGetIpCityList,
            citys,
            status,
            // action
            onUpdateIpMap,
            onUpdateMappingStatus,
            onAddIp,
            onUpdateApp,
            onDelApp,
            onPageJump,
            onAddApp,
            onSortBy
        } = this.props.appListStore;
        return (
            <div id="AppList">
                <AppBar
                    addApp={onAddApp}
                    sortBy={onSortBy}
                    sortKey={sortKey}
                    chartOrTable={this.selectChartOrTable.bind(this)}
                    chooseApp={onChooseApp}
                    provinceList={provinceList}
                    ipCityList={ipCityList}
                    citys={citys}
                    onGetIpCityList={onGetIpCityList}
                    status={status}
                    onUpdateMappingStatus={onUpdateMappingStatus}
                    onAddIp={onAddIp}
                    onUpdateIpMap={onUpdateIpMap}
                />
                <Apps
                    loading={loading}
                    list={appList}
                    updateApp={onUpdateApp}
                    delApp={onDelApp}
                    chooseApp={onChooseApp}
                    choosePlatform={onChoosePlatform}
                    radioStatus={this.state.chartOrTable}
                    setAppInfo={setAppInfo}
                />
                <Pagination
                    className={styles['appList-pagination']}
                    showTotal={total => '总共 ' + total + ' 个应用'}
                    current={pageIndex}
                    total={total}
                    pageSize={pageSize}
                    onChange={index => onPageJump({index})}
                />
            </div>
        );
    }
}