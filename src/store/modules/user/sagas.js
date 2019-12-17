import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';
import translate from '../../../locales';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      last_name,
      email,
      phone,
      birthday,
      gender,
      cpf,
      ...rest
    } = payload.data;

    const profile = {
      name,
      last_name,
      email,
      phone,
      birthday,
      gender,
      cpf,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success(translate('profile_updated_success'));

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error(translate('update_profile_error'));
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
