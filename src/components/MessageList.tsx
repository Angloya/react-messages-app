import { useRef, useEffect, useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import { Message } from '../models/interfaces';

import MessageItem from './MessageItem';
import MessageSearch from './MessageSearch';
import EmptyMessageList from './EmptyMessagesList';

interface MessageListProps {
    messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
    const [text, setText] = useState('');
    const {userName} = useUserInfo();
    const ref = useRef<null | HTMLLIElement>(null);

    const filtredMessages = messages.filter((message) => {
        return message.text.toLowerCase().includes(text.toLocaleLowerCase());
    });
    
    const posiitonClassName = (author: string) => author === userName && 'self-end';
    const messagesCount = messages.length - 1;

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const listTemplate = <div className="py-2 px-3 bg-gray-700 rounded w-full overflow-auto">
        <ul className='flex flex-col'>
            {filtredMessages.map((message, id) => (
                <li
                    ref={id === messagesCount ? ref : null}
                    key={message.author + id}
                    className={`${posiitonClassName(message.author)}`}>
                    <MessageItem message={message} />
                </li>
            ))}
        </ul>
    </div>;

    if (messages.length) {
        return (
            <div className="flex flex-col my-4 h-[70vh] w-full">
                <MessageSearch text={text} onChange={handleTextChange}/>

                {filtredMessages.length ? listTemplate : <EmptyMessageList />}
            </div>
        );
    } 
    
    return <EmptyMessageList/>;
};

export default MessageList;