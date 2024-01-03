import Home from "../pages/Home/Home";
import Search from '../pages/Search/Search';

const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: '/search',
        element: <Search />
    },
];

export default routes;