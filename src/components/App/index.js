import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthUserContext } from '../Session';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const getAuthState = user =>
        user ? setAuthUser(user)
            : setAuthUser(null);

    useEffect(() => {
        props.firebase
            .doOnAuthStateChanged(getAuthState)
    })

    return (
        <AuthUserContext.Provider value={authUser}>
            <Router>
                <div>
                    <Navigation/>
                    <hr />
                    <Routes>
                        <Route exact path={ROUTES.LANDING} element={<LandingPage />} />
                        <Route exact path={ROUTES.SIGN_UP} element={<SignUpPage />} />
                        <Route exact path={ROUTES.SIGN_IN} element={<SignInPage />} />
                        <Route
                            exact
                            path={ROUTES.PASSWORD_FORGET}
                            element={<PasswordForgetPage />}
                        />
                        <Route exact path={ROUTES.HOME} element={<HomePage />} />
                        <Route exact path={ROUTES.ACCOUNT} element={<AccountPage />} />
                        <Route exact path={ROUTES.ADMIN} element={<AdminPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthUserContext.Provider>
    );
}

export default withAuthentication(App);
