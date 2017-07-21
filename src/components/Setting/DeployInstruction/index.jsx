import React, { Component } from 'react';
import styles from './index.scss';
import { Icon, message, Modal, Form, Input, Button } from 'antd';
import Timeline from '../../Common/Timeline';
import { Link } from 'react-router-dom';

const Item = Timeline.Item;
const FormItem = Form.Item;



class DeployInstruction extends Component {
  constructor(props) {
    super(props);
    this.copyCode = this.copyCode.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleEditOK = this.handleEditOK.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.toggleSendEmailModal = this.toggleSendEmailModal.bind(this);
    this.openSendEmailModal = this.openSendEmailModal.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.handleSendEmailCancel = this.handleSendEmailCancel.bind(this);
    this.state = {
      editVisible: false,
      sendEmailVisible: false
    }
  }
  copyCode() {
    this.input.select();
    const isSuccess = document.execCommand('copy');
    this.input.blur();
    if (isSuccess) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
  }
  toggleEditModal(editVisible) {
    this.setState({ editVisible });
  }
  handleEditOK() {
    const { validateFields } = this.editModalForm;
    const { appId } = this.props.appInfo;
    const { updateAppInfo, updateAppInfoOnFront } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const appInfo = {
          ...values,
          appId
        };
        updateAppInfo(appInfo).then(result => {
          if (result.message === 'successful') {
            message.success(result.message);
            // 后端更新成功后，更新前端store存储的数据
            updateAppInfoOnFront(appInfo);
            this.toggleEditModal(false);
          } else {
            message.error(result.message)
          }
        })
      }
    });
  }
  openEditModal() {
    this.toggleEditModal(true);
    const { appName, url } = this.props.appInfo;
    this.editModalForm.setFieldsValue({ appName, url });
  }
  toggleSendEmailModal(sendEmailVisible) {
    this.setState({ sendEmailVisible });
  }
  openSendEmailModal() {
    this.toggleSendEmailModal(true);
  }
  handleSendEmailCancel() {
    this.toggleSendEmailModal(false);
    this.props.form.setFieldsValue({ emailAddress: '' });
  }
  sendEmail() {

  }
  render() {
    const { appInfo } = this.props;
    // const { getFieldDecorator } = this.editModalForm;
    const code = `<script>(function(win,doc){win.YYRUM={};YYRUM.info={appId:${appInfo.appId},beacon:'http://web.uyundev.cn/connect',agent:'http://web.uyundev.cn/buriedPoint/YYRUM.js'};var loadSource={createScript:function(src){var d=doc,f=d.getElementsByTagName('script')[0],s=d.createElement('script');s.type='text/javascript';s.src=src; f.parentNode.insertBefore(s,f);return s;}};var script=loadSource.createScript(YYRUM.info.agent);win.onerror=function(msg, url,line,col,error){YYRUM.info.errorData={msg:msg,url:url,line:line,col:col,error:error}};if(script.readyState){script.onreadystatechange=function(){if(script.readyState=='loaded'||script.readyState=='complete'){script.onreadystatechange=null; YYRUM.report.installGlobalHandler()}};}else{script.onload=function(){YYRUM.report.installGlobalHandler()};}})(window,document)</script>`
    return (
      <div className={styles['setting-container']}>
        <Timeline>
          <Item iconContent="1">
            <div className={styles['app-information']}>
              <h3>应用信息 <span className={styles.edit} onClick={this.openEditModal}><Icon type="edit" />编辑</span></h3>
              <ul>
                <li>应用名称：{appInfo.appName}</li>
                <li>URL：{appInfo.url}</li>
                <li>应用ID：{appInfo.appId}</li>
              </ul>
            </div>
          </Item>
          <Item iconContent="2">
            <div className={styles['app-deploy']}>
              <h3>应用部署</h3>
              <span>如果您是技术人员，拷贝以下代码到您的Web项目中：</span>
              <textarea className={styles.code} readOnly ref={input => this.input = input} defaultValue={code} />
              <div className={styles['notice-wrapper']}>
                <span className={styles.notice}>为保证数据采集的正确进行，请将代码部署到head标签之内，最好在head标签内的所有script标签之前
                  <span className={styles['link-mv']}>视频帮助</span>
                </span>
                <button className={styles['code-copy']} onClick={this.copyCode}>复制</button>
              </div>
              <p className={styles['for-help']}>我不是技术人员，部署有困难，发邮件给我公司的<a className={styles['text-underline']} onClick={this.openSendEmailModal}>技术工程师</a>帮忙部署</p>
            </div>
          </Item>
          <Item iconContent="3" hasline={false}>
            <div className={styles['app-check']}>
              <h3>查看应用</h3>
              <Link to="/overview"><button className={styles['app-btn']}>查看应用</button></Link>
              <div className={styles.tip}>应用部署成功以后，5分钟数据才会在优云平台生效。</div>
            </div>
          </Item>
        </Timeline>

        <EditInformationModal
          editVisible={this.state.editVisible}
          handleEditOK={this.handleEditOK}
          toggleEditModal={this.toggleEditModal} />
          ref = {form => this.editModalForm = form}

        {/* <Modal
          visible={this.state.sendEmailVisible}
          onCancel={this.handleSendEmailCancel}
          footer={null}
          maskClosable={false}
          wrapClassName={styles['send-email-modal']}
        >
          <Form layout="inline">
            <div className={styles['send-email-tip']}>发送部署文档到指定邮箱</div>
            <FormItem >
              {getFieldDecorator('emailAddress', {
                rules: [
                  { required: true, message: '该字段不能为空' },
                  { type: 'email', message: '邮箱格式非法' }
                ]
              })(<Input />)}
            </FormItem>
            <Button type="primary" size="large" onClick={this.sendEmail}>发送</Button>

          </Form>
        </Modal> */}

      </div >

    )
  }
}

const EditInformationModal = Form.create()((props) => {
  const { editVisible, handleEditOK, toggleEditModal, form } = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={editVisible}
      onOk={handleEditOK}
      onCancel={() => toggleEditModal(false)}
      footer={null}
      maskClosable={false}
      width="340px"
      wrapClassName={styles['edit-information-modal']}
    >
      <Form layout="vertical">
        <FormItem label="应用名称">
          {getFieldDecorator('appName', {
            rules: [{ required: true, message: '该字段不能为空' }]
          })(<Input />)}
        </FormItem>
        <FormItem label="URL">
          {getFieldDecorator('url')(<Input />)}
        </FormItem>
        <div className={styles['btn-wrapper']}>
          <Button key="back" size="large" type="primary" onClick={handleEditOK}>保存</Button>
          <Button key="submit" type="primary" size="large" onClick={() => toggleEditModal(false)}>取消</Button>
        </div>
      </Form>
    </Modal>
  )
})

export default Form.create()(DeployInstruction);