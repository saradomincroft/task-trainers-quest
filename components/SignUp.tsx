import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
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
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            try {
                await sendEmailVerification(user);
                onSignUp();
            } catch (verificationError) {
                setError('Failed to send verification email. Please try again later.');
            }
        } catch (error: any) {
            const firebaseErrorCode = error.code;
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        setError('');
                    }}
                    secureTextEntry
                />
                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                ): null }
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
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
        width: 300,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
        color: 'white',
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
    },
});

export default SignUp;
