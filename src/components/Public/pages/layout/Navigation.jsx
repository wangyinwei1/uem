import React from 'react'
import _ from 'lodash'
import SmartMenu from '../../components/navigation/components/SmartMenu.jsx'
import OtherMenu from '../../components/navigation/components/OtherMenu.jsx'

let Navigation = React.createClass({
    getInitialState: function () {
        return {
            isOpen: true
        }
    },
    handleClick: function () {
        this.setState({isOpen:!this.state.isOpen})
    },
    render: function () {
        const _class = this.state.isOpen ? 'fa fa-fw fa-chevron-left' : 'fa fa-fw fa-chevron-right';
        const bodyClass = this.state.isOpen ? 'expand' : 'unexpand';
        $('body').attr('class', '').addClass(bodyClass);
        return (
            <aside id="left-panel">
                <nav id="nav">
                    <SmartMenu rawItems={this.props.rawItems} />
                </nav>
                <p className="flex"><a href="javascript:" onClick={this.handleClick}><i className={_class}></i></a></p>
            </aside>
        )
    }
});

export default Navigation;