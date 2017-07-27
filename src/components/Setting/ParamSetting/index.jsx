import React, { Component } from 'react';
import styles from './index.scss';
import { Form, Input, Table, Button, message } from 'antd';
import { toJS } from 'mobx';

const FormItem = Form.Item;

class ParamSetting extends Component {
  constructor(props) {
    super(props);
    this.selectPeriod = this.selectPeriod.bind(this);
    this.addToWhiteList = this.addToWhiteList.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.deleteFromWhiteList = this.deleteFromWhiteList.bind(this);
    this.saveSetting = this.saveSetting.bind(this);
    this.setConfigToState = this.setConfigToState.bind(this);

    this.state = {
      reportPeriod: null,
      urls: [],
      apdex: null,
      selectedRowKeys: []
    }
  }
  componentWillReceiveProps(nextProps) {
    // 如果config更新了，同步到state
    // update后可以更新，说明修改observable对象会生成一个新的对象，而不只是修改
    if (this.props.config !== nextProps.config) {
      this.setConfigToState(nextProps.config);
    }
    // if (this.isConfigChanged(nextProps.config, this.props.config)) {
    //   this.setConfigToState(nextProps.config);
    // }
  }
  componentDidMount() {
    this.props.getConfig()
  }
  setConfigToState(config) {
    // 将state设置成纯对象，而不是observable对象
    const { urls, apdex, reportPeriod, slowLoadThreshold } = toJS(config);
    this.setState({
      reportPeriod: reportPeriod,
      urls: urls || [],
      apdex: apdex,
    })
  }
  // 数据上报周期选中项
  selectPeriod(reportPeriod) {
    this.setState({ reportPeriod });
  }
  // 白名单列表选中项
  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }
  addToWhiteList() {
    this.form.validateFields(['url'], (err, values) => {
      if (!err && values.url) {
        this.setState(prevState => ({
          urls: [
            ...prevState.urls,
            values.url
          ]
        }));
      }
    })
  }
  deleteFromWhiteList() {
    const { selectedRowKeys, urls } = this.state;
    // 留下没选中的
    const newUrls = urls.filter((url, index) => selectedRowKeys.indexOf(index) === -1);
    this.setState({
      urls: newUrls,
      selectedRowKeys: []
    });
  }
  saveSetting() {
    const { updateConfig } = this.props;
    const apdex = parseInt(this.form.getFieldValue('apdex'));
    const { reportPeriod, urls } = this.state;
    updateConfig({ reportPeriod, urls, apdex }).then(result => {
      const msg = result.message;
      if (msg === 'successful') {
        message.success(msg);
      } else {
        message.error(msg)
      }
    })
  }

  render() {
    const { selectedRowKeys, urls, reportPeriod, apdex } = this.state;
    const dataSource = urls.map((url, index) => ({ key: index, url }));
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const propsObj = {
      selectedRowKeys, urls, reportPeriod, apdex, dataSource, rowSelection,
      selectPeriod: this.selectPeriod,
      onSelectChange: this.onSelectChange,
      addToWhiteList: this.addToWhiteList,
      deleteFromWhiteList: this.deleteFromWhiteList,
      saveSetting: this.saveSetting,
    }
    return (
      // 这里的ref会有一个warning，但是按提示改成wrappedComponentRef，就得不到form实例了
      <div className={styles['param-container']}>
        <ParamSettingForm
          {...propsObj}
          ref={form => { this.form = form }}
        />
      </div>
    )
  }
}

// 之所以要把这个Form抽出来，是因为业务需要在ParamSetting组件的父组件中访问其属性和方法。Form.create()对组件做过封装之后，就访问不到原来的属性和方法了。
const ParamSettingForm = Form.create()((props) => {
  const {
    form, selectedRowKeys, urls, reportPeriod, apdex, dataSource, rowSelection, selectPeriod,
    onSelectChange, addToWhiteList, deleteFromWhiteList, saveSetting
  } = props;
  const { getFieldDecorator } = form;
  return (
    <Form>
      <div className={styles.chunk} style={{ marginTop: 0 }}>
        <span className={styles.label}>Apdex T: </span>
        <div className={styles.content}>
          <FormItem>
            <div className={styles['form-item']}>
              {getFieldDecorator('apdex', {
                rules: [
                  { required: true, message: '请输入正整数' },
                  { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
                ],
                initialValue: apdex
              })(<Input />)}
              <span>ms</span>
            </div>
          </FormItem>
          <div className={styles['apdex-warning']}>
            设置该应用的Apdex T值，即能让用户满意的页面加载时间的阈值,单位为毫秒，缺省值为2000毫秒。
          </div>
        </div>
      </div>

      <div className={styles['splite-line']}></div>
      <div className={styles.chunk}>
        <span className={styles.label}>数据上报周期: </span>
        <div className={styles.content}>
          <ul className={styles['block-select']}>
            {[30000, 60000, 90000, 120000].map(value => {
              const itemActive = cls({ [styles.active]: value === reportPeriod })
              return <li key={value} data-value={value} className={itemActive} onClick={() => selectPeriod(value)}>{value / 1000}S</li>
            })}
          </ul>
        </div>
      </div>
      <div className={styles['splite-line']}></div>

      <div className={styles.chunk}>
        <span className={styles.label}>白名单: </span>
        <div className={styles.content}>
          <FormItem>
            <div className={styles['form-item']}>
              {getFieldDecorator('url', {
                rules: [
                  //  pattern: /^https?:\/\/(\w+\.)+\w+(:\d{2,5})?$/
                  { type: 'url', message: '请输入正确的域名' }
                ]
              })(<Input placeholder="请输入域名" />)}
              <button className={styles['common-btn']} onClick={addToWhiteList}>添加到白名单</button>
            </div>
          </FormItem>
          {
            urls.length > 0 &&
            <div className={styles['white-list-table']}>
              <button className={styles['common-btn']} onClick={deleteFromWhiteList}>删除</button>
              <Table
                columns={[{ title: 'URL', dataIndex: 'url', width: "80%" }]}
                dataSource={dataSource}
                rowSelection={rowSelection}
                pagination={false}
              />
            </div>
          }

          <div className={styles['notice-tip']}>
            <p>只接收白名单中域名或IP发送的数据，如果域名带端口，必须把端口号加到URL中。</p>
            <p>举例：http://yourURL.com:8080, http://10.1.2.194:8080</p>
            <p>最后记得保存设置</p>
          </div>
          <button className={styles['save-setting-btn']} onClick={saveSetting}>保存设置</button>
        </div>
      </div>
    </Form>
  )
})

export default ParamSetting;