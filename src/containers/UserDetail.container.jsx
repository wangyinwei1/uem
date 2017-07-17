import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('frameStore')
@observer
export default class UserDetail extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>UserDetail</div>
        );
    }
}