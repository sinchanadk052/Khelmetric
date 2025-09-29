import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function AppLayout() {
  const { t } = useTranslation();
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: t('home') }} />
      <Tabs.Screen name="settings" options={{ title: t('settings') }} />
    </Tabs>
  );
}
