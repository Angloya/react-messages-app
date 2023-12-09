import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Author, Message } from '../models/interfaces';
import { LOCAL_STORAGE_KEYS } from '../models/constants';

import MessageList from '../components/MessageList';
import AuthorHeader from '../components/AuthorHeader';

const defaultInfo = 'The author has not yet added information about himself';

const AuthorPage = () => {
    const [author, setAuthor] = useState<Author>();
    const { authorName } = useParams();

    const infoText = author?.info ? author?.info : defaultInfo;

    useEffect(() => {
        // Если автор из списка фетчим данные и выбираем автора из списка
        // Если автор пользователь - берем данные из localStorage
        const getAuthorData = async () => {
            try {
                const userName = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHOR_NAME);

                if (authorName === userName) {
                    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHOR_INFO);
                    const localMessages = localStorage.getItem(LOCAL_STORAGE_KEYS.MESSAGES);
                    const messages: Message[] = localMessages ? JSON.parse(localMessages) : [];
                    
                    setAuthor({
                        id: 1,
                        name: userName,
                        info: userInfo ?? '',
                        messages
                    });
                } else {
                    const response = await fetch('../authors_data.json');
                    const data: Author[] = await response.json();

                    setAuthor(data.find(({ name }) => name === authorName));
                }
            } catch (err) {
                console.error('fetch error', err);
            }
        };
        getAuthorData();
    }, [authorName]);

    if (author) {
        return (
            <div className='flex flex-col items-center justify-center w-full'>
                <div className="w-full md:w-3/4">
                    <AuthorHeader userName={author?.name} />
                    <p className='mt-2'>About author: {infoText}</p>
                </div>

                <div className='w-full md:w-3/4'>
                    <MessageList messages={author?.messages} />
                </div>
            </div>
        );
    } 
    
    return <p className='text-center text-xl'>Sorry... Author not found</p>;

};

export default AuthorPage;

