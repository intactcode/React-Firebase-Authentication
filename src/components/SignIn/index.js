import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const SignInFormBase = (props) => {

    const [data, setData] = useState(INITIAL_STATE)
    const navigate = useNavigate();

    const onSubmit = event => {
        const { email, password } = data;

        props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setData({ ...INITIAL_STATE });
                navigate(ROUTES.HOME);
            })
            .catch(error => {
                setData({ error });
            });

        event.preventDefault();
    };

    const onChange = event => {
        setData(prev => ({ ...prev, [event.target.name]: event.target.value }))
        event.preventDefault()
    };


    const { email, password, error } = data

    const isInvalid = password === '' || email === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
                Sign In
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
}

const SignInForm = withFirebase(SignInFormBase);

export default SignInPage;

export { SignInForm };