import React, { Component } from 'react';
import styles from './index.scss';
import { Input } from 'antd';

export default class UserDataModel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['model-container']}>
          用户数据模型
      </div>
    )
  }
}