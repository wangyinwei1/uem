import React from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination } from 'antd';
import {
    AppBar,
    Apps
} from '../components/AppList';

@inject('frameStore', 'appListStore')
@observer
export default class AppList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {
            getApps,
        } = this.props.appListStore;

        getApps();
    }
    render() {
        const {
            appId,

            // action
            chooseApp,
            choosePlatform
        } = this.props.frameStore;
        const {
            appList,
            total,
            sortKey,
            pageSize,
            pageIndex,
            loading,

            // action
            updateApp,
            delApp,
            pageJump,
            addApp,
            sortBy
        } = this.props.appListStore;
        return (
            <div id="AppList">
                <AppBar
                    addApp={addApp}
                    sortBy={sortBy}
                    sortKey={sortKey}
                />
                <Apps
                    loading={loading}
                    list={appList}
                    updateApp={updateApp}
                    delApp={delApp}
                    chooseApp={chooseApp}
                    choosePlatform={choosePlatform}
                />
                <Pagination
                    showTotal={total => '总共 ' + total + ' 个应用'}
                    current={pageIndex}
                    total={total}
                    pageSize={pageSize}
                    onChange={index => pageJump(index)}
                />
            </div>
        );
    }
}