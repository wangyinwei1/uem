import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import {Link}  from 'react-router'
import classnames from 'classnames'

import SmartMenuList from './SmartMenuList.jsx'

import NavigationStore from './../stores/NavigationStore.js'
import NavigationActions from './../actions/NavigationActions.js'

let OtherMenu = React.createClass({
   render: function () {
       return (
           <ul id="setting">
                <li className=""></li>
           </ul>
       )
   }
});

export default OtherMenu