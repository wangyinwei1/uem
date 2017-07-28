import React, { Component } from 'react';
import styles from './index.scss';
import { Form, Input, Table, Button, message } from 'antd';
import { toJS } from 'mobx';

const FormItem = Form.Item;

class ParamSettingMobile extends Component {
  constructor(props) {
    super(props);
    this.selectPeriod = this.selectPeriod.bind(this);
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
    if (this.props.config !== nextProps.config) {
      this.setConfigToState(nextProps.config);
    }
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

  saveSetting() {
    const { updateConfig } = this.props;
    const { reportPeriod, urls, apdex } = this.state;
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
    const { reportPeriod } = this.state;
    return (
      <div className={styles['param-container']}>
        <div className={styles.chunk}>
          <span className={styles.label}>数据上报周期: </span>
          <div className={styles.content}>
            <ul className={styles['block-select']}>
              {[30000, 60000, 90000, 120000].map(value => {
                const itemActive = cls({ [styles.active]: value === reportPeriod })
                return <li key={value} data-value={value} className={itemActive} onClick={() => this.selectPeriod(value)}>{value / 1000}S</li>
              })}
            </ul>
            <button className={styles['save-setting-btn']} style={{marginTop: '70px'}}onClick={this.saveSetting}>保存设置</button>
          </div>
        </div>
      </div>
    )
  }
}


export default ParamSettingMobile;