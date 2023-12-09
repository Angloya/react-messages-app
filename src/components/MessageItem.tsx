import { Link } from 'react-router-dom';
import { Message } from '../models/interfaces';

interface MessageProps {
    message: Message
}

const MessageItem = ({ message }: MessageProps) => {
    const date = new Date(message.datetime).toLocaleString();
    return (
        <div className='mb-2 p-2 bg-sky-100 rounded  max-w-sm w-fit'>
            <p className='text-sm text-teal text-cyan-900'>
                <Link to={`/author/${message.author}`}>
                    {message.author}
                </Link>
            </p>
            <p className="text-sm mt-1">{message.text}</p>
            <p className="text-right text-xs text-slate-600 mt-1">
                {date}
            </p>
        </div>
    );
};

export default MessageItem;