import React from 'react';
import cx from 'classnames'
import getOnKeyHandler from './keys'
import ActionTypes from '../../store/ActionTypes'

import './CalendarDay.less'

const CalendarDay = (props) => {
    const onClick = () => {
      props.dispatch({ type: ActionTypes.SHOW_DAY, date: props.date });
    }
    
    return (<div className="CalendarDay">
      <button className={cx("CalendarDay__elem btn", {
        "gray": props.status == "prev" || props.status == "next",
        "selected": props.selected,
        "current": !props.selected && props.current,
        "hasEvent": props.hasEvent
      })} onKeyDown={getOnKeyHandler(props.dispatch)} onClick={ onClick } >
        {props.children}
      </button>
    </div>)
}

export default CalendarDay;
