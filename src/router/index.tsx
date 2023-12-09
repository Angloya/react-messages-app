import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/root';
import MessagesPage from '../pages/MessagesPage';
import AuthorPage from '../pages/AuthorPage';
import ErrorPage from '../pages/ErrorPage';

export const baseRouter = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MessagesPage />,
            },
            {
                path: '/author/:authorName',
                element: <AuthorPage />,
            },
        ]
    }
]);