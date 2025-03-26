import React, { useState } from 'react';
import { View, Text, useColorScheme, Button, StyleSheet } from 'react-native';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
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
      <Text style={ [styles.title, { color: theme.text }]}>
        Welcome to Task Trainers Quest
      </Text>

      {isLogin ? (
        <Login onLogin={() => console.log('User logged in')} />      
      ) : (
        <SignUp onSignUp={() => console.log('User signed up')} />
      )}

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title={isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log in"}
            onPress={() => setIsLogin(!isLogin)}
            color="#007BFF"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {

  },
  buttonWrapper: {

  },
});