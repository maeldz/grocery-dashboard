import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import translate from '../../locales';
import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/ts-avatar.jpg';

import { signOut } from '../../store/modules/auth/actions';
import { toggleMenu } from '../../store/modules/misc/actions';

export default function Header() {
  const dispatch = useDispatch();
  const show = useSelector(state => state.misc.show);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleToggleMenu() {
    dispatch(toggleMenu(!show));
  }

  return (
    <div className="brand clearfix">
      <Link to="/" className="logo">
        <img src={logo} className="img-responsive" alt="" />
      </Link>
      <span role="presentation" className="menu-btn" onClick={handleToggleMenu}>
        <i className="fa fa-bars" />
      </span>
      <ul className="ts-profile-nav">
        <li className="ts-account">
          <Link to={location => location.pathname}>
            <img src={avatar} className="ts-avatar hidden-side" alt="" />
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
    </div>
  );
}
