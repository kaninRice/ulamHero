import styles from './Navbar.module.css';
import AccountIcon from '../../assets/icons/AccountIcon.svg?react';

import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className={styles.navContainer}>
            <h1>
                <Link to="/" className={styles.appName}>
                    ulam<span>Hero</span>
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/search" className={styles.navOptions}>
                        Browse
                    </Link>
                </li>
                <li>
                    <Link to="/user">
                        <AccountIcon className={styles.icon} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;