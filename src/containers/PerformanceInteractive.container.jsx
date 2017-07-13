import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    TabTable
} from '../components/Common'

@inject('frameStore', 'performanceInteractiveStore', 'overviewStore')
@observer
export default class PerformanceInteractive extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {
            onGetOpersList
        } = this.props.performanceInteractiveStore;
        onGetOpersList();
    }
    changeTagType(tagType) {
        const { onChangeTagType } = this.props.performanceInteractiveStore;
        onChangeTagType({
            tagType
        });
    }
    changeColOptions(colOptions) {
        const { onChangeColOptions } = this.props.performanceInteractiveStore;
        onChangeColOptions({
            colOptions
        });
    }
    changeResTime(resTime) {
        const { onChangeResTime } = this.props.performanceInteractiveStore;
        onChangeResTime({
            resTime
        });
    }
    search(val) {
        const _val = val.trim() === ''
            ? undefined
            : val.trim();
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
            this.props.performanceInteractiveStore.onSearch({
                searchValue: _val
            });
        }, 200);
    }
    render() {
        const {
            loading,
            columns,
            dataList,
            total,
            tagType,
            onGetOpersList,
            onChangeResTime
        } = this.props.performanceInteractiveStore;
        const { deploy } = this.props.overviewStore;
        const apdexTime = (deploy.apdex / 1000).toFixed(1);
        return (
            <div id="PerformanceInteractive">
                <TabTable
                    type="PerformanceInteractive"
                    loading={loading}
                    tagType={tagType}
                    columns={columns}
                    apdexTime={apdexTime}
                    dataList={dataList}
                    total={total}
                    getTableData={onGetOpersList}
                    changeTagType={this.changeTagType.bind(this)}
                    changeResTime={this.changeResTime.bind(this)}
                    changeColOptions={this.changeColOptions.bind(this)}
                    search={this.search.bind(this)}
                />
            </div>
        );
    }
}