import React, { Component } from 'react';
import styles from './index.scss'

// 自定义的Timeline组件  应用位置: 设置 > 部署说明
export default class Timeline extends Component {
  render() {
    return (
      <div >
        {this.props.children}
      </div>
    )
  }
}

/**
 * hasline: 圆形icon下面是否有一条直线，默认为true
 */
Timeline.Item = class Item extends Component {
  render() {
    const { iconContent } = this.props;
    return (
      <div className={styles.item}>
        <div className={styles.icon}>{iconContent}</div>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    )
  }
}

