import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const go = (path: string) => router.push(path);

  return (
    <View className="flex-1 justify-center p-6 gap-4 bg-white">
      <Text className="text-2xl font-bold text-center mb-4">{t('home')}</Text>

      <Pressable className="bg-blue-600 rounded-xl p-5" onPress={() => go('/(app)/tests/situp')}>
        <Text className="text-white text-center text-lg">Sit-up Test</Text>
      </Pressable>

      <Pressable className="bg-green-600 rounded-xl p-5" onPress={() => go('/(app)/tests/jump')}>
        <Text className="text-white text-center text-lg">Jump Test</Text>
      </Pressable>

      <Pressable className="bg-gray-800 rounded-xl p-5" onPress={() => go('/(app)/tests/results')}>
        <Text className="text-white text-center text-lg">My Results</Text>
      </Pressable>
    </View>
  );
}
