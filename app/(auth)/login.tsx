import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { login, signup, skip } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    setError(null);
    try {
      await login({ email, password });
    } catch (e: any) {
      setError(e?.message || 'Login failed');
    }
  };

  const onSignup = async () => {
    setError(null);
    try {
      await signup({ email, password });
    } catch (e: any) {
      setError(e?.message || 'Signup failed');
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 p-6 bg-white">
      <Text className="text-2xl font-bold">{t('welcome')}</Text>

      {!!error && <Text className="text-red-600">{error}</Text>}

      <TextInput
        className="w-full border border-gray-300 rounded-md p-3"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-md p-3"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable className="w-full bg-blue-600 rounded-md p-3" onPress={onLogin}>
        <Text className="text-white text-center font-medium">{t('login')}</Text>
      </Pressable>
      <Pressable className="w-full bg-green-600 rounded-md p-3" onPress={onSignup}>
        <Text className="text-white text-center font-medium">{t('signup')}</Text>
      </Pressable>
      <Pressable className="w-full bg-gray-200 rounded-md p-3" onPress={skip}>
        <Text className="text-center font-medium">{t('skip_login')}</Text>
      </Pressable>

      <Pressable className="w-full bg-purple-600 rounded-md p-3" onPress={() => router.push('/(auth)/language')}>
        <Text className="text-white text-center font-medium">{t('select_language')}</Text>
      </Pressable>
    </View>
  );
}
