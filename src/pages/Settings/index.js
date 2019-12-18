import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import translate from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

const schema = Yup.object().shape({
  deliveryFee: Yup.string().required(translate('setting_delivery_fee_error')),
  minimumOrderValue: Yup.string().required(
    translate('setting_minimun_order_value_error'),
  ),
});

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [haveSavedSettings, setHaveSavedSettings] = useState(true);
  const [settings, setSettings] = useState({});

  async function clearCache() {
    try {
      await api.get('invalidate/all');
      toast.success(translate('cache_clear_success'));
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
  }

  async function handleSubmit(data) {
    setLoading(true);
    try {
      if (haveSavedSettings) {
        await api.put('settings', {
          delivery_fee: `[${data.deliveryFee},${data.minimumOrderValue}]`,
        });
      } else {
        await api.post('settings', {
          delivery_fee: `[${data.deliveryFee},${data.minimumOrderValue}]`,
        });
      }
      toast.success(translate('settings_updated_success'));
      setLoading(false);
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
    async function loadSettings() {
      const response = await api.get('settings');

      const defaultValues = {
        deliveryFee: 0,
        minimumOrderValue: 0,
      };

      if (response.data.length) {
        const data = response.data[0];
        const deliveryFee = data.delivery_fee
          ? JSON.parse(data.delivery_fee)
          : [0, 0];

        setSettings({
          deliveryFee: deliveryFee[0],
          minimumOrderValue: deliveryFee[1],
        });
      } else {
        setHaveSavedSettings(false);
        setSettings(defaultValues);
      }
    }

    loadSettings();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <h2 className="page-title">{translate('settings_title')}</h2>
        <div className="col-md-6 col-md-offset-3">
          <Form
            initialData={settings}
            onSubmit={handleSubmit}
            id="vd-form"
            schema={schema}
          >
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="deliveryFee">
                    {translate('delivery_fee_label')}
                  </label>
                  <Input
                    type="text"
                    name="deliveryFee"
                    id="deliveryFee"
                    className="form-control input-md"
                    placeholder={translate('settings_delivery_fee_placeholder')}
                  />
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="deliveryFee">
                    {translate('for_purchases_over_label')}
                  </label>
                  <Input
                    type="text"
                    name="minimumOrderValue"
                    id="minimumOrderValue"
                    className="form-control input-md"
                    placeholder={translate(
                      'settings_for_purchases_over_placeholder',
                    )}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={clearCache}
              className="btn btn-danger btn-block"
              type="button"
            >
              {translate('clear_cache_button')}
            </button>
            <button className="btn btn-primary btn-block" type="submit">
              {loading ? (
                <Animation width={30} height={30} animation={loadingData} />
              ) : (
                translate('save_button')
              )}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
