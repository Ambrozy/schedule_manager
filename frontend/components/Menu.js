import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import forEach from 'lodash/forEach'

import './Menu.less'

const Menu = (props) => {
    let len = 0;
    forEach(props.notes, function(value, key) {
      len += value.length || 0;
    });
    return (<ul className="Menu">
      <li><Link to="/" activeClassName="active" onlyActiveOnIndex><i className="fa fa-file-text-o"></i> Schedule <span className="fr">{len}</span></Link></li>
      <li><Link to="/clients" activeClassName="active"><i className="fa fa-user"></i> My clients</Link></li>
    </ul>)
}

export default connect(({ notes }, props) => ({ notes }), null, null, {
  pure: false
})(Menu);
