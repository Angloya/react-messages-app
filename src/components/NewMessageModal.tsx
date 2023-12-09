import React, {useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';

import UiModal from './ui/UiModal';
import UiButton from './ui/UiButton';

interface NewMessageModalProps {
    closeModal: () => void
    userNotFoundEvent: () => void
    saveText: (text: string) => void
}

const MESSAGE_MAX_LENGTH = 200;

enum MessageError {
    MAX_LENGTH = 'Maximum message length 200 characters',
    EMPTY = 'The message must not be empty',
    NOT_USER_NAME = 'Please refresh the page and try again'
}

const NewMessageModal = ({ closeModal, userNotFoundEvent, saveText }: NewMessageModalProps) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const { userName } = useUserInfo();


    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        setError('');
        if (!userName) {
            userNotFoundEvent();
        }
        if (text.length > MESSAGE_MAX_LENGTH) {
            setError(MessageError.MAX_LENGTH);
        }
        if (text.length > 0) {
            saveText(text);
            closeModal();
        } else {
            setError(MessageError.EMPTY);
        }
    };

    const ErrorMessage = () => {
        return error.length > 0 && <p className='text-xs text-red-600'>The message must not be empty</p>;
    };

    return (
        <UiModal closeEvent={closeModal}>
            <div className="w-64">
                <h2>New Message</h2>
                <textarea 
                    className='mt-4 border-2 w-full'
                    value={text}
                    onChange={handleTextChange}
                    maxLength={MESSAGE_MAX_LENGTH} />
                <p className='text-xs'>
                    Characters left: 
                    <span className='pl-1 text-green-600'>{MESSAGE_MAX_LENGTH - text.length}</span>
                </p>

                <ErrorMessage/>

                <div className="flex justify-between mt-4">
                    <UiButton onClick={handleSave}>
                        New Message
                    </UiButton>
                    <UiButton onClick={closeModal}>
                        Cancel
                    </UiButton>
                </div>
            </div>
        </UiModal>
    );
};

export default NewMessageModal;