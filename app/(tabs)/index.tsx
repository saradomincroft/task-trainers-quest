import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Login from '@/components/Login';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {

  const colorScheme = useColorScheme();
  
  const theme = Colors[colorScheme || 'light'];

  return (
    <View
      style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background, 
      }}
    >
      <Text style={{ color: theme.text }}>
        Welcome to Task Trainers Quest
      </Text>
      <Login onLogin={() => console.log('User logged in')} />
    </View>
  );
}
