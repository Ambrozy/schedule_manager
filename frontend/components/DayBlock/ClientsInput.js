import React from 'react';
import { connect } from 'react-redux'
import cx from 'classnames'
import ActionTypes from '../../store/ActionTypes'

import './ClientsInput.less'

class ClientsInput extends React.Component {
  state = {
    isShow: false,
    selectIndex: -1
  }
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }
  static defaultProps = {
    maxLength: 5
  }
  onDoubleClick = (e) => {
    if(this.getFilteredItems().length)
      this.setState({ isShow: true })
  }
  onBlur = (e) => {
    if(this._ignoreBlur) return;
    this.setState({ selectIndex: -1, isShow: false })
  }
  onChange = (e) => {
    const len = this.getFilteredItems().length;
    if(len){
      this.setState({ isShow: true });
    } else {
      this.setState({ selectIndex: -1, isShow: false });
    }
    this.props.onChange(e);
  }
  onKeyDown = (e) => {
    const items = this.getFilteredItems();
    const len = items.length;
    if(!len) return;
    let selectIndex = this.state.selectIndex;
    switch(e.keyCode) {
      case 9: // tab
      case 13: // enter
        if(this.state.isShow){
          this.chooseItem(selectIndex);
          e.preventDefault();
        }
        break;
      case 38: // up
        selectIndex--;
        if(selectIndex < 0) selectIndex = len - 1;
        this.setState({ selectIndex, isShow: true });
        e.preventDefault();
        break;
      case 40: // down
        selectIndex++;
        if(selectIndex >= len) selectIndex = 0;
        this.setState({ selectIndex, isShow: true });
        e.preventDefault();
        break;
    }
  }
  setIgnoreBlur = (ignore) => {
    this._ignoreBlur = ignore;
  }
  chooseItem = (index) => {
    const items = this.getFilteredItems();
    this.setState({selectIndex: -1, isShow: false});
    this.props.onSelect(this.props.name, items[index]);
  }
  getFilteredItems = () => {
    return (this.props.clients.data || []).filter(item => item.indexOf(this.props.value) !== -1).slice(0, this.props.maxLength);
  }
  getPopupRender = () => {
    return this.getFilteredItems().map((item, id) => (
      <div key={id} className={cx("AutocompleteInput__Item link", {"active": this.state.selectIndex == id})}
        onClick = {() => this.chooseItem(id)}
        onMouseDown = {() => this.setIgnoreBlur(true)}
        onMouseUp = {() => this.setIgnoreBlur(false)}
        onMouseEnter = {() => this.setState({selectIndex: id})}>{item}</div>
    ))
  }
  componentWillMount = () => {
    if(this.props.clients.status != "ready")
      this.props.dispatch({ type: ActionTypes.LOAD_CLIENTS })
    this._ignoreBlur = false
  }
  render() {
    const { dispatch, clients, ...iProps } = this.props;
    return (<div className="AutocompleteInput">
      <input {...iProps} autoComplete="off"
          onKeyDown={this.onKeyDown} onChange={this.onChange}
          onBlur={this.onBlur} onDoubleClick={this.onDoubleClick} />
      {
        this.state.isShow? <div className="AutocompleteInput__Predict">{ this.getPopupRender() }</div>: null
      }
    </div>)
  }
}

export default connect(({ clients }, props) => ({ clients }))(ClientsInput);
