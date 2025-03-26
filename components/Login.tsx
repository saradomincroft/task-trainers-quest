import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'The email address is not valid.',
        'auth/user-not-found': 'No user found with this email address.',
        'auth/wrong-password': 'The password you entered is incorrect.',
        'auth/network-request-failed': 'There seems to be a network issue. Please try again.',
        'auth/email-not-verified': 'Please verify your email address before logging in.',
    }

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLogin();
        } catch (error: any) {
            const firebaseErrorCode = error.code;
            const errorMessage = errorMessages[firebaseErrorCode] || 'An unexpcted error occurred. Please try again.'
            setError(errorMessage);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                {error && <Text style={styles.error}>{error}</Text>}
            </View>                
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 240,
        alignItems: 'center',
        backgroundColor: 'purple',
    },
    container: {
        height: 200,
        width: 320,
        alignItems: 'center',
        backgroundColor: 'yellow',
        overflow: 'hidden',
    },
    input: {
        width: 280,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
        color: 'black',
    },
    errorContainer: {
        width: 280,
        height: 80,
        backgroundColor: 'cyan',
    },
    error: {
        color: 'red',
        width: 280,
        textAlign: 'center',
    },
    buttonContainer: {
        width: 280,
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    }
});

export default Login;
