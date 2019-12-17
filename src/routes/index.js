import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import AddAdmin from '../pages/AddAdmin';
import Orders from '../pages/Orders';
import Order from '../pages/Order';
import AddOffer from '../pages/AddOffer';
import Offers from '../pages/Offers';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import Banners from '../pages/Banners';
import Categories from '../pages/Categories';
import AddCategory from '../pages/AddCategory';
import Settings from '../pages/Settings';

import Error404 from '../pages/Error404';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/home" component={Dashboard} isPrivate />

      {/* <Route path="/admin" exact component={Admin} isPrivate /> */}
      <Route path="/admin/add" component={AddAdmin} isPrivate />

      <Route path="/users" component={Users} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/banners" exact component={Banners} isPrivate />
      <Route path="/banners/add" component={Banners} isPrivate />

      <Route path="/categories" exact component={Categories} isPrivate />
      <Route path="/categories/add" component={AddCategory} isPrivate />

      <Route path="/offers" exact component={Offers} isPrivate />
      <Route path="/offers/add" component={AddOffer} isPrivate />

      <Route path="/products" exact component={Products} isPrivate />
      <Route path="/products/add" component={AddProduct} isPrivate />

      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/order" component={Order} isPrivate />

      <Route path="/settings" component={Settings} isPrivate />

      <Route path="*" component={Error404} />
    </Switch>
  );
}
