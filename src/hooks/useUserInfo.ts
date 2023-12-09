import { useSelector } from 'react-redux';
import type { RootState } from '../store/app';

interface UseUserInfo {
    userName: string | null
    userInfo: string| null
}

export function useUserInfo(): UseUserInfo {
    const userName = useSelector((state: RootState) => state.user.name);
    const userInfo = useSelector((state: RootState) => state.user.info);
    
    return { 
        userName, 
        userInfo 
    };
}