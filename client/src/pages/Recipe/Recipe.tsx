import styles from './Recipe.module.css'
import BookmarkIcon from '../../assets/icons/BookmarkIcon.svg?react';

import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import { SERVER_URL, GET_ONE_RECIPE_URI, ADD_BOOKMARK_URI, DELETE_BOOKMARK_URI, VERIFY_BOOKMARK_URI } from '../../config/config';
import UserTokenContext from '../../util/UserTokenContext';


type recipeObject = {
    _id: string;
    name: string;
    imgPath: string;
    description: string;
    ingredients: [string];
    steps: [{
        title: string;
        instructions: [string]
    }];
    notes: [string];
};

function Recipe() {
    const { recipeId } = useParams();
    const fetchRecipeUrl = SERVER_URL + GET_ONE_RECIPE_URI + `/${recipeId}`;
    const [recipe, setRecipe] = useState<recipeObject>();

    const { userToken } = useContext(UserTokenContext);
    const navigate = useNavigate();

    const addBookmarkUrl = SERVER_URL + ADD_BOOKMARK_URI;
    const deleteBookmarkUrl = SERVER_URL + DELETE_BOOKMARK_URI;
    const verifyBookmarkUrl = SERVER_URL + VERIFY_BOOKMARK_URI;

    const handleBookmark = async () => {
        if (userToken != '') {
            // check if recipe is bookmarked
            fetch(`${verifyBookmarkUrl}/${recipe?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.isBookmarked) {
                        deleteBookmark();
                    } else {
                        addBookmark();
                    }
                });
        } else {
            navigate(`/user`);
        }
    }

    const addBookmark = () => {
        fetch(addBookmarkUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ recipeId: `${recipe?._id}` }),
        });
    }

    const deleteBookmark = () => {
        fetch(deleteBookmarkUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ recipeId: `${recipe?._id}` }),
        });
    }

    const fetchRecipe = () => {
        fetch(fetchRecipeUrl)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setRecipe(data);
            });
    };

    useEffect(() => {
        fetchRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            <section className={styles.navBar}>
                <Navbar />
            </section>

            <section className={styles.bodySection}>
                <div className={styles.contentContainer}>
                    <div className={styles.contentBody}>
                        <p className={styles.description}>
                            {recipe?.description}
                        </p>

                        <section className={styles.ingredientsSection}>
                            <h2>Ingredients</h2>
                            <ul>
                                {recipe != null &&
                                    recipe.ingredients.map(
                                        (ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        )
                                    )}
                            </ul>
                        </section>

                        <section className={styles.stepsSection}>
                            <h2>Steps</h2>

                            <ol className={styles.stepsList}>
                                {recipe != null &&
                                    recipe.steps.map((step, index) => (
                                        <li key={index}>
                                            <span className={styles.stepTitle}>
                                                {step.title}
                                            </span>

                                            <ol
                                                className={
                                                    styles.instructionsList
                                                }
                                            >
                                                {step != null &&
                                                    step.instructions.map(
                                                        (
                                                            instruction,
                                                            index
                                                        ) => (
                                                            <li key={index}>
                                                                {instruction}
                                                            </li>
                                                        )
                                                    )}
                                            </ol>
                                        </li>
                                    ))}
                            </ol>
                        </section>

                        <section className={styles.userActions}>
                            <button
                                onClick={handleBookmark}
                                className={styles.bookmarkBtn}
                            >
                                <BookmarkIcon className={styles.bookmarkIcon} />
                                Bookmark
                            </button>
                        </section>
                    </div>

                    <section className={styles.footerSection}>
                        <Footer />
                    </section>
                </div>

                <div className={styles.imageContainer}>
                    <img src={SERVER_URL + recipe?.imgPath} />
                </div>
            </section>
        </>
    );
}

export default Recipe;