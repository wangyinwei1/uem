import React from 'react';
import { observer, inject } from 'mobx-react';

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
            <div>
                <h3>ErrorDetail</h3>
                <pre>
                    {JSON.stringify(this.props.data, null, 4)}
                </pre>
            </div>
        );
    }
}