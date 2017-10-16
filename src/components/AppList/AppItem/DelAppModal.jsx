import React, { Component } from 'react';
import {
  Modal,
  Button
} from 'antd';
import styles from './DelAppModal.scss';

export default class DelAppModal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      showDelAppModal,
      toggleDelAppModal,
      delApp,
      seconds
    } = this.props;

    const delBtnDisabled = seconds > 0;
    const showSeconds = seconds > 0 ? `(${seconds})` : '';
    return (
      <Modal
        visible={showDelAppModal}
        onCancel={(e) => toggleDelAppModal(false, e)}
        footer={null}
        maskClosable={false}
        wrapClassName={styles['delete-modal']}
      >
        <p className={styles['title']}>{locale('删除应用之后数据无法恢复，您确认删除该应用吗？')}</p>
        <div className={styles['btn-wrapper']}>
          <Button type="primary" size="large" onClick={delApp} disabled={delBtnDisabled}>{locale('确定') + showSeconds}</Button>
          <Button type="primary" size="large" onClick={(e) => toggleDelAppModal(false, e)}>{locale('取消')}</Button>
        </div>
      </Modal>
    )
  }
}