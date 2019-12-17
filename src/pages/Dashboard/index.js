import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import translate from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

export default function Dashboard() {
  const [status, setStatus] = useState();

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await axios
          .all([
            api.get('/products'),
            api.get('/orders'),
            api.get('/users'),
            api.get('/offers'),
          ])
          .then(
            axios.spread((products, orders, users, offers) => ({
              products: products.data.length,
              orders: orders.data.length,
              users: users.data.length,
              offers: offers.data.length,
            })),
          );

        setStatus(response);
      } catch (err) {
        toast.error(translate('server_connection_error'));
      }
    }
    loadStatus();
  }, []);

  const loading = <Animation width={40} height={40} animation={loadingData} />;

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('dashboard_title')}</h2>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-body bk-primary text-light">
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h1 ">
                            {status ? status.orders : loading}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            {translate('orders_dashboard')}
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/orders"
                        className="block-anchor panel-footer text-center"
                      >
                        {translate('details_label')} &nbsp;
                        <i className="fa fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-body bk-success text-light">
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h1 ">
                            {status ? status.products : loading}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            {translate('products_dashboard')}
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/products"
                        className="block-anchor panel-footer text-center"
                      >
                        {translate('details_label')} &nbsp;
                        <i className="fa fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-body bk-info text-light">
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h1 ">
                            {status ? status.offers : loading}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            {translate('offers_dashboard')}
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/offers"
                        className="block-anchor panel-footer text-center"
                      >
                        {translate('details_label')} &nbsp;
                        <i className="fa fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-body bk-warning text-light">
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h1 ">
                            {status ? status.users : loading}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            {translate('users_dashboard')}
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/users"
                        className="block-anchor panel-footer text-center"
                      >
                        {translate('details_label')} &nbsp;
                        <i className="fa fa-arrow-right" />
                      </Link>
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
