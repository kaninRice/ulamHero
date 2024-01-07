import styles from './User.module.css'

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginPrompt from '../../components/LoginPrompt/LoginPrompt';

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import UserTokenContext from "../../util/UserTokenContext";
import { SERVER_URL, GET_USER_BOOKMARK_URI, DELETE_USER_URI } from '../../config/config';

type recipeItem = {
    _id: string;
    name: string;
    imgPath: string;
    description: string;
};

function UserContent({
    bookmarkList,
    setBookmarkList,
}: {
    bookmarkList: recipeItem[];
    setBookmarkList: Dispatch<SetStateAction<recipeItem[]>>;
}) {
    const deleteAccountUrl = SERVER_URL + DELETE_USER_URI;
    const { userToken, setUserToken } = useContext(UserTokenContext);

    const handleLogout = () => {
        setUserToken('');
        setBookmarkList([]);
    };

    const handleDeleteAccount = () => {
        fetch(deleteAccountUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        }).then((res) => {
            if (res.status == 200) {
                console.log('200get')
                setUserToken('');
                setBookmarkList([]);
            }
        });
    };

    return (
        <div className={styles.bodyContent}>
            <div className={styles.actionContainer}>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>

            <div className={styles.itemList}>
                <ul>
                    {bookmarkList.length > 0 &&
                        bookmarkList.map((recipe) => (
                            <Link
                                to={`/recipe/${recipe._id}`}
                                className={styles.link}
                                key={recipe._id}
                            >
                                <li>
                                    <img src={SERVER_URL + recipe.imgPath} />

                                    <div className={styles.recipeInformation}>
                                        <p className={styles.recipeName}>
                                            {recipe.name}
                                        </p>
                                        <p className={styles.recipeDescription}>
                                            {recipe.description}
                                        </p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                </ul>
            </div>
        </div>
    );
}

function User() {
    const url = SERVER_URL + GET_USER_BOOKMARK_URI;
    const { userToken } = useContext(UserTokenContext);
    const [bookmarkList, setBookmarkList] = useState<recipeItem[]>([])

    const fetchBookmarkList = () => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setBookmarkList(data);
            });
    }

    useEffect(() => {
        fetchBookmarkList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userToken])

    return (
        <>
            <section className={styles.banner}>
                <Navbar />
            </section>

            <section className={styles.bodySection}>
                {userToken == '' ? (
                    <LoginPrompt />
                ) : (
                    <UserContent
                        bookmarkList={bookmarkList}
                        setBookmarkList={setBookmarkList}
                    />
                )}
            </section>

            <Footer />
        </>
    );
}

export default User;
