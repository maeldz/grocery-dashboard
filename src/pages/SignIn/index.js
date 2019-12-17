import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Check } from '@rocketseat/unform';
import * as Yup from 'yup';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import { signInRequest } from '../../store/modules/auth/actions';

import bg from '../../assets/img/login-bg.png';
import logo from '../../assets/img/logo2.png';
import translate from '../../locales';

const schema = Yup.object().shape({
  email: Yup.string()
    .email(translate('login_email_error_1'))
    .required(translate('login_email_error_2')),
  password: Yup.string().required(translate('login_password_error')),
  checkbox: Yup.bool().required(),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <div
      className="login-page bk-img"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="form-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 mt-4x">
              <div className="well row pt-2x pb-3x bk-light">
                <div className="col-md-8 col-md-offset-2">
                  <div className="text-center">
                    <img src={logo} style={{ width: 100 }} alt="" />
                  </div>
                  <Form
                    onSubmit={handleSubmit}
                    id="vd-form"
                    schema={schema}
                    className="mt"
                  >
                    <div>
                      <label htmlFor="email" className="text-uppercase text-sm">
                        {translate('signin_email_label')}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder={translate('signin_email_placeholder')}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-uppercase text-sm mt"
                      >
                        {translate('signin_password_label')}
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder={translate('signin_password_placeholder')}
                        className="form-control"
                      />
                    </div>
                    <div className="checkbox checkbox-circle checkbox-info">
                      <Check name="checkbox" id="checkbox" defaultChecked />
                      <label htmlFor="checkbox">
                        {translate('keep_me_logged_in_label')}
                      </label>
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">
                      {loading ? (
                        <Animation
                          width={30}
                          height={30}
                          animation={loadingData}
                        />
                      ) : (
                        translate('login_button')
                      )}
                    </button>
                  </Form>
                  <div className="text-center" style={{ marginTop: 20 }}>
                    <Link to="/dashboard" style={{ color: '#000' }}>
                      {translate('forgot_password_label')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
