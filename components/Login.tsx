import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'The email address is not valid.',
        'auth/user-not-found': 'No user found with this email address.',
        'auth/wrong-password': 'The password you entered is incorrect.',
        'auth/invalid-credential': 'Incorrect password, please check your login details.',
        'auth/network-request-failed': 'There seems to be a network issue. Please try again.',
        'auth/email-not-verified': 'Please verify your email address before logging in.',
    };

    const handleLogin = async () => {
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length === 0) {
                setError(errorMessages['auth/user-not-found']);
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (user.emailVerified) {
                onLogin();
            } else {
                setError('Please verify your email, it may take a few minutes to arrive.');
            }
        } catch (error: any) {
            console.log(error); 
    
            const firebaseErrorCode = error.code;
            console.log('Firebase error code:', firebaseErrorCode);  
            const errorMessage = errorMessages[firebaseErrorCode] || 'An unexpected error occurred. Please try again.';
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
                    onChangeText={(text) => {
                        setEmail(text);
                        setError('');
                    }}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setError('');
                    }}
                    secureTextEntry
                />
                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                ) : null }
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
