import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    TabTable
} from '../components/Common'

@inject('frameStore', 'sidePanelStore', 'errorTableStore', 'overviewStore')
@observer
export default class ErrorTable extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {
            onGetOpersList
        } = this.props.errorTableStore;
        onGetOpersList();
    }
    changeTagType(tagType) {
        const { onChangeTagType } = this.props.errorTableStore;
        onChangeTagType({
            tagType
        });
    }
    changeColOptions(colOptions) {
        const { onChangeColOptions } = this.props.errorTableStore;
        onChangeColOptions({
            colOptions
        });
    }
    changeResTime(resTime) {
        const { onChangeResTime } = this.props.errorTableStore;
        onChangeResTime({
            resTime
        });
    }
    changeRows(rows) {
        const { onChangeRows } = this.props.errorTableStore;
        onChangeRows({
            rows
        });
    }
    resolveRow() {
        const { onResolveRow } = this.props.errorTableStore;
        onResolveRow();
    }
    search(val) {
        const _val = val.trim() === ''
            ? undefined
            : val.trim();
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
            this.props.errorTableStore.onSearch({
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
            rows,
            tagType,
            onGetOpersList,
            onChangeResTime,
            onResolveRow,
        } = this.props.errorTableStore;
        const { deploy } = this.props.overviewStore;
        const { onChangePanelList } = this.props.sidePanelStore;
        const apdexTime = (deploy.apdex / 1000).toFixed(1);
        return (
            <div id="ErrorTable">
                <TabTable
                    type="ErrorTable"
                    loading={loading}
                    tagType={tagType}
                    columns={columns}
                    rows={rows}
                    apdexTime={apdexTime}
                    dataList={dataList}
                    total={total}
                    getTableData={onGetOpersList}
                    changeTagType={this.changeTagType.bind(this)}
                    changeResTime={this.changeResTime.bind(this)}
                    changeColOptions={this.changeColOptions.bind(this)}
                    changeRows={this.changeRows.bind(this)}
                    resolveRow={this.resolveRow.bind(this)}
                    changePanelList={onChangePanelList}
                    search={this.search.bind(this)}
                />
            </div>
        );
    }
}