import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = props => condition => Component => {

    const WithAuthorization = props => {
        const navigate = useNavigate();

        const getAuthState = user => {
            if (!condition(user)) {
                navigate(ROUTES.SIGN_IN);
            }
        }
        useEffect(() => {
            props.firebase
                .doOnAuthStateChanged(getAuthState)
        })

        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    condition(authUser) ? <Component {...this.props} /> : null
                }
            </AuthUserContext.Consumer>
        )
    }


    return withFirebase(WithAuthorization);
};

export default withAuthorization;