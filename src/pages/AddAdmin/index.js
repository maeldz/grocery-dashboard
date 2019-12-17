import React, { useState } from 'react';
import { Form, Input, Choice } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import translate from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

import DatePicker from './DatePicker';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('admin_first_name_error')),
  last_name: Yup.string().required(translate('admin_last_name_error')),
  email: Yup.string()
    .email(translate('admin_email_error_1'))
    .required(translate('admin_email_error_2')),
  phone: Yup.number()
    .test(
      'len',
      translate('admin_phone_error_1'),
      val =>
        (val && val.toString().length === 10) || val.toString().length === 11,
    )
    .typeError(translate('admin_phone_error_1'))
    .required(translate('admin_phone_error_2')),
  birthday: Yup.date()
    .typeError(translate('admin_birthday_error_1'))
    .required(translate('admin_birthday_error_2')),
  gender: Yup.string().required(translate('admin_gender_error')),
  cpf: Yup.number()
    .typeError(translate('admin_national_id_error_1'))
    .required(translate('admin_national_id_error_2')),
  password: Yup.string()
    .min(6, translate('admin_password_error_1'))
    .required(translate('admin_password_error_2')),
  confirmPassword: Yup.string()
    .required(translate('admin_password_confirmation_error_1'))
    .oneOf(
      [Yup.ref('password')],
      translate('admin_password_confirmation_error_2'),
    ),
});

export default function AddAdmin() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      const response = await api.post('/users', data);
      await api.post('/admins', { user_id: response.data.id });

      setLoading(false);

      document.getElementById('vd-form').reset();
      document.getElementById('date-picker').value = '';

      toast.success(translate('admin_account_created_success'));
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
  }

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <h2 className="page-title">{translate('admin_title')}</h2>
        <div className="col-md-6 col-md-offset-3">
          <Form onSubmit={handleSubmit} id="vd-form" schema={schema}>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control input-md"
                    placeholder={translate('add_admin_first_name_placeholder')}
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
                    placeholder={translate('add_admin_last_name_placeholder')}
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
                placeholder={translate('add_admin_email_placeholder')}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="phone"
                id="phone"
                className="form-control input-md"
                placeholder={translate('add_admin_phone_placeholder')}
              />
            </div>
            <div className="form-group radio-container">
              <DatePicker />
            </div>
            <div
              style={{
                display: 'block',
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
                placeholder={translate('add_admin_national_id_placeholder')}
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
                    placeholder={translate('add_admin_password_placeholder')}
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
                      'add_admin_password_confirmation_placeholder',
                    )}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              {loading ? loadingAnimation : translate('add_button')}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
