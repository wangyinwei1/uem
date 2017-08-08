import React, { Component } from 'react';
import styles from './index.scss';
import { Form, Input, Table, Button, message, Upload, Switch } from 'antd';

export default class VersionSetting extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.getVersionSettings();
    }
    handleChange(checked, record) {
        this.props.updateVersionStatus({ status: Number(checked) + '', version: record.version }).then(result => {
            message.success(result.message)
        }).catch(result => {
            message.error(result.message);
        })
    }
    render() {
        const { versionSettings } = this.props;
        const dataSource = versionSettings.map((setting, index) => ({ key: index, ...setting }));
        const columns = [
            {
                title: locale('版本'),
                dataIndex: 'version'
            },
            {
                title: locale('状态'),
                dataIndex: 'status',
                render: (text, record) => {
                    return <Switch checked={Boolean(+text)} onChange={(checked) => this.handleChange(checked, record)} />
                }
            },
            {
                title: locale('发布时间'),
                dataIndex: 'releaseTime'
            },
            {
                title: locale('操作次数'),
                dataIndex: 'action',
                render: (text, record) => <Upload><button className={styles.uploadBtn} type="file">上传符号表</button></Upload>
            }
        ]
        return (
            <div className={styles['version-setting-container']}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </div>
        )
    }

}
