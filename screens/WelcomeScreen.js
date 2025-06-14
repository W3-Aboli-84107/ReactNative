import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to MeetIn</Text>
      <Text style={styles.subtitle}>
        One stop digital solution to{'\n'}manage visitors
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Navigate to Login screen
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Don’t have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#C9D1D9',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#F46D5D',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#8B949E',
  },
  loginLink: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
