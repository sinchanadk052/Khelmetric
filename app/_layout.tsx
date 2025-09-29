import React, { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { initI18n } from '../src/i18n/i18n';

function RootNavigator() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    if (!i18nReady || loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [i18nReady, loading, user, segments, router]);

  if (!i18nReady || loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
