import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    DetailWrap,
} from '../components/Common';

@inject('frameStore')
@observer
export default class UserDetail extends React.Component {
    componentDidMount() {
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        return (
            <DetailWrap>
                <h3>UserDetail</h3>
                <pre>
                    {JSON.stringify(this.props.data, null, 4)}
                </pre>
            </DetailWrap>
        );
    }
}