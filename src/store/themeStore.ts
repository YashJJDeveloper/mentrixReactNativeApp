import {create} from 'zustand';
import {MMKV} from 'react-native-mmkv';

const storage = {
  getString: (p0: string) => null,
  set: (p0: string, newTheme: string) => {},
};

type ThemeType = 'light' | 'dark';

interface ThemeState {
  theme: ThemeType;
  toggleTheme: () => void;
  loadTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (storage.getString('appTheme') as unknown as ThemeType) || 'light',

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      storage.set('appTheme', newTheme);
      return {theme: newTheme};
    }),

  loadTheme: () => {
    const savedTheme = storage.getString('appTheme') as unknown as ThemeType | undefined;
    if (savedTheme) set({theme: savedTheme});
  },
}));