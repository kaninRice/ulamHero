import styles from './Navbar.module.css';

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
            </ul>
        </nav>
    );
}

export default Navbar;