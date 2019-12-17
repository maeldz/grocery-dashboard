import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import translate from '../../locales';
import { signOut } from '../../store/modules/auth/actions';

import Header from '../Header';

export default function MenuBar({ children }) {
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
  });

  const show = useSelector(state => state.misc.show);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <Header />
      <div className="ts-main-content">
        <nav className={show ? 'ts-sidebar menu-open' : 'ts-sidebar'}>
          <ul className="ts-sidebar-menu">
            <li className="ts-label">{translate('menu_sidebar_label')}</li>
            <li>
              <Link to="/home">
                <i className="fa fa-tachometer-alt-slow" />
                {translate('dashboard_sidebar')}
              </Link>
            </li>
            <li className={clicked.one ? 'open' : ''}>
              <div
                role="presentation"
                onKeyPress={() => setClicked({ ...clicked, one: !clicked.one })}
                className="more"
                onClick={() => setClicked({ ...clicked, one: !clicked.one })}
              >
                <i className="fa fa-angle-down" />
              </div>
              <div
                role="presentation"
                className="link-button-container"
                onClick={() => setClicked({ ...clicked, one: !clicked.one })}
              >
                <button type="button" className="parent link-button">
                  <i className="fa fa-list-alt" />
                  {translate('categories_sidebar')}
                </button>
              </div>
              <ul>
                <li>
                  <Link to="/categories/add">
                    {translate('categories_sub_1_sidebar')}
                  </Link>
                </li>
                <li>
                  <Link to="/categories">
                    {translate('categories_sub_2_sidebar')}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={clicked.two ? 'open' : ''}>
              <div
                role="presentation"
                className="more"
                onKeyPress={() => setClicked({ ...clicked, two: !clicked.two })}
                onClick={() => setClicked({ ...clicked, two: !clicked.two })}
              >
                <i className="fa fa-angle-down" />
              </div>
              <div
                role="presentation"
                className="link-button-container"
                onClick={() => setClicked({ ...clicked, two: !clicked.two })}
              >
                <button type="button" className="parent link-button">
                  <i className="fa fa-inventory" />
                  {translate('products_sidebar')}
                </button>
              </div>
              <ul>
                <li>
                  <Link to="/products/add">
                    {translate('products_sub_1_sidebar')}
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    {translate('products_sub_2_sidebar')}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/orders">
                <i className="fa fa-shopping-cart" />
                {translate('orders_sidebar')}
              </Link>
            </li>
            <li>
              <Link to="/users">
                <i className="fa fa-users" />
                {translate('users_sidebar')}
              </Link>
            </li>
            <li className={clicked.three ? 'open' : ''}>
              <div
                role="presentation"
                className="more"
                onKeyPress={() =>
                  setClicked({ ...clicked, three: !clicked.three })
                }
                onClick={() =>
                  setClicked({ ...clicked, three: !clicked.three })
                }
              >
                <i className="fa fa-angle-down" />
              </div>
              <div
                role="presentation"
                className="link-button-container"
                onClick={() =>
                  setClicked({ ...clicked, three: !clicked.three })
                }
              >
                <button type="button" className="parent link-button">
                  <i className="fa fa-badge-percent" />
                  {translate('offers_sidebar')}
                </button>
              </div>
              <ul>
                <li>
                  <Link to="/offers/add">
                    {translate('offers_sub_1_sidebar')}
                  </Link>
                </li>
                <li>
                  <Link to="/offers">{translate('offers_sub_2_sidebar')}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/banners">
                <i className="fa fa-image" />
                {translate('banners_sidebar')}
              </Link>
            </li>
            <li>
              <Link to="/admin/add">
                <i className="fa fa-user-crown" />
                {translate('admin_sidebar')}
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <i className="fa fa-cog" />
                {translate('settings_sidebar')}
              </Link>
            </li>
            {/* Account from above */}
            <ul className="ts-profile-nav">
              <li className="ts-account">
                <Link to={location => location.pathname}>
                  <img
                    src="assets/img/ts-avatar.jpg"
                    className="ts-avatar hidden-side"
                    alt=""
                  />
                  {translate('account_label')}
                  <i className="fa fa-angle-down hidden-side" />
                </Link>
                <ul>
                  <li>
                    <Link to="/profile">{translate('profile_label')}</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleSignOut}>
                      {translate('logout_label')}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </ul>
        </nav>
        {children}
      </div>
    </>
  );
}

MenuBar.propTypes = {
  children: PropTypes.element.isRequired,
};
