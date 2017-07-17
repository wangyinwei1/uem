import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('frameStore')
@observer
export default class ErrorDetail extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>ErrorDetail</div>
        );
    }
}