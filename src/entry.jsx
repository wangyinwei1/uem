import React from "react";
import ReactDOM from "react-dom";
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { HashRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import { message } from 'antd';

// 状态
import stores from './stores';

// 容器
import {
    Frame,
    AppList,
    Overview,
    PerformanceBrowse,
    PerformanceOverview
} from './containers';

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

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <Frame>
                <Switch>
                    <Redirect exact from="/" to="/app_list" />
                    <Route exact path="/app_list" component={AppList} />
                    <Route path="/overview" component={Overview} />
                    <Route path="/performance_browse" component={PerformanceBrowse} />
                    <Route path="/performance_overview" component={PerformanceOverview} />
                    {/*<Route component={AppList} />*/}
                </Switch>
            </Frame>
        </HashRouter >
    </Provider>
    , document.getElementById("react")
);