import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const { login, signup, skip } = useAuth();
  const { t } = useTranslation();
  const [name, setName] = useState('');

  return (
    <View className="flex-1 items-center justify-center gap-4 p-6 bg-white">
      <Text className="text-2xl font-bold">{t('welcome')}</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-md p-3"
        placeholder="Name (optional)"
        value={name}
        onChangeText={setName}
      />
      <Pressable className="w-full bg-blue-600 rounded-md p-3" onPress={() => login({ name })}>
        <Text className="text-white text-center font-medium">{t('login')}</Text>
      </Pressable>
      <Pressable className="w-full bg-green-600 rounded-md p-3" onPress={() => signup({ name })}>
        <Text className="text-white text-center font-medium">{t('signup')}</Text>
      </Pressable>
      <Pressable className="w-full bg-gray-200 rounded-md p-3" onPress={skip}>
        <Text className="text-center font-medium">{t('skip_login')}</Text>
      </Pressable>
    </View>
  );
}
