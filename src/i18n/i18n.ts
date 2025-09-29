import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import hi from './locales/hi.json';
import ta from './locales/ta.json';

export const LANGUAGE_STORAGE_KEY = 'i18n:lang';

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ta: { translation: ta },
} as const;

let initialized = false;

export async function initI18n() {
  if (initialized) return i18n;

  // Load persisted language or fall back to device locale
  const persisted = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  const deviceLocale = Localization.getLocales?.()[0]?.languageCode || 'en';
  const fallback = ['en', 'hi', 'ta'].includes(deviceLocale) ? deviceLocale : 'en';
  const lng = persisted || fallback;

  await i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      lng,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      returnNull: false,
    });

  initialized = true;
  return i18n;
}

export async function setLanguage(lng: 'en' | 'hi' | 'ta') {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
}
