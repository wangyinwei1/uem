import React from 'react';
import { Table as AntdTable } from 'antd';
import config from './config';
import styles from './index.scss';

export default class Table extends React.Component {
    columns = [];
    constructor(props) {
        super(props);

        this.packColumns(props.columns);
        this.getScollX = this.getScollX.bind(this);
    }
    componentWillReceiveProps(nextProps) {
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
    }
    packColumns(columns) {
        this.columns = [];
        const { type, tagType } = this.props;
        columns.forEach(columnName => {
            ['normal', 'quota'].forEach(key => {
                config[type][tagType].options[key].map(item => {
                    const { label, value, width, fixed } = item;
                    if (columnName === value) {
                        this.columns.push({
                            title: label,
                            dataIndex: value,
                            width,
                            fixed
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
    render() {
        const { dataList } = this.props;
        return (
            <div className="table">
                <AntdTable columns={this.columns} dataSource={dataList}
                    scroll={{ x: this.getScollX() }}
                />
            </div>
        );
    }
}