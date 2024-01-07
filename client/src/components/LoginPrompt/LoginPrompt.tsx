import styles from './LoginPrompt.module.css'
import BookmarkIcon from '../../assets/icons/BookmarkIcon.svg?react';

import { useState, useContext } from 'react';

import { LOGIN_URI, REGISTER_URI, SERVER_URL } from '../../config/config';
import UserTokenContext from '../../util/UserTokenContext';

function LoginForm() {
    const { setUserToken } = useContext(UserTokenContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitOption, setSubmitOption] = useState('');
    
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        let url = SERVER_URL;
        submitOption == 'login'
            ? url = url + LOGIN_URI
            : url = url + REGISTER_URI;

        const data = {
            username: username,
            password: password,
        };


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status == 200) return res.json();
                if (res.status == 201) window.location.reload();
                return null;
            })
            .then((data) => {
                if (data != null) setUserToken(data.token);
            });
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formInputContainer}>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.formButtonContainer}>
                <button onClick={() => setSubmitOption('login')}>Log In</button>
                <button
                    onClick={() => setSubmitOption('signin')}
                    className={styles.signIn}
                >
                    {' '}
                    Sign In
                </button>
            </div>
        </form>
    );
}

function LoginPrompt() {
    return (
        <div className={styles.loginPrompt}>
            <section className={styles.loginCTA}>
                <BookmarkIcon className={styles.icon} />
                <p>Login to save recipes!</p>
            </section>

            <LoginForm />
        </div>
    );
}
export default LoginPrompt;