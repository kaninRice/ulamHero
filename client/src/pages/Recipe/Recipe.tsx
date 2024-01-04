import styles from './Recipe.module.css'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import { SERVER_URL, RECIPE_URI } from '../../config/config';


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
    const url = SERVER_URL + RECIPE_URI + `/${recipeId}`;
    const [recipe, setRecipe] = useState<recipeObject>();

    const fetchRecipe = () => {
        fetch(url)
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
                        <p className={styles.description}>{recipe?.description}</p>

                        <section className={styles.ingredientsSection}>
                            <h2>Ingredients</h2>
                            <ul>
                                {recipe != null &&
                                    recipe.ingredients.map((ingredient) => (
                                        <li>{ingredient}</li>
                                    ))}
                            </ul>
                        </section>

                        <section className={styles.stepsSection}>
                            <h2>Steps</h2>

                            <ol className={styles.stepsList}>
                                {recipe != null &&
                                    recipe.steps.map((step) => (
                                        <li>
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
                                                        (instruction) => (
                                                            <li>
                                                                {instruction}
                                                            </li>
                                                        )
                                                    )}
                                            </ol>
                                        </li>
                                    ))}
                            </ol>
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