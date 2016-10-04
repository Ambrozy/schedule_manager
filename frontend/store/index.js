import Types from './ActionTypes'
import { createStore, combineReducers } from 'redux'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle';
import { v4 } from 'node-uuid';

const get = (url, ready_type, error_type) => {
  const callback = (err, results) => {
    if(err) store.dispatch({type:error_type, error_text:err})
    else store.dispatch({type:ready_type, results})
  }
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      callback(`${url}, ${xhr.status}: ${xhr.statusText}`);
    } else {
      let data = null;
      try {
        data = JSON.parse(xhr.responseText);
      } catch (err) {
        return callback(`${url}, parse error: data is undefined`);
      }
      callback(null, data);
    }
  }
}

const calcDate = (currentTime, plus_m, plus_days = 0) => {
  const curTime = currentTime && new Date(currentTime) || new Date();
  return new Date(curTime.getFullYear(), curTime.getMonth() + plus_m, curTime.getDate() + plus_days);
}
const calendar = (state = {}, action) => {
  console.log(action);
  let date;
  switch(action.type){
    case Types.PREV_MONTH:
      return { ...state, currentTime: calcDate(state.currentTime, -1) }
    case Types.NEXT_MONTH:
      return { ...state, currentTime: calcDate(state.currentTime, +1) }
    case Types.PREV_WEEK:
      date = calcDate(state.selectedTime, 0, -7)
      return { ...state, currentTime: date, selectedTime: date }
    case Types.NEXT_WEEK:
      date = calcDate(state.selectedTime, 0, +7)
      return { ...state, currentTime: date, selectedTime: date }
    case Types.PREV_DAY:
      date = calcDate(state.selectedTime, 0, -1)
      return { ...state, currentTime: date, selectedTime: date }
    case Types.NEXT_DAY:
      date = calcDate(state.selectedTime, 0, +1)
      return { ...state, currentTime: date, selectedTime: date }
    case Types.SHOW_DAY:
      return { ...state, currentTime: action.date, selectedTime: action.date }
    default:
      return state;
  }
}

const findItem = (items, id) => {
  for(let i = 0; i < items.length; i++)
    if(items[i].id == id)
      return i;
  return -1;
}
const notes = (state = {}, action) => {
  const data = {...state};
  const items = data[action.date] && data[action.date] || [];
  switch(action.type){
    case Types.DELETE_NOTE:
      const i = findItem(items, action.id);
      if(i !== -1)
        data[action.date] = [...items.slice(0, i), ...items.slice(i + 1)]
      return data;
    case Types.EDIT_NOTE:
      const j = findItem(items, action.id);
      if(j !== -1) {
        items[j].name = action.name;
        items[j].text = action.text;
      } else {
        if(!data[action.date]) data[action.date] = [];
        data[action.date].push({
          id: v4(),
          name: action.name,
          text: action.text,
          date: action.date
        });
      }
      return data;
    default:
      return state;
  }
}

const forms = (state = {}, action) => {
  switch(action.type){
    case Types.NOTE_FORM_SHOW:
      return { ...state, note: {
        visible: true,
        id: action.id,
        date: action.date,
        name: action.name,
        text: action.text
      }};
    case Types.NOTE_FORM_HIDE:
      return { ...state, note: {
        visible: false
      }};
    default:
      return state;
  }
}

const clients = (state = {}, action) => {
  switch(action.type){
    case Types.LOAD_CLIENTS:
      if(state.status == "ready")
        return state;
      get("clients.json", Types.LOAD_CLIENTS_FINISHED, Types.LOAD_CLIENTS_ERROR)
      return { ...state, status: "loading" }
    case Types.LOAD_CLIENTS_FINISHED:
      return { ...state, data: action.results, status: "ready" }
    case Types.LOAD_CLIENTS_ERROR:
      return { ...state, status: "error", error_text: action.error_text }
    default:
      return state;
  }
}

const reducer = combineReducers({
  calendar,
  notes,
  forms,
  clients
})
const presistedState = loadState();
const store = createStore(reducer, presistedState)
store.subscribe(throttle(() => {
  saveState({
    notes: store.getState().notes
  });
}, 1000))

export default store;
