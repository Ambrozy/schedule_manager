import React from 'react';
import { connect } from 'react-redux'
import DayDescript from './DayDescript'
import DayForm from './DayForm'

import './DayBlock.less'

const DayBlock = (props) => {
    return (<div className="DayBlock">
      {
        props.day_form && props.day_form.visible?
          <DayForm id={props.day_form.id} date={props.day_form.date} name={props.day_form.name} text={props.day_form.text} />
          : <DayDescript />
      }
    </div>)
}

export default connect(({ forms }, props) => ({ day_form: forms.note }))(DayBlock);
