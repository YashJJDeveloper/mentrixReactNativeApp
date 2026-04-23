import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

interface User {
  name: string;
  email?: string;
  token?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// 🔥 Load user immediately (sync)
const getStoredUser = (): User | null => {
  try {
    const data = storage.getString('user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const useUserStore = create<UserState>((set) => ({
  user: getStoredUser(), // ✅ IMPORTANT

  setUser: (user) => {
    storage.set('user', JSON.stringify(user)); // ✅ persist
    set({ user });
  },

  clearUser: () => {
    storage.delete('user'); // ✅ remove
    storage.delete('NAVIGATION_STATE'); // 🔥 VERY IMPORTANT
    set({ user: null });
  },
}));