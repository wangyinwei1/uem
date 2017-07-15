import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    TabTable,
    SidePanel
} from '../components/Common'

@inject('frameStore', 'performanceBrowseStore', 'overviewStore')
@observer
export default class PerformanceBrowse extends React.Component {
    panelCount = 0
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {
            onGetOpersList
        } = this.props.performanceBrowseStore;
        onGetOpersList();
    }
    changeTagType(tagType) {
        const { onChangeTagType } = this.props.performanceBrowseStore;
        onChangeTagType({
            tagType
        });
    }
    changeColOptions(colOptions) {
        const { onChangeColOptions } = this.props.performanceBrowseStore;
        onChangeColOptions({
            colOptions
        });
    }
    changeResTime(resTime) {
        const { onChangeResTime } = this.props.performanceBrowseStore;
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
            this.props.performanceBrowseStore.onSearch({
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
            currentRow,
            onGetOpersList,
            onChangeResTime,
        } = this.props.performanceBrowseStore;
        const { deploy } = this.props.overviewStore;
        const apdexTime = (deploy.apdex / 1000).toFixed(1);
        return (
            <div id="PerformanceBrowse">
                <TabTable
                    type="PerformanceBrowse"
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