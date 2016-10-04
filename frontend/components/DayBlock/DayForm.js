import React from 'react';
import { connect } from 'react-redux'
import { ms, toDate } from '../utils/date'
import ActionTypes from '../../store/ActionTypes'
import ClientsInput from './ClientsInput'

import './DayForm.less'

const RequiredFormBlock = (props) => {
    const iProps = {
      id: "ir" + props.label,
      name: props.name,
      value: props.value || "",
      placeholder: props.placeholder,
      required: true,
      className: props.error? "error": "",
      onChange: props.onChange
    }
    return (<div className="FormBlock">
      <label htmlFor={"ir" + props.label} className="FormBlock__Label">{props.label}</label>
      { props.type == "textarea"? <textarea {...iProps}></textarea>:
          props.type == "autocomplete"? <ClientsInput {...iProps} onSelect={props.onSelect} />:
              <input {...iProps} /> }
      { props.error? <span className="FormBlock__Hint">{props.error}</span>: null  }
    </div>)
}
RequiredFormBlock.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}

class DayForm extends React.Component {
  state = {
    error: {},
    value: {
      name: this.props.name,
      text: this.props.text
    }
  }
  handleChange = (e) => {
    this.setValue(e.target.name, e.target.value);
  }
  setValue = (name, newValue) => {
    let error = this.state.error;
  	if(newValue != "")
      error = {...error, [name]: null }
    const value = {...this.state.value, [name]: newValue }
    this.setState({ error, value })
  }
  submit = (e) => {
    const error = {};
    if(!this.state.value["name"])
      error["name"] = "Participant is required"
    if(!this.state.value["text"])
      error["text"] = "Description is required"
    if(!error["name"] && !error["text"]) {
      const out = {
        type: ActionTypes.EDIT_NOTE,
        date: this.props.date,
        text: this.state.value["text"],
        name: this.state.value["name"]
      };
      if(this.props.id) out.id = this.props.id;
      this.props.dispatch(out);
      this.hide();
    }
    this.setState({ error })
    e.preventDefault();
  }
  hide = () => {
    this.props.dispatch({ type: ActionTypes.NOTE_FORM_HIDE })
  }
  render() {
    const selectedTime = new Date(this.props.date);
    return (<div className="DayForm animated fadeIn">
      <h2>New meeting on {ms[selectedTime.getMonth()] + " " + selectedTime.getDate()}
        <i className="fa fa-times link fr" onClick={this.hide}></i>
      </h2>
      <form>
        <RequiredFormBlock label="Participant" name="name" onSelect={this.setValue}
              onChange={this.handleChange} value={this.state.value["name"]} error={this.state.error["name"]} type="autocomplete" />
        <RequiredFormBlock label="Description" name="text"
              onChange={this.handleChange} value={this.state.value["text"]} error={this.state.error["text"]} type="textarea" />
        <div className="FormBlock">
          <button type="submit" className="btn btn_yellow fr" onClick={this.submit}>Save</button>
          <button type="button" className="btn btn_yellow_void fr" onClick={this.hide}>Cencel</button>
        </div>
      </form>
    </div>)
  }
}

export default connect(({ calendar, notes }, props) => ({ calendar, notes }))(DayForm);
