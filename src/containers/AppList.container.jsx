import React from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination } from 'antd';
import {
    AppBar,
    Apps
} from '../components/AppList';

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
        } = this.props.appListStore;

        onGetApps();
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
            onChoosePlatform
        } = this.props.frameStore;
        const {
            appList,
            total,
            sortKey,
            pageSize,
            pageIndex,
            loading,

            // action
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
                />
                <Apps
                    loading={loading}
                    list={appList}
                    updateApp={onUpdateApp}
                    delApp={onDelApp}
                    chooseApp={onChooseApp}
                    choosePlatform={onChoosePlatform}
                    radioStatus={this.state.chartOrTable}
                />
                <Pagination
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