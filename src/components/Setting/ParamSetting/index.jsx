import React, { Component } from 'react';
import styles from './index.scss';
import { Form, Input, Table, Button } from 'antd';

const FormItem = Form.Item;

class ParamSetting extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.addToWhiteList = this.addToWhiteList.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.deleteFromWhiteList = this.deleteFromWhiteList.bind(this);
    this.saveSetting = this.saveSetting.bind(this);
    this.state = {
      activeValue: 120,
      urls: [],
      selectedRowKeys: []
    }
  }
  // 数据上报周期选中项
  selectItem(activeValue) {
    this.setState({ activeValue });
  }
  // 白名单列表选中项
  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }
  addToWhiteList() {
    this.props.form.validateFields(['url'], (err, values) => {
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
    const {selectedRowKeys, urls} = this.state;
    // 留下没选中的
    const newUrls = urls.filter((url, index) => selectedRowKeys.indexOf(index) === -1);
    this.setState({
      urls: newUrls,
      selectedRowKeys: []
    });
  }
  saveSetting() {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { urls, selectedRowKeys, activeValue } = this.state;
    const dataSource = urls.map((url, index) => ({key: index, url}));
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles['param-container']}>
        <Form>
          <div className={styles.chunk} style={{ marginTop: 0 }}>
            <span className={styles.label}>Apdex T: </span>
            <div className={styles.content}>
              <FormItem>
                <div className={styles['form-item']}>
                  {getFieldDecorator('apdexT', {
                    rules: [
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
                    ]
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
                {[30, 60, 90, 120].map(value => {
                  const itemActive = cls({ [styles.active]: value === activeValue })
                  return <li key={value} data-value={value} className={itemActive} onClick={() => this.selectItem(value)}>{value}S</li>
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
                  <button className={styles['common-btn']} onClick={this.addToWhiteList} > 添加到白名单</button>
                  {
                    urls.length > 0 &&
                    <div className={styles['white-list-table']}>
                      <button className={styles['common-btn']} onClick={this.deleteFromWhiteList}>删除</button>
                      <Table
                        columns={[{ title: 'URL', dataIndex: 'url', width: "80%" }]}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        pagination={false}
                      />
                    </div>
                  }
                </div>
              </FormItem>

              <div className={styles['notice-tip']}>
                <p>只接收白名单中域名或IP发送的数据，如果域名带端口，必须把端口号加到URL中。</p>
                <p>举例：http://yourURL.com:8080, http://10.1.2.194:8080</p>
                <p>最后记得保存设置</p>
              </div>
              <button className={styles['save-setting-btn']} onClick={this.saveSetting}>保存设置</button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default Form.create()(ParamSetting);