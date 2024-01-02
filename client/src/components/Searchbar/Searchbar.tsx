import style from './Searchbar.module.css'
import SearchIcon from '../../assets/icons/SearchIcon.svg?react'

import { useNavigate } from 'react-router-dom';

function Searchbar() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            query: { value: string }
        }

        navigate(`/search?q=${target.query.value}`);
    };

    return (
        <form className={style.searchbarContainer} onSubmit={handleSubmit}>
            <input
                name="query"
                type="text"
                placeholder="Search key words, ingredients, etc."
            />
            <button type="submit">
                <SearchIcon />
            </button>
        </form>
    );
}

export default Searchbar;