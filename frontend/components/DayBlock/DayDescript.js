import React from 'react';
import { connect } from 'react-redux'
import has from 'lodash/has'
import ScheduleNote from './ScheduleNote'
import { ms, toDate } from '../utils/date'
import ActionTypes from '../../store/ActionTypes'

import './DayDescript.less'

const DayDescript = (props) => {
    const selectedTime = has(props, 'calendar.selectedTime') && new Date(props.calendar.selectedTime) || new Date();
    const sTimeFormat = toDate(selectedTime);
    const notes = has(props, ['notes', sTimeFormat, 'length']) && props.notes[sTimeFormat] || [];
    return (<div className="DayDescript animated fadeIn">
      <h2>{ms[selectedTime.getMonth()] + " " + selectedTime.getDate()}
        <button className="btn btn_yellow fr" onClick={() => { props.dispatch({ type: ActionTypes.NOTE_FORM_SHOW, date: sTimeFormat }) }}>CREATE</button>
      </h2>
      <div className="ScheduleNotes">
        {
          notes.length?
            notes.map((item) => <ScheduleNote key={item.id} {...item} dispatch={props.dispatch} />)
            : <div className="ScheduleNotes__nothing">Nothing planned</div>
        }
      </div>
    </div>)
}

export default connect(({ calendar, notes }, props) => ({ calendar, notes }))(DayDescript);
