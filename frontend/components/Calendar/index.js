import React from 'react';
import { connect } from 'react-redux'
import CalendarDay from './CalendarDay'
import ActionTypes from '../../store/ActionTypes'
import has from 'lodash/has'
import getOnKeyHandler from './keys'
import { ms_s, toDate } from '../utils/date'

import './Calendar.less'

const getStartDay = (date) => {
  const time = new Date(date.getFullYear(), date.getMonth(), 1);
  return new Date( time.getFullYear(), time.getMonth(), time.getDate() - (time.getDay() - 1) );
}
const getEndDay = (date) => {
  const time = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return new Date( time.getFullYear(), time.getMonth(), time.getDate() + (7 - time.getDay()) );
}
const compareDate = (d1, d2, tillMonth = false) => {
  const dy = d1.getFullYear() - d2.getFullYear();
  const dm = d1.getMonth() - d2.getMonth();
  const dd = d1.getDate() - d2.getDate();
  if(tillMonth)
    return dy || dm;
  return dy || dm || dd;
}
const plusDay = (time) => new Date( time.getFullYear(), time.getMonth(), time.getDate() + 1 );

const Calendar = (props) => {
    const selectedTime = has(props, 'calendar.selectedTime') && new Date(props.calendar.selectedTime) || new Date();
    const curTime = has(props, 'calendar.currentTime') && new Date(props.calendar.currentTime) || new Date();
    let curDay = getStartDay(curTime);
    const endDay = getEndDay(curTime);
    const html = [];
    let i = 0;
    while(true) {
      const propsD = {};
      const cmpM = compareDate(curDay, curTime, true);
      propsD.status = cmpM < 0? "prev": cmpM > 0? "next": "current";
      propsD.current = compareDate(curDay, new Date()) == 0;
      propsD.selected = compareDate(curDay, selectedTime) == 0;
      propsD.date = toDate(curDay);
      propsD.hasEvent = has(props, ['notes', toDate(curDay)]) && props.notes[toDate(curDay)].length > 0;
      propsD.dispatch = props.dispatch;
      html.push(<CalendarDay key={i} {...propsD} >{curDay.getDate()}</CalendarDay>);
      if(compareDate(curDay, endDay) === 0) break;
      curDay = plusDay(curDay);
      i++;
    }

    return (<div className="Calendar">
      <div className="Calendar__Month">
        <button className="btn fa fa-angle-left"
          onClick={() => props.dispatch({ type: ActionTypes.PREV_MONTH })}
          onKeyDown={getOnKeyHandler(props.dispatch)}></button>
        <span className="Calendar__MonthName">{ ms_s[curTime.getMonth()] + " " + curTime.getFullYear() }</span>
        <button className="btn fa fa-angle-right"
          onClick={() => props.dispatch({ type: ActionTypes.NEXT_MONTH })}
          onKeyDown={getOnKeyHandler(props.dispatch)}></button>
      </div>
      <div className="Calendar__Week clearfix">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span>SAT</span>
        <span>SUN</span>
      </div>
      <div className="Calendar__Days clearfix">
        { html }
      </div>
    </div>)
}

export default connect(({ calendar, notes }, props) => ({ calendar, notes }))(Calendar);
