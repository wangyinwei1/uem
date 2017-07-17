import React from "react";
import { Provider } from 'mobx-react';
import { HashRouter, Redirect, Route, Switch, Link } from 'react-router-dom';

// 容器
import {
    Frame,
    AppList,
    Overview,
    PerformanceOverview,
    PerformanceBrowse,
    PerformanceInteractive,
    ErrorTable,
    UserTable,
    HeatmapList,
    Setting,
    ErrorOverview,
    UserOverview
} from './containers';
// 状态
import stores from './stores';

export default function App() {
    return (
        <Provider {...stores}>
            <HashRouter>
                <Frame>
                    <Switch>
                        <Redirect exact from="/" to="/app_list" />
                        <Route path="/app_list" component={AppList} />
                        <Route path="/overview" component={Overview} />
                        <Route path="/performance_browse" component={PerformanceBrowse} />
                        <Route path="/performance_overview" component={PerformanceOverview} />
                        <Route path="/performance_interactive" component={PerformanceInteractive} />
                        <Route path="/error_table" component={ErrorTable} />
                        <Route path="/user_table" component={UserTable} />
                        <Route path="/heatmap_list" component={HeatmapList} />
                        <Route path="/setting" component={Setting} />
                        <Route path="/error_overview" component={ErrorOverview} />
                        <Route path="/user_overview" component={UserOverview} />
                        {/* <Route component={AppList} /> */}
                    </Switch>
                </Frame>
            </HashRouter >
        </Provider>
    );
}