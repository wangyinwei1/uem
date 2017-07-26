import React, { Component } from 'react';
import styles from './index.scss';
import { Input, Button } from 'antd';

export default class UserDataModel extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUserDataModelList();
  }

  render() {
    const { userDataModelList } = this.props;
    return (
      <div className={styles['user-model-container']}>
        <div className={styles.description}>
          <p>用户数据模型允许自定义用户属性，例如姓名、E-mail、公司、年龄、性别等，便于还原完整的用户信息。目前系统最多允许接入10个自定义用户属性。</p>
          <p><a href="./src/help/1apishuo_ming.html" target="_blank">查看用户属性接入API</a></p>
        </div>
        <div className={styles['operation']}>
          <div className={styles['btn-wrapper']}>
            <Button type="primary" disabled>删除</Button>
            <Button type="primary">添加</Button>
          </div>
          <div className={styles['operation-table']}>
            <pre>{userDataModelList[0]}</pre>
          </div>
        </div>
      </div>
    )
  }
}