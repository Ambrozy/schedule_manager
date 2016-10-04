import React from 'react';
import { connect } from 'react-redux'
import UserBlock from '../components/UserBlock'
import Menu from '../components/Menu'

import './CalendarContainer.less'

const CalendarContainer = (props) => {
    return (<div className="container">
      <div className="MenuColumn">
        <UserBlock />
        <Menu />
      </div>
      <div className="ContentColumn">
        {props.children}
      </div>
    </div>)
}

export default connect(({ clients }, props) => ({ clients }))(CalendarContainer);
