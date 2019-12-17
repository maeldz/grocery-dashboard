import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import misc from './misc/reducer';

export default combineReducers({
  auth,
  user,
  misc,
});
