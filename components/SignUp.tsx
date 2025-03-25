import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig'

const SignUp = ({ onSignUp }: { onSignUp: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'The email address is not valid.',
        'auth/email-already-in-use': 'This email is already registered. Try logging in.',
        'auth/weak-password': 'The password is too weak. Try using a stronger password.',
        'auth/operation-not-allowed': 'Sign-up is not enabled. Please contact support.',
        'auth/internal-error': 'An internal error occurred. Please try again later.',
    }

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            Alert.alert('Verification Email Sent', 'Please check your inbox to verify your email.');

            onSignUp();
        } catch (error: any) {
            const firebaseErrorCode = error.code;
            const errorMessage = errorMessages[firebaseErrorCode] || 'An unexpcted error occurred. Please try again.'

            setError(errorMessage);
            Alert.alert('Sign Up Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'forestgreen',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: 300,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
        color: 'white',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        width: 300,
        textAlign: 'center',
    },
});

export default SignUp;
