import React from 'react';
import Calendar from '../components/Calendar'
import DayBlock from '../components/DayBlock'

class Shedule extends React.Component {
  render(){
    return (<div className="Shedule">
      <Calendar />
      <DayBlock />
    </div>)
  }
}

export default Shedule;
