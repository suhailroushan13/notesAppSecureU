import Login from "../Login";
import HomePage from "../Home";
import Register from "../Register";
const publicRoutes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];

export default publicRoutes;