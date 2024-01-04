import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Recipe from '../pages/Recipe/Recipe';

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '/recipe/:recipeId',
        element: <Recipe />,
    },
];

export default routes;