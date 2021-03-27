import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home/Home'
import Register from './views/Register/Register'
import Login from './views/Login/Login'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Home} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
            </Switch>
        </BrowserRouter>
    );
}