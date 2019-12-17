import produce from 'immer';

const INITIAL_STATE = {
  show: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/TOGGLE_MENU': {
        draft.show = action.payload.show;
        break;
      }
      default:
    }
  });
}
