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
    this.handleEditOk = this.handleEditOk.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.toggleSendEmailModal = this.toggleSendEmailModal.bind(this);
    this.openSendEmailModal = this.openSendEmailModal.bind(this);
    this.handleEmailOk = this.handleEmailOk.bind(this);
    this.handleSendEmailCancel = this.handleSendEmailCancel.bind(this);
    this.openVideoModal = this.openVideoModal.bind(this);
    this.handleVideoCancel = this.handleVideoCancel.bind(this);
    this.state = {
      editVisible: false,
      sendEmailVisible: false,
      videoVisible: false
    }
    // ${this.code.slice(8).slice(0,-9)}
    this.code = `<script>(function(win,doc){win.YYRUM={};YYRUM.info={appId:${this.props.appInfo.appId},beacon:'http://web.uyundev.cn/connect',agent:'http://web.uyundev.cn/buriedPoint/YYRUM.js'};var loadSource={createScript:function(src){var d=doc,f=d.getElementsByTagName('script')[0],s=d.createElement('script');s.type='text/javascript';s.src=src; f.parentNode.insertBefore(s,f);return s;}};var script=loadSource.createScript(YYRUM.info.agent);win.onerror=function(msg, url,line,col,error){YYRUM.info.errorData={msg:msg,url:url,line:line,col:col,error:error}};if(script.readyState){script.onreadystatechange=function(){if(script.readyState=='loaded'||script.readyState=='complete'){script.onreadystatechange=null; YYRUM.report.installGlobalHandler()}};}else{script.onload=function(){YYRUM.report.installGlobalHandler()};}})(window,document)</script>`;
    this.content = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>你好：<br>&nbsp;&nbsp;&nbsp;&nbsp;我们是优云团队！你的同事 %s(%s) 请求您为应用: %s <br>部署监测代码，以实现用户体验监控。<br>
      &nbsp;&nbsp;&nbsp;&nbsp;为保证数据采集的正确进行，请将以下代码部署到Web项目中，尽可能保证代码覆<br>盖整个项目，通常只需在您项目中公共的页头文件加入即可。<br>
      ************************************************************************************************************************************************************<br>
      &lt;script&gt; ${this.code.match(/\<script\>(.+)\<\/script\>/)[1]}&lt;/script&gt;<br>
      ************************************************************************************************************************************************************<br>
      （拷贝到&lt;meta&gt;标签之后，&lt;script&gt;标签之前）<br>
      <br>
      <br>
      如需其他帮助，请访问 优云官网 联系我们的客服。<br>
      <br>
      此致<br>
      &nbsp;&nbsp;&nbsp;优云团队<br>
      </html>`
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
  handleEmailOk() {
    const { validateFields } = this.sendEmailForm;
    validateFields((err, values) => {
      if (!err) {
        const { sendEmail } = this.props;
        const emailObj = {
          receiver: values.emailAddress,
          appId: this.props.appInfo.appId,
          content: this.content,
          title: '请求您协助为应用部署监测代码',
          userId: window.USER_INFO.userId
        };
        sendEmail(emailObj).then(result => {
          if (result.message === 'successful') {
            message.success(result.message);
            this.handleSendEmailCancel();
          } else {
            message.error(result.message)
          }
        });
      }
    })
  }
  handleEditOk() {
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
    const { appName, url } = this.props.appInfo;
    this.editModalForm.setFieldsValue({ appName, url });
    this.toggleEditModal(true);
  }
  toggleSendEmailModal(sendEmailVisible) {
    this.setState({ sendEmailVisible });
  }
  openSendEmailModal() {
    this.toggleSendEmailModal(true);
  }
  handleSendEmailCancel() {
    this.toggleSendEmailModal(false);
    this.sendEmailForm.setFieldsValue({ emailAddress: '' });
  }
  openVideoModal() {
    this.setState({videoVisible: true})
  }
  handleVideoCancel(){
    this.setState({videoVisible: false});
  }

  render() {
    const { appInfo } = this.props;
    return (
      <div className={styles['depoly-container']}>
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
              <textarea className={styles.code} readOnly ref={input => this.input = input} defaultValue={this.code} />
              <div className={styles['notice-wrapper']}>
                <span className={styles.notice}>为保证数据采集的正确进行，请将代码部署到head标签之内，最好在head标签内的所有script标签之前
                  <span className={styles['link-mv']} onClick={this.openVideoModal}>视频帮助</span>
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
          handleEditOk={this.handleEditOk}
          toggleEditModal={this.toggleEditModal}
          ref={form => { this.editModalForm = form }}
        />
        <SendEmailModal
          sendEmailVisible={this.state.sendEmailVisible}
          handleSendEmailCancel={this.handleSendEmailCancel}
          handleEmailOk={this.handleEmailOk}
          ref={form => { this.sendEmailForm = form }}
        />
        <Modal
          visible={this.state.videoVisible}
          onCancel={this.handleVideoCancel}
          footer={null}
          width={600}
        >
          <video src="http://web.uyundev.cn/movie/deploy.mp4" width="600" height="400" controls>
            您的浏览器不支持Video标签。
          </video>
        </Modal>
      </div >

    )
  }
}

const EditInformationModal = Form.create()(({ editVisible, handleEditOk, toggleEditModal, form }) => {
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={editVisible}
      onOk={handleEditOk}
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
          <Button key="back" size="large" type="primary" onClick={handleEditOk}>保存</Button>
          <Button key="submit" type="primary" size="large" onClick={() => toggleEditModal(false)}>取消</Button>
        </div>
      </Form>
    </Modal>
  )
});

const SendEmailModal = Form.create()(({ sendEmailVisible, handleSendEmailCancel, handleEmailOk, form }) => {
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={sendEmailVisible}
      onCancel={handleSendEmailCancel}
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
        <Button type="primary" size="large" onClick={handleEmailOk}>发送</Button>
      </Form>
    </Modal>
  )
})

export default DeployInstruction;