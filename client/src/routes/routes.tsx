import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Recipe from '../pages/Recipe/Recipe';
import User from '../pages/User/User';

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
    {
        path: '/user',
        element: <User />,
    },
];

export default routes;