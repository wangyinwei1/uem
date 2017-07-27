import React, { Component } from 'react';
import styles from './index.scss';
import { Input, Button, Table, Modal, message, Form, Select } from 'antd';
import { toJS } from 'mobx';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class UserDataModel extends Component {
  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openOperationModal = this.openOperationModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onOK = this.onOK.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      visible: false,
      deleteModalVisible: false,
      selectedRowKeys: [],
      isKeyDisable: false,
      isCalculationDisable: false,
      title: ''
    }
  }
  componentDidMount() {
    this.props.getUserDataModelList();
  }
  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }
  toggleDeleteModal(deleteModalVisible) {
    this.setState({ deleteModalVisible });
  }
  toggleModal(visible) {
    this.setState({ visible });
  }
  onCancel() {
    this.toggleModal(false);
    this.operationForm.resetFields();
  }
  openOperationModal(type, record) {
    const { setFieldsValue } = this.operationForm;
    if (type === 'edit' && record) {
      this.setState({
        title: '编辑属性',
        isKeyDisable: true,
        isCalculationDisable: false
      })
      setFieldsValue(record);
    } else if (type === 'add') {
      this.setState({
        title: '添加属性',
        isKeyDisable: false,
        isCalculationDisable: true
      })
    }
    this.toggleModal(true);
  }
  onOK() {
    this.operationForm.validateFields((err, values) => {
      if (!err) {
        this.props.saveUserDataModel(values).then(result => {
          message.success(result.message);
          this.toggleModal(false);
        }).catch(result => {
          message.error(result.message);
        })
      }
    });
  }
  onDelete() {
    const { selectedRowKeys } = this.state;
    this.props.deleteUserDataModel({ key: selectedRowKeys }).then(result => {
      this.toggleDeleteModal(false);
      message.success(result.message);
    }).catch(result => {
      message.error(result.message)
    })

  }
  // {"data":[{"calculation":"override","description":"213123","displayName":"232","key":"232","typeOfData":"text"},{"calculation":"override","description":"test","displayName":"test","key":"test","typeOfData":"text"},{"calculation":"counter","description":"test2","displayName":"test2","key":"test2","typeOfData":"number"}],"status":false,"total":3}
  render() {
    const { userDataModelList } = this.props;
    const { selectedRowKeys, deleteModalVisible, visible, title, isKeyDisable, isCalculationDisable } = this.state;
    const columns = [
      { title: '属性', dataIndex: 'key' },
      { title: '显示名', dataIndex: 'displayName' },
      { title: '数据类型', dataIndex: 'typeOfData' },
      { title: '计算方式', dataIndex: 'calculation' },
      { title: '描述', dataIndex: 'description' },
    ]
    const dataSource = toJS(userDataModelList);
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className={styles['user-model-container']}>
        <div className={styles.description}>
          <p>用户数据模型允许自定义用户属性，例如姓名、E-mail、公司、年龄、性别等，便于还原完整的用户信息。目前系统最多允许接入10个自定义用户属性。</p>
          <p><a href="./src/help/1apishuo_ming.html" target="_blank">查看用户属性接入API</a></p>
        </div>
        <div className={styles['operation']}>
          <div className={styles['btn-wrapper']}>
            <Button type="primary" disabled={!hasSelected} size="large" onClick={() => this.toggleDeleteModal(true)}>删除</Button>
            <Button type="primary" size="large" onClick={() => this.openOperationModal('add')}>添加</Button>
          </div>
          <div className={styles['operation-table']}>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              rowSelection={rowSelection}
              onRowClick={(record) => this.openOperationModal('edit', record)}
            />
          </div>
        </div>
        <Modal
          visible={deleteModalVisible}
          onCancel={() => this.toggleDeleteModal(false)}
          footer={null}
          maskClosable={false}
          wrapClassName={styles['delete-modal']}
        >
          <h2 className={styles['title']}>你确定要删除吗？</h2>
          <div className={styles['btn-wrapper']}>
            <Button type="primary" size="large" onClick={this.onDelete}>确定</Button>
            <Button type="primary" size="large" onClick={() => this.toggleDeleteModal(false)}>取消</Button>
          </div>
        </Modal>

        <OpeartionFormModal
          ref={form => { this.operationForm = form; }}
          visible={visible}
          toggleModal={this.toggleModal}
          onOK={this.onOK}
          onCancel={this.onCancel}
          title={title}
          isKeyDisable={isKeyDisable}
          isCalculationDisable={isCalculationDisable}
        />
      </div>
    )
  }
}

const OpeartionFormModal = Form.create()(props => {
  const { form, visible, onOK, row = {}, onCancel, title, isKeyDisable, isCalculationDisable } = props
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
      wrapClassName={styles['opeartion-modal']}
      width="390px"
    >
      <Form>
        <FormItem label="属性">
          {getFieldDecorator('key', {
            rules: [{ required: true, message: '该字段不能为空' }]
          })(<Input placeholder="对应API的Key值" disabled={isKeyDisable}/>)}
        </FormItem>
        <FormItem label="显示名">
          {getFieldDecorator('displayName', {
            rules: [{ required: true, message: '该字段不能为空' }]
          })(<Input />)}
        </FormItem>
        <FormItem label="数据类型">
          {getFieldDecorator('typeOfData')(
            <Select dropdownClassName={styles['override-dropdown']}>
              <Option value="text">文本</Option>
              <Option value="nubmer">数字</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="计算方式">
          {getFieldDecorator('calculation', {
            initialValue: 'override'
          })(
            <Select dropdownClassName={styles['override-dropdown']} disabled={isCalculationDisable}>
              <Option value="override">覆盖之前</Option>
              <Option value="counter">累计求和</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="描述">
          {getFieldDecorator('description', {
            initialValue: '',
            rules: [{ required: true, message: '请填写描述' }]
          })(<Input type="textarea" />)}
        </FormItem>
        <div className={styles['btn-wrapper']}>
          <Button type="primary" size="large" onClick={onOK}>保存</Button>
          <Button type="primary" size="large" onClick={onCancel}>取消</Button>
        </div>
      </Form>
    </Modal>
  )
})