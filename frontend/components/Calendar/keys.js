import ActionTypes from '../../store/ActionTypes'

export const getOnKeyHandler = (dispatch) => {
  return (e) => {
    switch(e.keyCode) {
      case 37: // <-
        dispatch({ type: ActionTypes.PREV_DAY })
        break;
      case 38: // up
        dispatch({ type: ActionTypes.PREV_WEEK })
        break;
      case 39: // ->
        dispatch({ type: ActionTypes.NEXT_DAY })
        break;
      case 40: // down
        dispatch({ type: ActionTypes.NEXT_WEEK })
        break;
    }
  }
}
export default getOnKeyHandler;
