import React from 'react';

interface UiButtonProps<T> {
    children: React.ReactNode
    onClick: (e: React.MouseEvent) => T
}

const UiButton = <T,>({ children, onClick }: UiButtonProps<T>) => {
    return (
        <button
            onClick={onClick}
            className="p-2 my-2 rounded bg-gray-700 text-white">
            {children}
        </button>
    );
};

export default UiButton;