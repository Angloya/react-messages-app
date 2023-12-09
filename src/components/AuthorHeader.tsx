import { Link } from 'react-router-dom';

interface AuthorHeaderProps {
    userName: string | null
}

const AuthorHeader = ({ userName }: AuthorHeaderProps) => {
    return (
        <div className='flex items-center'>
            <img
                className="w-10 h-10 rounded-full"
                alt="avatar"
                src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />

            <p className="ml-4 text-grey-darkest">
                <Link to={`/author/${userName}`}>{userName}</Link>
            </p>
        </div>
    );
};

export default AuthorHeader;