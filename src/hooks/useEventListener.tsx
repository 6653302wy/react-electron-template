import { useEffect } from 'react';
import { catchEvent, removeEvent } from '../utils/WindowEvent';

export const useEventListener = (eventName: string, handler: (e?: any) => void) => {
    useEffect(() => {
        catchEvent(eventName, handler);
        return () => {
            removeEvent(eventName, handler);
        };
    }, [eventName, handler]);
};
