import React from 'react';
import ActionTypes from '../../store/ActionTypes'

import './ScheduleNote.less'

const ScheduleNote = (props) => {
    return (<div className="ScheduleNote">
      <div className="ScheduleNote__Text clearfix">
        <i className="fa fa-trash link fr" onClick={() => { props.dispatch({ type: ActionTypes.DELETE_NOTE, id: props.id, date: props.date }) }}></i>
        <i className="fa fa-pencil link fr" onClick={() => { props.dispatch({
            type: ActionTypes.NOTE_FORM_SHOW,
            id: props.id,
            date: props.date,
            name: props.name,
            text: props.text,
        }) }}></i>
        {props.text}
      </div>
      <div className="ScheduleNote__Name">{props.name}</div>
    </div>)
}

export default ScheduleNote;
