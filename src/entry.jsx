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
}

if (true) {
    localStorage.setItem('UEM_lang', 'zh_CN');
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