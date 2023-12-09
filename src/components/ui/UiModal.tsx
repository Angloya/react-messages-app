import React from 'react';
import {useClickOutside} from '../../hooks/useClickOutside';

interface UiModalProps<T> {
    children: React.ReactNode
    closeEvent: (args?: T) => void
}

const UiModal = <T, >({ children, closeEvent }: UiModalProps<T>) => {
    const ref = useClickOutside<HTMLDivElement>(closeEvent);

    return (
        <div className='overflow-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full'>
            <div className='fixed top-0 right-0 left-0 z-10 bg-slate-400 opacity-70 w-full h-full'/>
            <div ref={ref} className="p-4 relative bg-white z-50 rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default UiModal;