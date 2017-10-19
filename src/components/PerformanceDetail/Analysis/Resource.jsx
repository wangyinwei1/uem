import React from 'react';
import { Table } from 'antd';
import { tableConfig } from './config';
import styles from './index.scss';

export default class Resource extends React.Component {
    // static contextTypes = {
    //     type: React.PropTypes.string.isRequired,
    //     onChangeType: React.PropTypes.func.isRequired,
    // }
    btn = [{
        label: 'All',
        value: 'all'
    }, {
        label: 'JS',
        value: 'js'
    }, {
        label: 'CSS',
        value: 'css'
    }, {
        label: 'XHR',
        value: 'xhr'
    }, {
        label: 'Img',
        value: 'img'
    }, {
        label: 'Font',
        value: 'font'
    }]
    changeType(type) {
        this.props.changeType({
            type
        });
    }
    changePageIndex(pageIndex, pageSize) {
        this.props.changeResourcePage({
            pageIndex
        });
    }
    render() {
        const {
            type
        } = this.props;
        const {
            data,
            total,
            pageIndex,
        } = this.props.data;
        // const mockdata = [{
        //     key: '1',
        //     resName: "http://10.1.51.113:8080/kb/rest/mywork/00000000000000000000000000000000000000000000000000000000000000000000000",
        //     time: 4,
        //     max: 10
        // }, {
        //     key: '2',
        //     resName: "http://10.1.51.113:8080/kb/rest/mywork/000000000000000000000000000000000000000000000000000000000000000000000000",
        //     time: 7,
        //     max: 10
        // }]
        return (
            <div className={styles['resource']}>
                <div className={styles['title']}>
                    <span>{locale('慢交互资源分解图')}</span>
                    <ul className={styles['btns']}>
                        {this.btn.map(item =>
                            <li
                                className={cls({
                                    [styles['active']]: item.value === type
                                })}
                                key={item.value}
                                onClick={this.changeType.bind(this, item.value)}
                            >{item.label}</li>
                        )}
                    </ul>
                </div>
                <div className={styles['main']}>
                    <Table
                        columns={tableConfig.columns}
                        dataSource={data.toJS()}
                        pagination={{
                            current: pageIndex,
                            total: total,
                            onChange: this.changePageIndex.bind(this)
                        }}
                    />
                </div>
            </div>
        );
    }
}