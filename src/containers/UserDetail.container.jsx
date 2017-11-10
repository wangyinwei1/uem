import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    DetailWrap,
} from '../components/Common';
import {
    BaseInfo,
    Trend,
    Trace,
} from '../components/UserDetail';

@inject('frameStore', 'userDetailStore','userTableStore')
@observer
export default class UserDetail extends React.Component {
    componentDidMount() {
        const {
            userId,
        } = this.props.data;
        const {
            onChangeUID
        } = this.props.userDetailStore;
        onChangeUID({
            uId: userId
        });
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        const {
            trace,
            sessionCount,
            onChangeCurrent,
            newClickConfig
        } = this.props.userDetailStore;
        const {
            userDefinedColumn,
            tagType,
        } = this.props.userTableStore;
        const { theme } = this.props.frameStore;
        // const {
        //     displayName,
        //     userId
        // } = this.props.data;
        const { itemId } = this.props;
        return (
            <DetailWrap>
                <BaseInfo 
                    userDefinedColumn={userDefinedColumn}
                    tagType={tagType}
                    data={this.props.data}
                />
                <Trend 
                    sessionCount={sessionCount}
                    itemId={itemId}
                    changeCurrent={onChangeCurrent}
                    newClickConfig = { newClickConfig }
                    theme={theme}
                />
                <Trace 
                    data={trace}
                />
                {/* <pre>
                    <h3>从二级表格传进来的数据</h3>
                    {JSON.stringify(this.props.data, null, 4)}
                    <h3>交互详情页数据</h3>
                    {JSON.stringify(this.props.userDetailStore, null, 4)}
                </pre> */}
            </DetailWrap>
        );
    }
}