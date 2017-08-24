import React from "react";
import { Provider } from 'mobx-react';
import { HashRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import isRedirect from './utils/isRedirect';

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
        <Provider {...stores} >
            <HashRouter>
                <Frame>
                    <Switch>
                        <Redirect exact from="/" to="/app_list" />
                        <Route path="/app_list" component={AppList} />
                        <Route path="/overview" render={() => (
                            isRedirect()
                            ? <Overview />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/performance_browse" render={() => (
                            isRedirect()
                            ? <PerformanceBrowse />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/performance_overview" render={() => (
                            isRedirect()
                            ? <PerformanceOverview />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/performance_interactive" render={() => (
                            isRedirect()
                            ? <PerformanceInteractive />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/error_table" render={() => (
                            isRedirect()
                            ? <ErrorTable />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/user_table" render={() => (
                            isRedirect()
                            ? <UserTable />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/heatmap_list" render={() => (
                            isRedirect()
                            ? <HeatmapList />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/setting" render={() => (
                            isRedirect()
                            ? <Setting />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/error_overview" render={() => (
                            isRedirect()
                            ? <ErrorOverview />
                            : <Redirect to="/app_list" />
                        )} />
                        <Route path="/user_overview" render={() => (
                            isRedirect()
                            ? <UserOverview />
                            : <Redirect to="/app_list" />
                        )} />
                        {/* <Route component={AppList} /> */}
                    </Switch>
                </Frame>
            </HashRouter >
        </Provider>
    );
}