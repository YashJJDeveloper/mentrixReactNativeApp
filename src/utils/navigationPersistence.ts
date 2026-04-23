import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const NAV_STATE_KEY = 'NAVIGATION_STATE';

export const saveNavState = (state: any) => {
    try {
        storage.set(NAV_STATE_KEY, JSON.stringify(state));
    } catch (e) {
        console.log('Error saving nav state', e);
    }
};

export const loadNavState = () => {
    try {
        const state = storage.getString(NAV_STATE_KEY);
        return state ? JSON.parse(state) : undefined;
    } catch (e) {
        console.log('Error loading nav state', e);
        return undefined;
    }
};