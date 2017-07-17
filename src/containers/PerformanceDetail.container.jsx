import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('frameStore')
@observer
export default class PerformanceDetail extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>PerformanceDetail</div>
        );
    }
}