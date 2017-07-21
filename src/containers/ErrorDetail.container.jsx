import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    DetailWrap,
} from '../components/Common';
import {
    BaseInfo,
    Pie,
    Trend,
    Analysis
} from '../components/ErrorDetail';

@inject('frameStore')
@observer
export default class ErrorDetail extends React.Component {
    componentDidMount() {
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.tag;
    }
    render() {
        return (
            <DetailWrap>
                <h3>ErrorDetail</h3>
                <BaseInfo />
                <Pie />
                <Trend />
                <Analysis />
                <pre>
                    {JSON.stringify(this.props.data, null, 4)}
                </pre>
            </DetailWrap>
        );
    }
}