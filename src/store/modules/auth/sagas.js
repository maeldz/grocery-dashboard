import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { history } from '../../../services/history';

import { signInSuccess, signInFailure } from './actions';
import translate from '../../../locales';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'admin/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/home');
  } catch (err) {
    if (err.response.status === 429) {
      toast.error(
        'Muitas solicitações em um curto período de tempo, tente novamente mais tarde.',
      );
      yield put(signInFailure());
    } else {
      toast.error(translate('auth_error'));
      yield put(signInFailure());
    }
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
