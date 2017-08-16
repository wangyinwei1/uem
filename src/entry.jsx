import React from "react";
import ReactDOM from "react-dom";
import { useStrict } from 'mobx';
import { message } from 'antd';

import { AppContainer } from 'react-hot-loader';
import App from './App'

// 样式
import './assets/styles/fontawesome.css';
import './assets/styles/iconfont.css';
import './assets/styles/base.scss';
import './assets/styles/common.scss';

useStrict(true);

// antd 全局设置
message.config({
    duration: 3
});

if (process.env.NODE_ENV === 'development') {
    window.USER_INFO = {
        tenantId: 'e0a67e986a594a61b3d1e523a0a39c77',
        userId: 'e0a67e986a594a61b3d1e523a0a39c77'
    };
    let theme = document.cookie.split(';').some(item => { return item.indexOf('skin') > -1}) ? document.cookie.split(';').filter(str => {return str.indexOf('skin') != -1 })[0].split('=')[1] : 'blue';
    localStorage.setItem('UEM_skin', theme)
}

if (true) {
    // 线上从cookie里取，没有的话用默认值，有的话存在localStorage里，以便以后调用。
    let theme = document.cookie.split(';').some(item => { return item.indexOf('skin') > -1}) ? document.cookie.split(';').filter(str => {return str.indexOf('skin') != -1 })[0].split('=')[1] : 'blue';
    let language = document.cookie.split(';').some(item => { return item.indexOf('language') > -1}) ? document.cookie.split(';').filter(str => {return str.indexOf('language') != -1 })[0].split('=')[1] : 'zh_CN';
    localStorage.setItem('UEM_skin', theme)
    localStorage.setItem('UEM_lang', language);
    window.colorOpacity = 0.3;
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