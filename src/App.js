import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { getCurrentProfile, clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './component/common/PrivateRoute';

import Navbar from './component/layout/Navbar';
import Login from './component/auth/Login';
import Dashboard from './component/dashboard/Dashboard';
import Category from './component/category/Categories';
import CreateCategory from './component/category/CreateCategory';
import EditCategory from './component/category/EditCategory';

//check for token
if(localStorage.jwtToken){
    //Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //Decode token and get user info and exp
    const decode = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decode));
    store.dispatch(getCurrentProfile());

    //Check for expired token
    const currentTime = Date.now() / 1000;
    if(decode.exp < currentTime){
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = '/';
    }
}

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <Route exact path="/" component={Login} />
                    <Switch>
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                    </Switch>
                    <Switch>
                        <PrivateRoute exact path="/category" component={Category} />
                        <PrivateRoute exact path="/create-category" component={CreateCategory} />
                        <PrivateRoute exact path="/edit-category/:categoryId" component={EditCategory} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;