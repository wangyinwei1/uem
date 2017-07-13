import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    TabTable
} from '../components/Common'

@inject('frameStore', 'performanceBrowseStore')
@observer
export default class PerformanceBrowse extends React.Component {
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
    search(val) {
        const _val = val.trim() === ''
            ? undefined
            : val.trim();
        this.props.performanceBrowseStore.onSearch({
            searchValue: _val
        });
    }
    render() {
        const {
            loading,
            columns,
            dataList,
            total,
            tagType,
            onGetOpersList
        } = this.props.performanceBrowseStore;
        return (
            <div id="PerformanceBrowse">
                <TabTable
                    type="PerformanceBrowse"
                    loading={loading}
                    tagType={tagType}
                    columns={columns}
                    dataList={dataList}
                    total={total}
                    getTableData={onGetOpersList}
                    changeTagType={this.changeTagType.bind(this)}
                    changeColOptions={this.changeColOptions.bind(this)}
                    search={this.search.bind(this)}
                />
            </div>
        );
    }
}