import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import Table from '../../components/Table';
import translate from '../../locales';

export default function Orders() {
  const [orders, setOrders] = useState();
  const [updatingStatus, setUpdatingStatus] = useState(0);
  const [render, setRender] = useState(false);
  const [value, setValue] = useState({});

  async function handleChange(event) {
    setValue({
      id: Number(event.target.id),
      status: event.target.value,
    });

    if (event.target.value !== '') {
      setUpdatingStatus(event.target.id);
      try {
        await api.put(`/orders/${event.target.id}`, {
          status: event.target.value,
        });

        setRender(!render);
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }
  }

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders');

      setOrders(response.data);
      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
        toast.success(translate('status_updated_success'));
      }
    }

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const className = status => {
    switch (status) {
      case 'finished':
        return 'text-success';
      case 'in_progress':
        return 'text-info';
      case 'cancelled':
        return 'text-danger';
      default:
        return '';
    }
  };

  const statusName = status => {
    switch (status) {
      case 'finished':
        return translate('finished_status_label');
      case 'in_progress':
        return translate('in_progress_status_label');
      case 'cancelled':
        return translate('canceled_status_label');
      default:
        return '';
    }
  };

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  let data;

  if (orders) {
    data = orders.map(order => ({
      id: order.id,
      user_name: order.user.name,
      user_phone: order.user.phone,
      total: formatPrice(order.total),
      status:
        Number(updatingStatus) === order.id ? (
          <div>{loading}</div>
        ) : (
          <b className={className(order.status)}>{statusName(order.status)}</b>
        ),
      action: (
        <select
          id={order.id}
          value={value.id === order.id ? value.status : ''}
          onChange={handleChange}
        >
          <option> </option>
          <option value="finished">{translate('finished_status_label')}</option>
          <option value="in_progress">
            {translate('in_progress_status_label')}
          </option>
          <option value="cancelled">
            {translate('canceled_status_label')}
          </option>
        </select>
      ),
      view: (
        <Link
          to={{
            pathname: '/order',
            search: `?id=${order.id}`,
            state: {
              orderData: order,
            },
          }}
        >
          Ver pedido
        </Link>
      ),
    }));
  }

  const columns = [
    {
      label: translate('order_id_column'),
      field: 'id',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('order_customer_name_column'),
      field: 'user_name',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('order_customer_phone_column'),
      field: 'user_phone',
      sort: 'asc',
      width: 20,
    },
    {
      label: translate('order_total_column'),
      field: 'total',
      sort: 'asc',
      width: 20,
    },
    {
      label: translate('order_status_column'),
      field: 'status',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('order_action_column'),
      field: 'action',
      sort: 'asc',
      width: 10,
    },
    {
      label: '',
      field: 'view',
      sort: 'asc',
      width: 10,
    },
  ];

  const rows = [
    {
      id: loading,
      user_name: loading,
      user_phone: loading,
      total: loading,
      status: loading,
      action: loading,
      view: loading,
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('orders_title')}</h2>
            <div className="panel panel-default">
              <div className="panel-heading">
                {translate('order_list_header')}
              </div>
              <div className="panel-body">
                <Table rows={data || rows} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
