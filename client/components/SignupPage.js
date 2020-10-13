import React from 'react';
import { connect } from 'react-redux';
import {fetchSignup} from '../store/auth';

const SignupPage = ({handleSubmit}) => {

    return (
        <div onSubmit={handleSubmit} className="signup-page-container">
            <form className="signup">
                <svg
                viewBox="0 0 24 24"
                className="logo-small signup__logo"
                >
                    <g>
                         <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                   </g>
                </svg>
                <h1 className="header-main header-main--primary util-align-self-start">Create your account</h1>
                <div className="wrapper wrapper__signup">
                    <input className="input input__signup" name="name"></input>
                    <span className="input-placeholder">
                        Name
                    </span>
                </div>

                <div className="wrapper wrapper__signup">
                    <input className="input input__signup" name="username"></input>
                    <span className="input-placeholder">
                        Username
                    </span>
                </div>

                <div className="wrapper wrapper__signup">
                    <input className="input input__signup" name="email"></input>
                    <span className="input-placeholder">
                        Email
                    </span>
                </div>

                <div className="wrapper wrapper__signup">
                    <input className="input input__signup" name="password"></input>
                    <span className="input-placeholder">
                        Password
                    </span>
                </div>

                <div className="wrapper wrapper__signup">
                    <input className="input input__signup" name="passwordConfirm"></input>
                    <span className="input-placeholder">
                        Confirm Password
                    </span>
                </div>

                <button type="submit" className="btn">Sign up</button>
            </form>
        </div>
    )

}

const mapDispatch = dispatch => {
    return {
        handleSubmit: (e) => {
            e.preventDefault();
            const name = e.target.name.value
            const username = e.target.username.value
            const email = e.target.email.value
            const password = e.target.password.value
            const passwordConfirm = e.target.passwordConfirm.value
            dispatch(fetchSignup({name, username, email, password, passwordConfirm}))
        }
    }
}

export default connect(null, mapDispatch)(SignupPage)