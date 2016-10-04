import React from 'react';

import './UserBlock.less'

const UserBlock = (props) => {
    return (<div className="UserBlock">
      <div className="UserBlock__avatar">
        <div className="UserBlock__avatarIn">
          <img src="/img/avatar.jpg" alt="Elizabeth Bell"/>
        </div>
      </div>
      <div className="UserBlock__controls clearfix">
        <a href="#" className="fl UserBlock__btn"><i className="fa fa-cog"></i></a>
        <a href="#" className="fr UserBlock__btn"><i className="fa fa-upload"></i></a>
      </div>
    </div>)
}

export default UserBlock;
