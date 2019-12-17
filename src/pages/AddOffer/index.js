import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { formatPrice } from '../../util/format';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';
import translate from '../../locales';

const schema = Yup.object().shape({
  product_id: Yup.number()
    .typeError(translate('offer_product_error_1'))
    .required(translate('offer_product_error_2')),
  unit: Yup.string().required(translate('offer_product_unit_error')),
  from: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      translate('offer_product_from_error_1'),
    )
    .required(translate('offer_product_from_error_2')),
  to: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('offer_product_to_error_1'))
    .required(translate('offer_product_to_error_2')),
  quantity: Yup.number()
    .typeError(translate('offer_product_quantity_error_1'))
    .positive(translate('offer_product_quantity_error_2'))
    .integer(translate('offer_product_quantity_error_3'))
    .required(translate('offer_product_quantity_error_4')),
  expires_in: Yup.number()
    .typeError(translate('offer_product_expiration_error_1'))
    .positive(translate('offer_product_expiration_error_2'))
    .integer(translate('offer_product_expiration_error_3'))
    .required(translate('offer_product_expiration_error_4')),
});

export default function AddOffer() {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({
    from: `${translate('currency')} 0`,
    fromUnformatted: 0,
    unit: 'kg',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { price, unit } = products.find(product => {
      return product.id === Number(event.target.value);
    });
    setProductInfo({ from: formatPrice(price), fromUnformatted: price, unit });
  }

  async function handleSubmit(data) {
    setLoading(true);

    const { unit, price } = products.find(product => {
      return product.id === data.product_id;
    });
    const offerData = {
      ...data,
      unit,
      from: price,
      to: Number(data.to),
      expires_in: Number(data.expires_in),
    };

    await api.post('/offers', offerData);

    setLoading(false);

    document.getElementById('vd-form').reset();
    document.getElementById('from').value = 0;
    document.getElementById('from-formatted').value = `${translate(
      'currency',
    )} 0`;
    document.getElementById('unit').value = 'kg';

    toast.success(translate('offer_added_success'));
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/products');

        setProducts(response.data);
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

  const options = products.map(product => ({
    id: product.id,
    title: product.name,
  }));

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('add_offer_title')}</h2>
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
                      <div className="form-group">
                        <label
                          htmlFor="category"
                          className="col-sm-2 control-label"
                        >
                          {translate('offer_product_name_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            onChange={handleChange}
                            name="product_id"
                            className="form-control"
                            options={options}
                          />
                        </div>
                        <label
                          htmlFor="unit"
                          className="col-sm-2 control-label"
                        >
                          {translate('offer_unit_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            disabled
                            value={productInfo.unit}
                            type="text"
                            name="unit"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="hr-dashed" />
                      <div className="form-group">
                        <label
                          htmlFor="from-formatted"
                          className="col-sm-2 control-label"
                        >
                          {translate('offer_from_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            disabled
                            value={productInfo.from}
                            type="text"
                            name="from-formatted"
                            className="form-control"
                          />
                          <Input
                            type="hidden"
                            value={productInfo.fromUnformatted}
                            name="from"
                            className="form-control"
                          />
                        </div>
                        <label htmlFor="to" className="col-sm-2 control-label">
                          {translate('offer_to_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="to"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="quantity"
                          className="col-sm-2 control-label"
                        >
                          {translate('offer_quantity_label')}
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
                          htmlFor="expires_in"
                          className="col-sm-2 control-label"
                        >
                          {translate('offer_expiration_label')}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="expires_in"
                            className="form-control"
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
                              document.getElementById('from').value = 0;
                              document.getElementById(
                                'from-formatted',
                              ).value = `${translate('currency')} 0`;
                              document.getElementById('unit').value = 'kg';
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
