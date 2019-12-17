import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { formatPrice } from '../../util/format';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

import Table from '../../components/Table';
import translate from '../../locales';

export default function Products() {
  const [products, setProducts] = useState();
  const [render, setRender] = useState(false);
  const [removing, setRemoving] = useState(0);

  async function handleRemove(id) {
    try {
      setRemoving(id);
      await api.delete(`/products/${id}`);
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
    async function loadProducts() {
      try {
        const response = await api.get('/products');

        setProducts(response.data);
        if (removing !== 0) {
          setRemoving(0);
          toast.success(translate('product_removed_success'));
        }
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  let data;

  if (products) {
    data = products.map(product => ({
      id: product.id,
      image: (
        <img
          src={product.image.url}
          style={{ width: 50, height: 50 }}
          alt={product.name}
        />
      ),
      name: product.name,
      category: product.category.name,
      description: product.description,
      quantity: product.quantity,
      unit: product.unit,
      price: formatPrice(product.price),
      action:
        removing === product.id ? (
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
              onKeyPress={() => handleRemove(product.id)}
              onClick={() => handleRemove(product.id)}
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
      label: translate('product_id_column'),
      field: 'id',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('product_image_column'),
      field: 'image',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('product_name_column'),
      field: 'name',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('product_category_column'),
      field: 'category',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('product_description_column'),
      field: 'description',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('product_quantidade_column'),
      field: 'quantity',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('product_unit_column'),
      field: 'unit',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('product_price_column'),
      field: 'price',
      sort: 'asc',
      width: 20,
    },
    {
      label: translate('product_action_column'),
      field: 'action',
      sort: 'asc',
      width: 20,
    },
  ];

  const rows = [
    {
      id: loading,
      image: loading,
      name: loading,
      category: loading,
      description: loading,
      qunatity: loading,
      unit: loading,
      price: loading,
      action: loading,
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('manage_products_title')}</h2>

            <div className="panel panel-default">
              <div className="panel-heading">
                {translate('product_list_header')}
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
