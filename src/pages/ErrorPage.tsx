import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';

export default function ErrorPage(): ReactElement {
    const navigate = useNavigate();
    const error = useRouteError();
    let errorMessage = '';

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    const redirectToMain = (): void => {
        navigate('/');
    };
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-xl'>Oops</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{errorMessage}</p>
            <button
                className='mt-4 rounded p-2 bg-gray-700 text-white'
                onClick={redirectToMain}>
                    Main page
            </button>
        </div>
    );
}