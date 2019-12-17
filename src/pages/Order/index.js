import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';
import { formatPrice, formatPhone } from '../../util/format';

import Table from '../../components/Table';
import translate from '../../locales';

export default function Order({ location }) {
  const { state } = location;

  const [orderData, setOrderData] = useState();

  const params = new URLSearchParams(useLocation().search);
  const id = params.get('id');

  useEffect(() => {
    async function loadOrder() {
      if (!state) {
        try {
          const response = await api.get(`orders?id=${id}`);
          setOrderData(response.data);
        } catch (err) {
          if (err.response) {
            toast.error(translate('server_error'));
          } else {
            toast.error(translate('server_connection_error'));
          }
        }
      } else {
        setOrderData(state.orderData);
      }
    }

    loadOrder();
  }, [id, state]);

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  let rows = [
    {
      image: loading,
      quantity: loading,
      unit: loading,
      name: loading,
      price: loading,
      subtotal: loading,
    },
  ];

  if (orderData) {
    rows = orderData.order_details.map(detail => ({
      image: (
        <img
          src={detail.product.image.url}
          width="50"
          height="50"
          alt={detail.product.name}
        />
      ),
      quantity: detail.quantity,
      unit: detail.product.unit,
      name: detail.product.name,
      price: formatPrice(detail.price),
      subtotal: formatPrice(detail.total),
    }));
  }

  const columns = [
    {
      label: translate('order_details_image_column'),
      field: 'image',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('order_details_quantity_column'),
      field: 'quantity',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('order_details_unit_column'),
      field: 'unit',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('order_details_name_column'),
      field: 'name',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('order_details_price_column'),
      field: 'price',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('order_details_subtotal_column'),
      field: 'subtotal',
      sort: 'asc',
      width: 20,
    },
  ];

  const style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3 h5">
                <Link to="/orders">{translate('back_label')}</Link>
              </div>
              <div className="col-md-3 h5" />
              <div className="col-md-3 h5" />
              <div className="row">
                <div className="col-md-3 h5">
                  <div style={style}>
                    <b>{translate('order_details_order_number_label')}:</b>
                    <span style={{ marginLeft: 10 }}>
                      {orderData ? orderData.id : loading}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                {translate('order_details_header')}
              </div>
              <div className="panel-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3 h5">
                      <div style={style}>
                        <b>{translate('order_details_customer_name_label')}:</b>
                        <span style={{ marginLeft: 10 }}>
                          {orderData ? orderData.user.name : loading}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-3 h5">
                      <div style={style}>
                        <b>
                          {translate('order_details_customer_phone_label')}:
                        </b>
                        <span style={{ marginLeft: 10 }}>
                          {orderData
                            ? formatPhone(orderData.user.phone)
                            : loading}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6 h5">
                      <div style={style}>
                        <b>
                          {translate('order_details_customer_address_label')}:
                        </b>
                        <span style={{ marginLeft: 10 }}>
                          {orderData
                            ? `${orderData.ship_street}, ${orderData.ship_street_n} - ${orderData.ship_neighborhood}`
                            : loading}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <Table rows={rows} columns={columns} />
                <div className="container">
                  <div className="row">
                    <div className="col-md-2" />

                    <div className="col-md-3 h4">
                      <div style={style}>
                        <b>
                          {translate('order_details_order_subtotal_label')}:
                        </b>
                        <span style={{ marginLeft: 10 }}>
                          {orderData
                            ? formatPrice(orderData.subtotal)
                            : loading}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-3 h4">
                      <div style={style}>
                        <b>
                          {translate('order_details_order_discount_label')}:
                        </b>
                        <span style={{ marginLeft: 10 }}>
                          {orderData
                            ? formatPrice(orderData.discount)
                            : loading}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-3 h4">
                      <div style={style}>
                        <b>
                          {translate('order_details_order_delivery_fee_label')}:
                        </b>
                        <span style={{ marginLeft: 10 }}>
                          {orderData
                            ? formatPrice(orderData.delivery_fee)
                            : loading}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5" />
                  <div className="col-md-3 h3">
                    <div style={style}>
                      <b>{translate('order_details_order_total_label')}:</b>
                      <span style={{ marginLeft: 10 }}>
                        {orderData ? formatPrice(orderData.total) : loading}
                      </span>
                    </div>
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

Order.propTypes = {
  location: PropTypes.shape().isRequired,
};
