import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../src/i18n/i18n';

export default function LanguageSelection() {
  const router = useRouter();
  const { t } = useTranslation();

  const choose = async (lng: 'en' | 'hi' | 'ta') => {
    await setLanguage(lng);
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 gap-4 p-6 items-stretch justify-center">
      <Text className="text-2xl font-semibold text-center mb-4">{t('select_language')}</Text>

      <Pressable className="bg-blue-600 rounded-md p-4" onPress={() => choose('en')}>
        <Text className="text-white text-center text-base">{t('english')}</Text>
      </Pressable>

      <Pressable className="bg-blue-600 rounded-md p-4" onPress={() => choose('hi')}>
        <Text className="text-white text-center text-base">{t('hindi')}</Text>
      </Pressable>

      <Pressable className="bg-blue-600 rounded-md p-4" onPress={() => choose('ta')}>
        <Text className="text-white text-center text-base">{t('tamil')}</Text>
      </Pressable>
    </View>
  );
}