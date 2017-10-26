import React from "react";
import ReactDOM from "react-dom";
import { useStrict, observable, reaction } from 'mobx';
import { message } from 'antd';

import { AppContainer } from 'react-hot-loader';
import App from './App';
import echartsColor from './assets/styles/echartsColors'

// window.mobxListener = observable.shallowMap({
//     theme: 'blue'
// })
// mobxListener.set('theme', document.getElementsByTagName("html")[0].className)
// class Chart {
//     componentDidMount() {
//         reaction(
//             () => mobxListener.get("theme"),
//             setSkin => {
//                 new Chart.init("dom", theme)
//             }
//         )      
//     }
// }
// ob.set("theme", "blue")

// 样式
import './assets/styles/fontawesome.css';
import './assets/styles/iconfont.css';
import './assets/styles/base.scss';
import './assets/styles/common.scss';

// useStrict(true);

// antd 全局设置
message.config({
    duration: 3
});

if (process.env.NODE_ENV === 'development') {
    //放到dev环境下用的，实际上线，这个要注释掉。这是由由租户控制的，挂在window下
    window.USER_INFO = {
        tenantId: 'e0a67e986a594a61b3d1e523a0a39c77',
        userId: 'e0a67e986a594a61b3d1e523a0a39c77'
    };
    let theme = document.cookie.split(';').some(item => { return item.indexOf('skin') > -1 }) ? document.cookie.split(';').filter(str => { return str.indexOf('skin') != -1 })[0].split('=')[1] : 'blue';
    localStorage.setItem('UEM_skin', theme)
}

if (true) {
    // 线上从cookie里取，没有的话用默认值，有的话存在localStorage里，以便以后调用。
    let theme = document.cookie.split(';').some(item => { return item.indexOf('skin') > -1 }) ? document.cookie.split(';').filter(str => { return str.indexOf('skin') != -1 })[0].split('=')[1] : 'blue';
    let language = document.cookie.split(';').some(item => { return item.indexOf('language') > -1 }) ? document.cookie.split(';').filter(str => { return str.indexOf('language') != -1 })[0].split('=')[1] : 'zh_CN';
    localStorage.setItem('UEM_skin', theme)
    localStorage.setItem('UEM_lang', language);
    window.colorOpacity = 0.3;
    
    // echarts的换肤方法
    // window.changeEchartTheme = (name) => {
    //     if(!echartsColor[name]){
    //        throw `没有找到相对应的颜色变量 ···  请在theme 中设置对应 的 ${name} 颜色字段`;
    //     }
    //     return echartsColor[name][localStorage.getItem('UEM_skin')];
    // }

    //放到dev环境下用的，实际上线，这个要注释掉。这是由由租户控制的，挂在window下
    // window.USER_INFO = {
    //     tenantId: 'e0a67e986a594a61b3d1e523a0a39c77',
    //     userId: 'e0a67e986a594a61b3d1e523a0a39c77'
    // };

    // 时间转换函数，各概况时间指标的单位自适应
    window.timeFormat = (time) => {
        let newTimeFormat;
        if (time == null) {
            newTimeFormat = '--';
        } else if (time < 1 && time != 0) {
            newTimeFormat = parseInt((time * 1000).toFixed(3).substr(0, 5)) + 'ms'
        } else if (time > 60 && time < 60 * 60) {
            newTimeFormat = parseInt(time / 60.0) + 'min' + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + 's'
        } else if (time > 3600 && time < 3600 * 24) {
            // 时长大于一小时小于一天
            newTimeFormat = parseInt(time / 3600.0) + 'h' +
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) + 'min' +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "s";
        } else {
            newTimeFormat = (time).toFixed(1) + 's';
        }
        return newTimeFormat;
    }
}

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            {Component}
        </AppContainer>,
        document.getElementById('react')
    );
};

render(<App />);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(<NextApp />);
    });
}