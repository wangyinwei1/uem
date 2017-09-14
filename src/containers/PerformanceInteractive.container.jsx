import React from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';
import {
    TabTable
} from '../components/Common'

@inject('frameStore', 'sidePanelStore', 'performanceInteractiveStore', 'overviewStore')
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
            pageIndex,
            pageSize,
            onGetOpersList,
            onChangeResTime,
            onChangePage,
        } = this.props.performanceInteractiveStore;
        const { deploy } = this.props.overviewStore;
        const { onChangePanelList } = this.props.sidePanelStore;
        const apdexTime = (deploy.apdex / 1000).toFixed(1);
        // const platfrom = localStorage.getItem('UEM_platfrom');
        return (
            // platfrom == 'pc' ?
            <div id="PerformanceInteractive">
                <TabTable
                    type={sessionStorage.getItem('UEM_platform') == 'pc' ? "PerformanceInteractive" : "PerformanceInteractiveMobile"}
                    loading={loading}
                    tagType={tagType}
                    columns={columns}
                    apdexTime={apdexTime}
                    dataList={dataList}
                    total={total}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    getTableData={onGetOpersList}
                    changeTagType={this.changeTagType.bind(this)}
                    changeResTime={this.changeResTime.bind(this)}
                    changeColOptions={this.changeColOptions.bind(this)}
                    changePanelList={onChangePanelList}
                    changePage={onChangePage}
                    search={this.search.bind(this)}
                />    
            </div> 
            // :
            // <div id="PerformanceInteractiveMobile">
            //     <TabTable
            //         type="PerformanceInteractiveMobile"
            //         loading={loading}
            //         tagType={tagType}
            //         columns={columns}
            //         apdexTime={apdexTime}
            //         dataList={dataList}
            //         total={total}
            //         pageIndex={pageIndex}
            //         pageSize={pageSize}
            //         getTableData={onGetOpersList}
            //         changeTagType={this.changeTagType.bind(this)}
            //         changeResTime={this.changeResTime.bind(this)}
            //         changeColOptions={this.changeColOptions.bind(this)}
            //         changePanelList={onChangePanelList}
            //         changePage={onChangePage}
            //         search={this.search.bind(this)}
            //     />
            // </div>
        );
    }
}