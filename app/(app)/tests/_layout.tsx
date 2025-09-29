import React from 'react';
import { Stack } from 'expo-router';

export default function TestsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="situp" options={{ title: 'Sit-up Test' }} />
      <Stack.Screen name="jump" options={{ title: 'Jump Test' }} />
      <Stack.Screen name="results" options={{ title: 'My Results' }} />
    </Stack>
  );
}
