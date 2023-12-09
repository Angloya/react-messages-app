import React, { useRef, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(callback: () => void): React.RefObject<T> {
    const ref = useRef<T>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        }
        window.addEventListener('click', handleClick);

        return () => window.removeEventListener('click', handleClick);
    }, [callback]);

    return ref;
}