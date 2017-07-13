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
    render() {
        const { 
            loading,
            columns,
            dataList,
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
                    getTableData={onGetOpersList}
                    changeTagType={this.changeTagType.bind(this)}
                    changeColOptions={this.changeColOptions.bind(this)}
                />
            </div>
        );
    }
}