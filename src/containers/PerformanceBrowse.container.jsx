import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    TabTable,
    SidePanel
} from '../components/Common'

@inject('frameStore', 'sidePanelStore', 'performanceBrowseStore', 'overviewStore')
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
    changeTagType(tagType,pageIndex) {
        const { onChangeTagType } = this.props.performanceBrowseStore;
        onChangeTagType({
            tagType,pageIndex
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
            dataStatus,
            tagType,
            pageIndex,
            pageSize,
            currentRow,
            onGetOpersList,
            onChangeResTime,
            onChangePage,
            onChangeSortkey,
        } = this.props.performanceBrowseStore;
        const { deploy } = this.props.overviewStore;
        const { onChangePanelList } = this.props.sidePanelStore;
        const apdexTime = (deploy.apdex / 1000).toFixed(2);
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
                    dataStatus={dataStatus}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    getTableData={onGetOpersList}
                    changeTagType={this.changeTagType.bind(this)}
                    changeResTime={this.changeResTime.bind(this)}
                    changeColOptions={this.changeColOptions.bind(this)}
                    changePanelList={onChangePanelList}
                    changePage={onChangePage}
                    onChangeSortkey={onChangeSortkey}
                    search={this.search.bind(this)}
                />
            </div>
        );
    }
}