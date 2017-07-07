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
        const { timeType } = this.props.frameStore;
        const {
            type,
            operType,
            tagType,
            pageIndex,
            onChangeTagType,
            onGetOpersList
        } = this.props.performanceBrowseStore;
        onGetOpersList({
            type,
            operType,
            pageIndex,
            startTime: moment().subtract(timeType.type, timeType.units).valueOf(),
            tagType
        });
    }
    render() {
        const {
            dataList,
            col,
            onChangeCol,
            onChangeTagType
        } = this.props.performanceBrowseStore;
        return (
            <div id="PerformanceBrowse">
                <TabTable 
                    type="PerformanceBrowse"
                    col={col.toJS()}
                    onChangeTagType={onChangeTagType}
                    onChangeCol={onChangeCol}
                    dataList={dataList.toJS()}
                />
            </div>
        );
    }
}