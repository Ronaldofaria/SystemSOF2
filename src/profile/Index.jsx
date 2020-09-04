import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { accountService } from '@/_services';

import { Details } from './Details';
import { Update } from './Update';

function Profile({ match }) {

    const user = accountService.userValue;
    const { path } = match;
    
    return (
        
        <div className="responsive bg-dim full-bg-size" style={{ marginLeft:30, marginright:60, marginTop: 10}}>                  
            <h1>Ola {user.firstName}!</h1>
            <p>Seja bem vindo, você está logado no sistema.</p>

            <Switch>
                <Route exact path={path} component={Details} />
                <Route path={`${path}/update`} component={Update} />
            </Switch>
        </div>
    );
}

export { Profile };