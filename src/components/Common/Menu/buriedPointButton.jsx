
import React from "react";
import {Input, Select, Modal, Button} from 'antd';
import styles from './buriedPointButton.scss';

const {Option} = Select;


export default class PointButton extends React.Component {
    //创建From 表单
    buriedPoint() {
        const origin = window.location.origin;
        const { appId, platform } = this.props;
        // let url;
        // let urlSrc = localStorage.getItem('visual-src' + appId);
        // if (!!urlSrc) {
        //     url = JSON.parse(urlSrc).url;
        // }
        let code = "<script> (function(win, doc) {win.YYRUM = {}; YYRUM.info = {appId:'" + appId + "',beacon:'" + origin + '/connect' + "', agent: '" + origin + '/buriedPoint/YYRUM.js' + "'}; var loadSource = {createScript: function(src) {var d = doc, f = d.getElementsByTagName('script')[0], s = d.createElement('script'); s.type = 'text/javascript'; s.src = src; f.parentNode.insertBefore(s, f); return s; } }; var script = loadSource.createScript(YYRUM.info.agent); win.onerror = function(msg, url, line, col, error) {YYRUM.info.errorData = {msg: msg, url: url, line: line, col: col, error: error } }; if (script.readyState){   script.onreadystatechange = function() {if (script.readyState == 'loaded' || script.readyState == 'complete') {script.onreadystatechange = null; YYRUM.report.installGlobalHandler() } }; } else { script.onload = function() {YYRUM.report.installGlobalHandler() }; } })(window, document) </script>";
        // document.cookie = "uyun-visual-src=" + encodeURIComponent(this.filterUrl(localStorage.appUrl));
        document.cookie = "uyun-visual-src=" + encodeURIComponent(this.filterUrl(localStorage.appUrl));
        document.cookie = "uyun-appId=" + appId;
        // document.cookie = "uyun-deploy-code=" + encodeURIComponent(code);
        document.cookie = "uyun-platform=" + platform;
    }
    filterUrl(url : any) : string {
        let filter = /^http(s|)/g;
        if (filter.test(url)) {
            return url;
        } else {
            return url = "http://" + url;
        }
    }
    render() {
        const { platform, theme } = this.props;
        // cookie,localStorage,sessionStorage受同源策略所限，无法跨域。使用url传参。
        let language = localStorage.getItem("UEM_lang") ? localStorage.getItem("UEM_lang") : 'zh_CN';
        if (platform === 'pc') {
            return (
                <div className={styles["pointButton"]} onClick={this.buriedPoint.bind(this)}>
                    <i className={cls("iconfont icon-maidian")} style={{'color':'#fff'}}></i>
                    <a href={`/buriedPoint/visual.html?protocol=${location.protocol.replace(':', '')}&theme=${theme}&language=${language}`} target="_blank" id="pointButton">{this.props.children}</a>
                </div>
            );
        }else{
            return (
            <div className={styles["pointButton"]} onClick={this.buriedPoint.bind(this)}>
                <i className={cls("iconfont icon-maidian")} style={{'color':'#fff'}}></i>
                <a href={`/buriedPointMobile/#/?theme=${theme}&language=${language}`} target="_blank" id="pointButton">{this.props.children}</a>
            </div>
        );

        }
        
    }
}

// export default immutablePureRender(PointButton);
