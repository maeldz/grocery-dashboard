import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import sample_default from '../../assets/img/sample_default.jpg';
import ImageInput from '../../components/ImageInput';

import api from '../../services/api';
import translate from '../../locales';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('category_title_error')),
  image_id: Yup.number().required(translate('category_image_error')),
});

const loadingAnimation = (
  <Animation width={30} height={30} animation={loadingData} />
);

export default function AddCategory() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/categories', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_default;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;

      setLoading(false);
      toast.success(translate('category_added_success'));
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
  }

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('add_category_title')}</h2>
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    {translate('information_header')}
                  </div>
                  <div className="panel-body">
                    <Form
                      id="vd-form"
                      schema={schema}
                      className="form-horizontal"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group">
                        <label
                          htmlFor="name"
                          className="col-sm-4 control-label"
                        >
                          {translate('category_name_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            className="form-control"
                            name="name"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="image_id"
                          className="col-sm-4 control-label"
                        >
                          {translate('category_image_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-8">
                          <ImageInput name="image_id" />
                        </div>
                      </div>
                      <div className="hr-dashed" />
                      <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-4">
                          <button
                            className="btn btn-primary"
                            name="submit"
                            type="submit"
                          >
                            {loading
                              ? loadingAnimation
                              : translate('add_button')}
                          </button>
                        </div>
                      </div>
                    </Form>
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
