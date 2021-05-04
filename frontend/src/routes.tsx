import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home/Home'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import NewAd from './views/NewAd/NewAd'
import EditAd from './views/EditAd/EditAd'
import Ad from './views/Ad/Ad'
import Search from './views/Search/Search';
import AdminPanel from './views/AdminPanel/AdminPanel';
import UserPanel from './views/UserPanel/UserPanel';
import NotFound from './views/NotFound/NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/newad' component={NewAd} />
        <Route path='/editad' component={EditAd} />
        <Route path='/ad/:id' component={Ad} />
        <Route path='/search' component={Search} />
        <Route path='/admin' component={AdminPanel} />
        <Route path='/userpanel/:tab?' component={UserPanel} />
        <Route path='/error' component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}