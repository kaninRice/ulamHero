import styles from './Search.module.css'
import CloseIcon from '../../assets/icons/CloseIcon.svg?react';
import { useEffect, useState } from 'react';

import { useSearchParams, SetURLSearchParams } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import { SERVER_URL, QUERY_RECIPES_URI } from '../../config/config';

type recipeItem = {
    _id: string;
    name: string;
    imgPath: string;
    description: string;
};

function QueryBar({
    searchQuery,
    setSearchQuery,
}: {
    searchQuery: URLSearchParams;
    setSearchQuery: SetURLSearchParams;
}) {
    const query = searchQuery.get('q') || '';
    const handleQueryChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setSearchQuery({'q': target.value});
    };

    return (
        <>
            <input
                name="query"
                type="text"
                placeholder="Search key words, ingredients, etc."
                value={query}
                onChange={handleQueryChange}
            />

            {query != '' ? (
                <button onClick={() => setSearchQuery('')}>
                    <CloseIcon className={styles.closeIcon} />
                </button>
            ) : null}
        </>
    );
}

function Browse() {
    const url = SERVER_URL + QUERY_RECIPES_URI;
    const [searchQuery, setSearchQuery] = useSearchParams();
    const [searchResult, setSearchResult] = useState<recipeItem[]>([]);

    const fetchSearchResult = () => {
        const query = searchQuery.get('q');

        if (query == null) return;

        fetch(url + `/${query}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setSearchResult(data);
            });
    };

    useEffect(() => {
        fetchSearchResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    return (
        <>
            <section className={styles.banner}>
                <Navbar />

                <div className={styles.bannerContent}>
                    <div className={styles.queryBarContainer}>
                        <QueryBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>
                </div>
            </section>

            <section className={styles.contentSection}>
                <h2>
                    <span>{searchResult.length}</span> Recipes found
                </h2>

                <ul>
                    {searchResult.length > 0
                        ? searchResult.map((recipe) => (
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
                            
                        ))
                        : null}
                </ul>
            </section>

            <Footer />
        </>
    );
}

export default Browse;
