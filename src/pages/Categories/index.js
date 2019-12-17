import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import Table from '../../components/Table';

import api from '../../services/api';
import translate from '../../locales';

export default function Categories() {
  const [categories, setCategories] = useState();
  const [render, setRender] = useState(false);
  const [removing, setRemoving] = useState(0);

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  async function handleRemove(id) {
    try {
      setRemoving(id);
      await api.delete(`/categories/${id}`);
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
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategories(response.data);
        if (removing !== 0) {
          setRemoving(0);
          toast.success(translate('category_removed_success'));
        }
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  let data;

  if (categories) {
    data = categories.map(category => ({
      id: category.id,
      image: (
        <img
          src={category.image.url}
          style={{ width: 50, height: 50 }}
          alt={category.name}
        />
      ),
      name: category.name,
      action:
        removing === category.id ? (
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
              onKeyPress={() => handleRemove(category.id)}
              onClick={() => handleRemove(category.id)}
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
      label: translate('category_id_column'),
      field: 'id',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('category_image_column'),
      field: 'image',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('category_name_column'),
      field: 'name',
      sort: 'asc',
      width: 20,
    },
    {
      label: translate('category_action_column'),
      field: 'action',
      sort: 'asc',
      width: 10,
    },
  ];

  const rows = [
    {
      id: loading,
      image: loading,
      name: loading,
      action: loading,
    },
  ];
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">
              {translate('manage_categories_title')}
            </h2>

            <div className="panel panel-default">
              <div className="panel-heading">
                {translate('category_list_header')}
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
