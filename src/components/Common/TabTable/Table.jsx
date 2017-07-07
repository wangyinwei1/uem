import React from 'react';
import { Table as AntdTable } from 'antd';
import config from './config';
import styles from './index.scss';

// const columns = [
//   { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
//   { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
//   { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
//   { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
//   { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
//   { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
//   { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
//   { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
//   { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
//   { title: 'Column 8', dataIndex: 'address', key: '8' },
// ];

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

export default class Table extends React.Component {
    columns = [];
    constructor(props) {
        super(props);

        this.packColumns();
        this.getScollX = this.getScollX.bind(this);
    }
    packColumns() {
        const { type, tabIndex } = this.props;
        ['normal', 'quota'].forEach(key => {
            config[type][tabIndex].options[key].map(item => {
                const { label, value, width, fixed } = item;
                this.columns.push({
                    title: label,
                    dataIndex: value,
                    width,
                    fixed
                });
            });
        })
    }
    getScollX() {
        const { type, tabIndex } = this.props;
        let xWidth = 0;
        ['normal', 'quota'].forEach(key => {
            config[type][tabIndex].options[key].forEach(item => {
                const { width = 0 } = item;
                xWidth += width;
            });
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