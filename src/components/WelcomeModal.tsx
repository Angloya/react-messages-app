import React, {useState } from 'react';
import { UserInfo } from '../models/interfaces';

import UiModal from './ui/UiModal';
import UiButton from './ui/UiButton';

interface WelcomeModalProps {
    saveModalData: (args: UserInfo) => void
}

enum MessageError {
    MAX_LENGTH = 'Maximum message length 200 characters',
    EMPTY = 'The message must not be empty'
}

const MESSAGE_MAX_LENGTH = 100;
const MESSAGE_MAX_INFO_LENGTH = 200;
// Данные компонент моделирует регистрацию автора и сохраняет данные об авторе 
// в локалсторадж для дальнейшего использования

const WelcomeModal = ({ saveModalData }: WelcomeModalProps) => {
    const [info, setInfo] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const closeModal = () => {
        saveModalData({ name, info});
    };

    const handleInfoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInfo(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSave = () => {
        setError('');
        if (name.length > MESSAGE_MAX_LENGTH) {
            setError(MessageError.MAX_LENGTH);
        }
        if (name.length > 0) {
            saveModalData({name, info});
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
                <h2 className='mb-4'>Enter your name and information about yourself</h2>
                <input
                    onChange={handleNameChange}
                    value={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Your Name"
                    required/>
                <textarea
                    className='mt-4 border-2 w-full p-2.5 text-xs'
                    value={info}
                    onChange={handleInfoChange}
                    maxLength={MESSAGE_MAX_INFO_LENGTH}
                    placeholder="Info about you..." />
                <p className='text-xs'>
                    Characters left: 
                    <span className='pl-1 text-green-600'>{MESSAGE_MAX_INFO_LENGTH - info.length}</span>
                </p>

                <ErrorMessage/>

                <div className="flex justify-center mt-4">
                    <UiButton onClick={handleSave}>
                        Create
                    </UiButton>
                </div>
            </div>
        </UiModal>
    );
};

export default WelcomeModal;