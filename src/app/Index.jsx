import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';

// velho metedor de trabalho
// import CreateFavorecido from '@/favorecido/create.component';
// import EditFavorecido from   '@/favorecido/edit.component';
// import IndexFavorecido from  '@/favorecido/index.component';

// import CreateTableCode from '@/tableCode/create.component';
// import EditTableCode from   '@/tableCode/edit.component';
// import IndexTableCode from  '@/tableCode/index.component';

// import CreateNad from '@/nad/create.component';
// import EditNad from   '@/nad/edit.component';
// import CloneNad from  '@/nad/clone.component';
// import IndexNad from  '@/nad/index.component';
// import PrintNad from  '@/nad/print.component';

import IndexNdc from  '@/ndc/index.component';
import CreateNdc from '@/ndc/create.component';
import EditNdc from   '@/ndc/edit.component';
import CloneNdc from  '@/ndc/clone.component';
import PrintNdc from  '@/ndc/print.component';

function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (
        <div className={'app-container' + (user && ' bg-light')}>
            <Nav />
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                <Route path="/account" component={Account} />
                
                {/* Velho metodo de trabalho */}
                {/* <Route path='/createTableCode/:dbTable/:pgTitle' component={ CreateTableCode } />
                <Route path='/editTableCode/:dbTable/:id/:pgTitle' component={ EditTableCode } /> 
                <Route path='/indexTableCode/:dbTable/:pgTitle' component={ IndexTableCode } />

                <Route path='/createFavorecido' component={ CreateFavorecido } />
                <Route path='/editFavorecido/:id' component={ EditFavorecido } /> 
                <Route path='/indexFavorecido' component={ IndexFavorecido } />

                <Route path='/createNad' component={ CreateNad } />
                <Route path='/editNad/:id' component={ EditNad } /> 
                <Route path='/cloneNad/:id' component={ CloneNad } /> 
                <Route path='/indexNad' component={ IndexNad } />
                <Route path='/printNad/:id' component={ PrintNad } />  */}

                <Route path='/indexNdc' component={ IndexNdc } />
                <Route path='/createNdc' component={ CreateNdc } /> 
                <Route path='/editNdc/:id' component={ EditNdc } /> 
                <Route path='/cloneNdc/:id' component={ CloneNdc  }/> 
                <Route path='/printNdc/:id' component={ PrintNdc } />  


                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}

export { App }; 