import { Outlet, Link } from 'react-router-dom';
import { ReactElement } from 'react';

export default function Root(): ReactElement { 
    return (
        <div className='flex flex-col justify-start items-center overflow-hidden p-4 h-screen w-screen'>
            <h1 className="text-3xl p-4 block text-center">
                Messages App
            </h1>
            <Link className="absolute left-3 top-3" to='/'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </Link>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    );
}