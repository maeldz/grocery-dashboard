import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO, isAfter } from 'date-fns';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import Table from '../../components/Table';
import translate, { dateLanguage } from '../../locales';

export default function Offers() {
  const [offers, setOffers] = useState();
  const [removing, setRemoving] = useState(0);
  const [render, setRender] = useState(false);

  async function handleRemove(id) {
    setRemoving(id);
    try {
      await api.delete(`/offers/${id}`);
      setRender(!render);
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
  }

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('/offers');

        setOffers(response.data);

        if (removing !== 0) {
          setRemoving(0);
          toast.success(translate('offer_removed_success'));
        }
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  let data;

  if (offers) {
    data = offers.map(offer => ({
      id: offer.id,
      product_image: (
        <img
          src={offer.product.image.url}
          width="50"
          height="50"
          alt={offer.product.name}
        />
      ),
      product_name: offer.product.name,
      quantity: offer.quantity,
      unit: offer.unit,
      from: formatPrice(offer.product.price),
      to: formatPrice(offer.to),
      expiration_date: format(parseISO(offer.expiration_date), 'PPPpp', {
        locale: dateLanguage,
      }),
      status: (
        <b
          className={
            isAfter(parseISO(offer.expiration_date), new Date())
              ? 'text-success'
              : 'text-danger'
          }
        >
          {isAfter(parseISO(offer.expiration_date), new Date())
            ? translate('offer_status_active_label')
            : translate('offer_status_expired_label')}
        </b>
      ),
      action:
        removing === offer.id ? (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {loading}
          </div>
        ) : (
          <div
            style={{
              lineHeight: '50px',
              textAlign: 'center',
            }}
          >
            <i
              role="presentation"
              onKeyPress={() => handleRemove(offer.id)}
              onClick={() => handleRemove(offer.id)}
              className="fa fa-trash"
              style={{
                color: '#f00',
                cursor: 'pointer',
              }}
            />
          </div>
        ),
    }));
  }

  const columns = [
    {
      label: translate('offer_id_column'),
      field: 'id',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('offer_product_image_column'),
      field: 'product_image',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('offer_product_name_column'),
      field: 'product_name',
      sort: 'asc',
      width: 20,
    },
    {
      label: translate('offer_product_quantity_column'),
      field: 'quantity',
      sort: 'asc',
      width: 20,
    },
    {
      label: translate('offer_product_unit_column'),
      field: 'unit',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('offer_product_from_column'),
      field: 'from',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('offer_product_to_column'),
      field: 'to',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('offer_status_column'),
      field: 'status',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('offer_expiration_column'),
      field: 'expiration_date',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('offer_action_column'),
      field: 'action',
      sort: 'asc',
      width: 10,
    },
  ];

  const rows = [
    {
      id: loading,
      product_image: loading,
      product_name: loading,
      quantity: loading,
      unit: loading,
      from: loading,
      to: loading,
      expiration_date: loading,
      status: loading,
      action: loading,
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('manage_offers_title')}</h2>
            <div className="panel panel-default">
              <div className="panel-heading">
                {translate('offer_list_header')}
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
