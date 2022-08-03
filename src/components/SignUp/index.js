import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpFormBase = (props) => {

    const [data, setData] = useState(INITIAL_STATE)
    const navigate = useNavigate();

    const onSubmit = event => {
        const { username, email, passwordOne } = data;

        props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(() => {
                // Create a user in your Firebase realtime database
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

    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = data;

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">
                Sign Up
            </button>

            {error && <p>{error.message}</p>}
        </form>
    )
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };