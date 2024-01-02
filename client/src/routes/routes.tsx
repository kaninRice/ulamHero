import Home from "../pages/Home/Home";
import Browse from '../pages/Browse';

const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: '/browse',
        element: <Browse />
    },
];

export default routes;