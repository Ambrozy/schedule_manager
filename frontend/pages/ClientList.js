import React from 'react'
import { connect } from 'react-redux'
import groupBy from 'lodash/groupBy';
import forOwn from 'lodash/forOwn';

import './ClientList.less';

const getArray = (data) => Array.isArray(data) && data || [];

const ClientList = (props) => {
    if(!props.clients.status || props.clients.status === 'loading') {
      return (<div className="ClientList_loading">
        <i className="fa fa-spinner"></i>
      </div>)
    }
    const data = groupBy(getArray(props.clients.data).sort(), function(contact){
        return contact.charAt(0).toUpperCase();
    });
    const html = [];
    forOwn(data, function(value, key) {
      html.push(
        <div className="ClientList__Block" key={key}>
            <div className="ClientList__Letter">{key}</div>
            <ul>
                {
                  value.map((contact, id) => (<li key={id} className="ClientList__Item">{contact}</li>))
                }
            </ul>
        </div>
      );
    });
    return (<div className="ClientList">
        <h2>My clients</h2>
        { html }
    </div>)
}

export default connect(({ clients }, props) => ({ clients }))(ClientList);
