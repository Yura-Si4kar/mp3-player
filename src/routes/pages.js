import Albums from "../pages/Albums";
import Auth from "../pages/Auth";
import Library from "../pages/Library";
import Search from "../pages/Search";
import { HOME_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "../utils/consts";

export const publicPages = [
    {
        path: LOGIN_ROUTE,
        components: <Auth />,
        caseSensitive: true,
    },
    {
        path: REGISTRATION_ROUTE,
        components: <Auth />,
        caseSensitive: true,
    },
];

export const privatePages = [
    {
        path: HOME_ROUTE,
        components: <Albums />,
        caseSensitive: true,
    },
    {
        path: SEARCH_ROUTE,
        components: <Search />,
        caseSensitive: true,
    },
    {
        path: LIBRARY_ROUTE,
        components: <Library />,
        caseSensitive: true,
    },
]