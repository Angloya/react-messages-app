import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useUserInfo } from '../hooks/useUserInfo';

import { changeInfo, changeName } from '../store/userSlice';

import { UserInfo, Message } from '../models/interfaces';
import { LOCAL_STORAGE_KEYS } from '../models/constants';

import WelcomeModal from '../components/WelcomeModal';
import AuthorHeader from '../components/AuthorHeader';
import MessageList from '../components/MessageList';
import NewMessageModal from '../components/NewMessageModal';
import UiButton from '../components/ui/UiButton';

const MessagesPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    const dispatch = useDispatch();

    const {userName} = useUserInfo();

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const saveUserInfo = useCallback(({ name, info }: UserInfo) => {
        name && dispatch(changeName(name));
        info && dispatch(changeInfo(info));
    }, [dispatch]);

    const closeWelcomeModal = ({ name, info }: UserInfo) => {
        setShowWelcomeModal(false);
        saveUserInfo({ name, info });
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const getMessages = useCallback(async () => {
        // Объединяем данные с сервера и с клиента (если бы было апи то все данные приходили бы с сервера)
        try {
            const response = await fetch('messages.json');
            const data = await response.json();
            const localMessages = localStorage.getItem(LOCAL_STORAGE_KEYS.MESSAGES);
            const parsedLocalMessages = localMessages ? JSON.parse(localMessages) : [];
            setMessages([...data, ...parsedLocalMessages]);
        } catch (err) {
            console.error('fetch error', err);
        }
    }, []);

    const userNotFoundEvent = () => {
        setShowWelcomeModal(true);
    };

    // так как нет апи куда можно отправить данные, сообщение сохранится в localstorage
    const saveText = async(text: string) => {
        const apiMessages = localStorage.getItem(LOCAL_STORAGE_KEYS.MESSAGES);

        try {
            let messages = [];
            if (apiMessages) {
                messages = JSON.parse(apiMessages);
            }

            const newMessage = {
                id: 10000,
                author: userName,
                text,
                datetime: Date.now()
            };
            localStorage.setItem(LOCAL_STORAGE_KEYS.MESSAGES, JSON.stringify([...messages, newMessage]));
            await getMessages();
        } catch (err) {
            console.error('Save message error', err);
        }
    };


    useEffect(() => {
        getMessages();

        const userName = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHOR_NAME);
        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHOR_INFO);

        if (!userName) {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.MESSAGES);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTHOR_INFO);
            setShowWelcomeModal(true);
        } else {
            saveUserInfo({ name: userName, info: userInfo });
        }
    }, [saveUserInfo, getMessages]);

    return (
        <div className='flex flex-col items-center'>
            <div className="py-2 px-3 bg-grey-lighter flex flex-col w-screen justify-between items-center">
                <div className="flex items-center justify-between w-full md:w-3/4">
                    <AuthorHeader userName={userName}/>

                    <UiButton onClick={openModal}>
                        Add new message
                    </UiButton>
                </div>

                <div className='md:w-3/4 w-full'>
                    <MessageList messages={messages} />
                </div>
                
                {showModal && <NewMessageModal
                    closeModal={closeModal} 
                    userNotFoundEvent={userNotFoundEvent}
                    saveText={saveText} />}
                {showWelcomeModal && <WelcomeModal saveModalData={closeWelcomeModal}/>}
            </div>
        </div>
    );
};

export default MessagesPage;