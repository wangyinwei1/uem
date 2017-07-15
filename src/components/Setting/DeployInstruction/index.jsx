import React, { Component } from 'react';
import styles from './index.scss';
import { Icon } from 'antd';
import Timeline from '../../Common/Timeline';

const Item = Timeline.Item;

export default class DeployInstruction extends Component {
  render() {
    const { appInfo } = this.props;
    return (
      <div className={styles.container}>
        <Timeline>
          <Item iconContent="1">
            <div className={styles['app-information']}>
              <h3>应用信息 <span className={styles.edit}><Icon type="edit" />编辑</span></h3>
              <ul>
                <li>应用名称：{appInfo.appName}</li>
                <li>URL：{appInfo.url}</li>
                <li>应用ID：{appInfo.appId}</li>
              </ul>
            </div>
          </Item>
          <Item iconContent="2">
            <div className={styles['app-deploy']}>
              <span>如果您是技术人员，拷贝以下代码到您的Web项目中：</span>
              <textarea className={styles.code} disabled readonly>
                {
                  `<script>(function(win,doc){win.YYRUM={};YYRUM.info={appId:${appInfo.appId},beacon:'http://web.uyundev.cn/connect',agent:'http://web.uyundev.cn/buriedPoint/YYRUM.js'};var loadSource={createScript:function(src){var d=doc,f=d.getElementsByTagName('script')[0],s=d.createElement('script');s.type='text/javascript';s.src=src; f.parentNode.insertBefore(s,f);return s;}};var script=loadSource.createScript(YYRUM.info.agent);win.onerror=function(msg, url,line,col,error){YYRUM.info.errorData={msg:msg,url:url,line:line,col:col,error:error}};if(script.readyState){script.onreadystatechange=function(){if(script.readyState=='loaded'||script.readyState=='complete'){script.onreadystatechange=null; YYRUM.report.installGlobalHandler()}};}else{script.onload=function(){YYRUM.report.installGlobalHandler()};}})(window,document)</script>`
                }
              </textarea>
            </div>
          </Item>
          <Item iconContent="3" hasline={false} />
        </Timeline>
      </div>

    )
  }
}