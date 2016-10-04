import React from 'react';
import { render } from 'react-dom'
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import store from './store'
import ActionTypes from './store/ActionTypes'

import CalendarContainer from './pages/CalendarContainer';
import ClientList from './pages/ClientList';
import Shedule from './pages/Shedule';

import './index.less';

import createBrowserHistory from 'history/lib/createBrowserHistory'
const setupTitle = (urn) => {
  const name = "Тестовый календарь";
  let title = name + " - Shedule";
	const urnA = urn.split('/').slice(1);
	if(urnA[0]){
		if(urnA[0] == "clients") title = name + " - My clients"
	}

	return title;
}
const history = useRouterHistory(createBrowserHistory)();
history.listen((location) => setupTitle(location.pathname));

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={CalendarContainer}>
        <IndexRoute component={Shedule}/>
        <Route path="/clients" component={ClientList} onEnter={()=>{store.dispatch({type:ActionTypes.LOAD_CLIENTS})}}/>
      </Route>
    </Router>
  </Provider>
)
Root.propTypes = {
  store: React.PropTypes.object.isRequired,
}

render((
  <Root store={store} />
), document.getElementById("content"));
