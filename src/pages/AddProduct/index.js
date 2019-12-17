import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import ImageInput from '../../components/ImageInput';

import api from '../../services/api';

import sample_default from '../../assets/img/sample_default.jpg';
import translate from '../../locales';

const schema = Yup.object().shape({
  image_id: Yup.number().required(translate('product_image_error')),
  name: Yup.string().required(translate('product_title_error')),
  category_id: Yup.string().required(translate('product_category_error')),
  description: Yup.string().required(translate('product_description_error')),
  quantity: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_quantity_error_1'))
    .required(translate('product_quantity_error_2')),
  unit: Yup.string().required(translate('product_unit_error')),
  price: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_price_error_1'))
    .required(translate('product_price_error_2')),
});

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/products', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_default;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;

      setLoading(false);
      toast.success(translate('product_added_success'));
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
        setLoading(false);
      } else {
        toast.error(translate('server_connection_error'));
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategories(response.data);
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadCategories();
  }, []);

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  const options = categories.map(category => ({
    id: category.id,
    title: category.name,
  }));

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('add_product_title')}</h2>
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    {translate('information_header')}
                  </div>
                  <div className="panel-body">
                    <Form
                      id="vd-form"
                      onSubmit={handleSubmit}
                      schema={schema}
                      className="form-horizontal"
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <label htmlFor="price" className="control-label">
                          {translate('product_image_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <br />
                        <ImageInput name="image_id" />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="name"
                          className="col-sm-2 control-label"
                        >
                          {translate('product_name_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                          />
                        </div>
                        <label
                          htmlFor="category"
                          className="col-sm-2 control-label"
                        >
                          {translate('product_category_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            name="category_id"
                            className="form-control"
                            options={options}
                          />
                        </div>
                      </div>
                      <div className="hr-dashed" />
                      <div className="form-group">
                        <label
                          htmlFor="description"
                          className="col-sm-2 control-label"
                        >
                          {translate('product_description_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            className="form-control"
                            name="description"
                            multiline
                          />
                        </div>
                        <label
                          htmlFor="price"
                          className="col-sm-2 control-label"
                        >
                          {translate('product_price_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="price"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="quantity"
                          className="col-sm-2 control-label"
                        >
                          {translate('product_quantity_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="quantity"
                            className="form-control"
                          />
                        </div>
                        <label
                          htmlFor="unit"
                          className="col-sm-2 control-label"
                        >
                          {translate('product_unit_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            name="unit"
                            className="form-control"
                            options={[
                              { id: 'kg', title: 'kg' },
                              { id: 'g', title: 'g' },
                              { id: 'dz', title: 'dz' },
                              { id: 'un', title: 'un' },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                          <button
                            className="btn btn-default"
                            style={{ marginRight: 5 }}
                            type="button"
                            onClick={() => {
                              document.getElementById('vd-form').reset();
                              document.getElementById(
                                'image-container',
                              ).src = sample_default;
                              document
                                .getElementById('image')
                                .removeAttribute('data-file');
                              document.getElementById('image_id').value = null;
                            }}
                          >
                            {translate('clear_button')}
                          </button>
                          <button
                            className="btn btn-primary"
                            name="submit"
                            type="submit"
                          >
                            {loading
                              ? loadingAnimation
                              : translate('save_button')}
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
