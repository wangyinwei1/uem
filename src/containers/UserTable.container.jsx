import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    TabTable
} from '../components/Common'

@inject('frameStore', 'userTableStore', 'overviewStore')
@observer
export default class UserTable extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {
            onGetOpersList
        } = this.props.userTableStore;
        onGetOpersList();
    }
    changeTagType(tagType) {
        const { onChangeTagType } = this.props.userTableStore;
        onChangeTagType({
            tagType
        });
    }
    changeColOptions(colOptions) {
        const { onChangeColOptions } = this.props.userTableStore;
        onChangeColOptions({
            colOptions
        });
    }
    changeResTime(resTime) {
        const { onChangeResTime } = this.props.userTableStore;
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
            this.props.userTableStore.onSearch({
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
        } = this.props.userTableStore;
        const { deploy } = this.props.overviewStore;
        const apdexTime = (deploy.apdex / 1000).toFixed(1);
        return (
            <div id="UserTable">
                <TabTable
                    type="UserTable"
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