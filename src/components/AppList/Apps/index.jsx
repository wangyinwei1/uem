import React from 'react';
import {
    Spin
} from 'antd';
import {
    AppItem,
    AppTable
} from '../';
import styles from './index.scss';
// import './index'

export default class Apps extends React.Component {
    state = {
        currentAppId: null
    };
    constructor(props) {
        super(props);

        this.closeOptionList = this.closeOptionList.bind(this);
    }
    componentDidMount() {
        $(document).on('click', this.closeOptionList);
    }
    componentWillUnmount() {
        $(document).off('click', this.closeOptionList);
    }
    closeOptionList() {
        this.setState({
            currentAppId: null
        });
    }
    toggleOptionList(appId) {
        this.setState({
            currentAppId: appId
        });
    }
    render() {
        const { currentAppId } = this.state;
        const { radioStatus } = this.props;
        return (
            radioStatus == 'chart'
                ? (
                    <Spin spinning={this.props.loading} size="large" >
                        <ul className={styles['apps']}>
                            {this.props.list.map(item => {
                                return (
                                    <AppItem
                                        key={item.appId}
                                        itemAppId={item.appId}
                                        currentAppId={currentAppId}
                                        title={item.appName}
                                        uv={item.uv}
                                        clickNum={item.clickNum}
                                        errorCount={item.errorCount}
                                        status={item.status}
                                        toggleOptionList={this.toggleOptionList.bind(this)}
                                        updateApp={this.props.updateApp}
                                        delApp={this.props.delApp}
                                        appUse={item.appUse}
                                        chooseApp={this.props.chooseApp}
                                        choosePlatform={this.props.choosePlatform}
                                        setAppInfo={this.props.setAppInfo}
                                    />
                                );
                            })}
                        </ul>
                    </Spin>
                )
                : (
                    <AppTable
                        data={this.props.list}
                        chooseApp={this.props.chooseApp}
                        choosePlatform={this.props.choosePlatform}
                        updateApp={this.props.updateApp}
                        delApp={this.props.delApp}
                        setAppInfo={this.props.setAppInfo}
                    />
                )
        );
    }
}