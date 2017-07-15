import React, { Component } from 'react';
import {
    Modal,
    Menu,
    Message,
    Dropdown,
    Spin,
    Form,
    Input
} from 'antd';
import styles from './index.scss';

const FormItem = Form.Item;
const Item = Menu.Item;
const menuList = [{
    name: '创建时间',
    sortKey: 'createTime'
}, {
    name: '访问用户',
    sortKey: 'uv'
}, {
    name: '点击数',
    sortKey: 'clickNum'
}, {
    name: '错误数',
    sortKey: 'errorCount'
}]

class AppsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddAppModal: false
        };
    }
    // 显隐 Modal
    toggleAddAppModal() {
        this.setState({
            showAddAppModal: !this.state.showAddAppModal
        });
    }
    // 新建应用
    addApp() {
        const { addApp } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                addApp(values).then(res => {
                    if (res.isExists || res.isExists === 'true') {
                        Message.error('应用已存在');
                    } else {
                        // Message.success('应用创建成功');
                        this.toggleAddAppModal();
                    }
                });
            }
        });
    }
    render() {
        const { sortBy, sortKey } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { showAddAppModal } = this.state;
        return (
            <div className={styles['apps-bar']}>
                <div className={cls('btn', styles['create-app'])} onClick={this.toggleAddAppModal.bind(this)}><i className={cls('fa fa-plus')}></i>应用</div>
                <div className={styles['btn-wrapper']}>
                    <Dropdown overlay={(
                        <Menu onSelect={({ key }) => sortBy(key)} selectedKeys={[sortKey]}>
                            {
                                menuList.map((item, index) => {
                                    return (
                                        <Item key={item.sortKey}>{item.name}</Item>
                                    );
                                })
                            }
                        </Menu>
                    )} trigger={['click']}>
                        <div className={cls('btn', styles['sort-app'])}><i className={cls('fa fa-sort-amount-desc')}></i></div>
                    </Dropdown>
                    {/*<div className={cls('btn', styles['tabs-grid'])}>GRID</div>
                    <div className={cls('btn', styles['tabs-table'])}>TABLE</div>*/}
                </div>
                <Modal footer={null} visible={showAddAppModal} onCancel={this.toggleAddAppModal.bind(this)}>
                    <div className={styles['create-app-form-wrap']}>
                        <div className={styles['create-app-title']}>应用名称</div>
                        <Form className={styles['create-app-form']}>
                            <FormItem>
                                {getFieldDecorator('appName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入应用名称'
                                    }],
                                })(<Input placeholder="请输入应用名称" />)}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('url', {
                                    rules: [{
                                        required: true,
                                        message: '请输入Url'
                                    }],
                                })(<Input placeholder="请输入Url" />)}
                            </FormItem>
                            <div className={cls('btn')} onClick={this.addApp.bind(this)}>保存</div>
                            <div className={cls('btn')} onClick={this.toggleAddAppModal.bind(this)}>取消</div>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(AppsBar);