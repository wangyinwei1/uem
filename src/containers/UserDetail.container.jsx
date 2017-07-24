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

@inject('frameStore', 'userDetailStore')
@observer
export default class UserDetail extends React.Component {
    componentDidMount() {
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        const {
            displayName,
            userId,
        } = this.props.data;
        return (
            <DetailWrap>
                <BaseInfo 
                    displayName={displayName}
                    userId={userId}
                />
                <Trend 
                />
                <Trace />
                <pre>
                    {JSON.stringify(this.props.data, null, 4)}
                </pre>
            </DetailWrap>
        );
    }
}