import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Choice } from '@rocketseat/unform';
import * as Yup from 'yup';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import { updateProfileRequest } from '../../store/modules/user/actions';

import DatePicker from './DatePicker';
import translate from '../../locales';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('profile_first_name_error')),
  last_name: Yup.string().required(translate('profile_last_name_error')),
  email: Yup.string()
    .email(translate('profile_email_error_1'))
    .required(translate('profile_email_error_2')),
  phone: Yup.number()
    .test(
      'len',
      translate('profile_phone_error_1'),
      val =>
        (val && val.toString().length === 10) || val.toString().length === 11,
    )
    .required(translate('profile_phone_error_2')),

  birthday: Yup.date()
    .typeError(translate('profile_birthday_error_1'))
    .required(translate('profile_birthday_error_2')),
  gender: Yup.string().required(translate('profile_gender_error')),
  cpf: Yup.number()
    .typeError(translate('profile_national_id_error_1'))
    .required(translate('profile_national_id_error_2')),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, translate('profile_new_password_error_1'))
          .required(translate('profile_new_password_error_2'))
      : field,
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required(translate('profile_password_confirmation_error_2'))
          .oneOf(
            [Yup.ref('password')],
            translate('profile_password_confirmation_error_1'),
          )
      : field,
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <h2 className="page-title">Perfil</h2>
        <div className="col-md-6 col-md-offset-3">
          <Form
            initialData={profile}
            onSubmit={handleSubmit}
            id="vd-form"
            schema={schema}
          >
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control input-md"
                    placeholder={translate('profile_first_name_placeholder')}
                  />
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control input-md"
                    placeholder={translate('profile_last_name_placeholder')}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <Input
                type="email"
                name="email"
                id="email"
                className="form-control input-md"
                placeholder={translate('profile_email_placeholder')}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="phone"
                id="phone"
                className="form-control input-md"
                placeholder={translate('profile_phone_placeholder')}
              />
            </div>
            <div className="form-group radio-container">
              <DatePicker birthday={profile.birthday} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '20%',
              }}
              className="radio radio-info radio-container"
            >
              <Choice
                name="gender"
                options={[
                  { value: 'm', label: translate('gender_male_label') },
                  { value: 'f', label: translate('gender_female_label') },
                ]}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="cpf"
                id="cpf"
                className="form-control input-md"
                placeholder={translate('profile_national_id_placeholder')}
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                name="oldPassword"
                id="oldPassword"
                className="form-control input-md"
                placeholder={translate('profile_password_placeholder')}
              />
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control input-md"
                    placeholder={translate('profile_new_password_placeholder')}
                  />
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control input-md"
                    placeholder={translate(
                      'profile_password_confirmation_placeholder',
                    )}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              {loading ? (
                <Animation width={30} height={30} animation={loadingData} />
              ) : (
                translate('save_button')
              )}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
