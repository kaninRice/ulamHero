import styles from './Home.module.css'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import Footer from '../../components/Footer/Footer';

import { SERVER_URL, GET_FEATURED_RECIPES_URI } from '../../config/config';

type leanRecipe = {
    _id: string;
    name: string;
    imgPath: string;
};

function Home() {
    const url = SERVER_URL + GET_FEATURED_RECIPES_URI
    const [featuredRecipes, setFeaturedRecipes] = useState <leanRecipe[]>([]);

    const fetchFeaturedRecipes = () => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setFeaturedRecipes(data);
            });
    };

    useEffect(() => {
        fetchFeaturedRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className={styles.banner}>
                <Navbar />

                <div className={styles.bannerContent}>
                    <div className={styles.callToAction}>
                        <p>
                            What are
                            <br />
                            you looking for
                            <br />
                            pare?
                        </p>
                    </div>

                    <div className={styles.searchBarContainer}>
                        <Searchbar />
                    </div>
                </div>
            </section>

            <section className={styles.featuredSection}>
                <h2>Featured Recipes</h2>

                <ul>
                    {featuredRecipes.length > 0 &&
                        featuredRecipes.map((recipe) => (
                            <Link to={`/recipe/${recipe._id}`} className={styles.link}>
                                <li>
                                    <img src={SERVER_URL + recipe.imgPath} />
                                    <p>{recipe.name}</p>
                                </li>
                            </Link>
                        ))}
                </ul>
            </section>

            <Footer />
        </>
    );
}

export default Home;