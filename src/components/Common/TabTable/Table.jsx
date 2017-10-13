import React from 'react';
import { Table as AntdTable, message } from 'antd';
import config from './config';
import styles from './index.scss';

export default class Table extends React.Component {
    index = null
    columns = [];
    constructor(props) {
        super(props);

        this.packColumns(props.columns);
        this.getScollX = this.getScollX.bind(this);
        this.clearIndex = this.clearIndex.bind(this);
    }
    componentDidMount() {
        this.$win = $(window);
        this.$win.on('click', this.clearIndex);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.tagType !== this.props.tagType) {
            this.index = null;
        }
        if (nextProps.columns !== this.props.columns) {
            clearTimeout(this.colTimer);
            this.colTimer = setTimeout(() => {
                this.packColumns(nextProps.columns);
                this.forceUpdate();
            }, 50);
        }
    }
    componentWillUnmount() {
        clearTimeout(this.colTimer);
        this.$win.off('click', this.clearIndex);
    }
    clearIndex(e) {
        if ($(e.target).parents().hasClass(styles['side-panel-wrap']) || $(e.target).parents().hasClass('ant-table-tbody')) {

        } else {
            this.index = null;
        }
    }
    packColumns(columns) {
        this.columns = [];
        const { type, tagType } = this.props;
        columns.forEach(columnName => {
            ['normal', 'quota'].forEach(key => {
                config[type][tagType].options[key].map(item => {
                    const { label, value, width, fixed, sorter, render } = item;
                    if (columnName === value) {
                        this.columns.push({
                            title: label,
                            dataIndex: value,
                            width,
                            fixed,
                            sorter,
                            render
                        });
                    }
                });
            });
        });
    }
    getScollX() {
        const { type, tagType } = this.props;
        let xWidth = 0;
        this.columns.forEach(item => {
            const { width = 0 } = item;
            xWidth += width;
        });
        return xWidth;
    }
    selectRow(key, row) {
        const rows = row.map(item => item.summaryId);
        const errorType = row.map(item => item.errorType);
        this.props.changeRows(rows,errorType);
    }
    rowSelection() {
        const { type, tagType } = this.props;
        if (type === 'ErrorTable' && tagType === 0) {
            return {
                onChange: this.selectRow.bind(this)
            }
        }

        return null;
    }
    rowClickHandler(record, index, event) {
        const { type } = this.props;
        const browseTag = type === 'PerformanceBrowse' || type === 'PerformanceInteractiveMobile';
        const interactiveTag = type === 'PerformanceInteractive';
        // 某些条件下，点击不进入详情页
        if (!Boolean(record.operType) && browseTag) {
            message.warning(locale('暂无数据'));
            return false;
        }
        if (!Boolean(record.displayType) && interactiveTag) {
            message.warning(locale('暂无数据'));
            return false;
        }
        if (this.index === index) {
            return false;
        }
        this.index = index;
        this.props.changePanelList({
            panelItem: record
        });
    }
    changePage(page, pageSize) {
        this.props.changePage({
            page,
            pageSize
        });
    }
    render() {
        const { dataList, total, pageIndex, pageSize } = this.props;
        const rowSelection = this.rowSelection();
        return (
            <div className="table">
                <AntdTable
                    onRowClick={this.rowClickHandler.bind(this)}
                    pagination={{
                        total,
                        current: pageIndex,
                        pageSize: pageSize,
                        onChange: this.changePage.bind(this)
                    }} rowSelection={rowSelection} 
                    columns={this.columns} 
                    dataSource={dataList}
                    scroll={{ x: this.getScollX() }}
                />
            </div>
        );
    }
}