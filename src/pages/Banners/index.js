import React, { useEffect, useState } from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import translate from '../../locales';
import api from '../../services/api';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import Table from '../../components/Table';
import ImageInput from '../../components/ImageInput';

import sample_banner from '../../assets/img/sample_banner.jpg';

const schema = Yup.object().shape({
  image_id: Yup.number().required(translate('banner_image_error')),
});

export default function Banners() {
  const [banners, setBanners] = useState();
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [removing, setRemoving] = useState(0);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/banners', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_banner;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;

      setLoading(false);

      toast.success(translate('banner_added_success'));

      setRender(!render);
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
  }

  async function handleRemove(id) {
    setRemoving(id);
    try {
      await api.delete(`/banners/${id}`);
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
    async function loadBanners() {
      try {
        const response = await api.get('/banners');

        setBanners(response.data);
        if (removing !== 0) {
          setRemoving(0);
          toast.success(translate('banner_removed_success'));
        }
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  let data;

  if (banners) {
    data = banners.map(banner => ({
      id: banner.id,
      image: (
        <img src={banner.image.url} style={{ width: 100, height: 50 }} alt="" />
      ),
      action:
        removing === banner.id ? (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {loadingAnimation}
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
              onKeyPress={() => handleRemove(banner.id)}
              onClick={() => handleRemove(banner.id)}
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
      label: translate('banner_id_column'),
      field: 'id',
      sort: 'asc',
      width: 10,
    },
    {
      label: translate('banner_image_column'),
      field: 'image',
      sort: 'asc',
      width: 30,
    },
    {
      label: translate('banner_action_column'),
      field: 'action',
      sort: 'asc',
      width: 10,
    },
  ];

  const rows = [
    {
      id: loadingAnimation,
      image: loadingAnimation,
      name: loadingAnimation,
      action: loadingAnimation,
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('banners_title')}</h2>
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    {translate('information_header')}
                  </div>
                  <div className="panel-body">
                    <Form
                      schema={schema}
                      id="vd-form"
                      className="form-horizontal"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group">
                        <div className="form-group">
                          <label
                            htmlFor="image"
                            className="col-sm-2 control-label"
                          >
                            {translate('banner_image_label')}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-7">
                            <ImageInput
                              height={250}
                              width={500}
                              banner
                              name="image_id"
                            />
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
                      </div>
                    </Form>
                    <Table rows={data || rows} columns={columns} />
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
