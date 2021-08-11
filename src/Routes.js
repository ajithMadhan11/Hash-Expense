import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import App from './App'
const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={App}/>
            <Route path='/signin' exact component={Login}/>
            <Route path='/signup' exact component={Register}/>
        </Switch>
        </BrowserRouter>
    );
}

export default Routes;
