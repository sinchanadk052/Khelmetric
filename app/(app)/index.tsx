import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../src/context/AuthContext';
import { useTranslation } from 'react-i18next';

const TEST_DATA_KEY = 'app:test-data';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [value, setValue] = useState('');
  const [loaded, setLoaded] = useState<string | null>(null);

  const save = async () => {
    await AsyncStorage.setItem(TEST_DATA_KEY, value);
    setValue('');
  };
  const load = async () => {
    const v = await AsyncStorage.getItem(TEST_DATA_KEY);
    setLoaded(v);
  };

  return (
    <View className="flex-1 gap-4 p-4">
      <Text className="text-lg">{t('hello')} {user?.guest ? '(Guest)' : user?.name || ''}</Text>

      <View className="gap-2">
        <TextInput
          className="border border-gray-300 rounded-md p-3"
          placeholder="Some test data"
          value={value}
          onChangeText={setValue}
        />
        <Pressable className="bg-blue-600 rounded-md p-3" onPress={save}>
          <Text className="text-white text-center">{t('save_test_data')}</Text>
        </Pressable>
        <Pressable className="bg-gray-200 rounded-md p-3" onPress={load}>
          <Text className="text-center">{t('load_test_data')}</Text>
        </Pressable>
        {loaded != null && (
          <Text className="mt-2">{t('saved_value', { value: loaded })}</Text>
        )}
      </View>

      <Pressable className="bg-red-600 rounded-md p-3 mt-auto" onPress={logout}>
        <Text className="text-white text-center">{t('logout')}</Text>
      </Pressable>
    </View>
  );
}
