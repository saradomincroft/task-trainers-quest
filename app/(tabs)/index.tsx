import React, { useState } from 'react';
import { View, Text, useColorScheme, Button } from 'react-native';
import Login from '@/components/Login';
import SignUp from '@/components/Signup';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const [isLogin, setIsLogin] = useState(true);
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
      {isLogin ? (
        <Login onLogin={() => console.log('User logged in')} />      
      ) : (
        <SignUp onSignUp={() => console.log('User signed up')} />
      )}
      <Button
        title={isLogin ? "Don't have an accoutn? Sign Up" : "Already have an account? Log in"}
        onPress={() => setIsLogin(!isLogin)}
      />
     
    </View>
  );
}
