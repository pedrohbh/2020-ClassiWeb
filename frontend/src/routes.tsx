import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Register from './views/Register/Register'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/register' component={Register} />
            </Switch>
        </BrowserRouter>
    );
}