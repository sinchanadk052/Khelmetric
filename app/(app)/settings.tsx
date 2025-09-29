import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../src/i18n/i18n';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const change = async (lng: 'en' | 'hi' | 'ta') => {
    await setLanguage(lng);
  };

  return (
    <View className="flex-1 gap-4 p-4">
      <Text className="text-lg font-semibold">{t('select_language')}</Text>
      <View className="gap-2">
        <Pressable className={`p-3 rounded-md ${i18n.language === 'en' ? 'bg-blue-600' : 'bg-gray-200'}`} onPress={() => change('en')}>
          <Text className={`${i18n.language === 'en' ? 'text-white' : 'text-black'} text-center`}>{t('english')}</Text>
        </Pressable>
        <Pressable className={`p-3 rounded-md ${i18n.language === 'hi' ? 'bg-blue-600' : 'bg-gray-200'}`} onPress={() => change('hi')}>
          <Text className={`${i18n.language === 'hi' ? 'text-white' : 'text-black'} text-center`}>{t('hindi')}</Text>
        </Pressable>
        <Pressable className={`p-3 rounded-md ${i18n.language === 'ta' ? 'bg-blue-600' : 'bg-gray-200'}`} onPress={() => change('ta')}>
          <Text className={`${i18n.language === 'ta' ? 'text-white' : 'text-black'} text-center`}>{t('tamil')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
