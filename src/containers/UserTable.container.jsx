import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';

import {
    TabTable
} from '../components/Common'

@inject('frameStore', 'sidePanelStore', 'userTableStore', 'overviewStore')
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
    changeTagType(tagType,pageIndex) {
        const { onChangeTagType } = this.props.userTableStore;
        onChangeTagType({
            tagType,pageIndex
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
            dataStatus,
            tagType,
            pageIndex,
            pageSize,
            searchKey,
            userDefinedColumn,
            onGetOpersList,
            onChangeResTime,
            onChangePage,
            onChangeSortkey,
            onGetUserDefineColumn,
            onChangeSearchKey
        } = this.props.userTableStore;
        const { deploy } = this.props.overviewStore;
        const { onChangePanelList } = this.props.sidePanelStore;
        const apdexTime = (deploy.apdex / 1000).toFixed(2);
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
                    getUserDefineColumn={onGetUserDefineColumn}
                    userDefinedColumn={userDefinedColumn}
                    onChangeSearchKey={onChangeSearchKey}
                    search={this.search.bind(this)}
                    searchKey={searchKey}
                />
            </div>
        );
    }
}