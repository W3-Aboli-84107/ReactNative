import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load saved credentials if Remember Me was checked
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        const savedPassword = await AsyncStorage.getItem('rememberedPassword');
        const rememberFlag = await AsyncStorage.getItem('rememberMe');

        if (rememberFlag === 'true') {
          setEmail(savedEmail || '');
          setPassword(savedPassword || '');
          setRememberMe(true);
        }
      } catch (err) {
        console.error('Error loading saved credentials', err);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser !== null) {
        const parsedUser = JSON.parse(storedUser);
        if (email === parsedUser.email && password === parsedUser.password)
           {
      
          if (rememberMe) {
            await AsyncStorage.setItem('rememberedEmail', email);
            await AsyncStorage.setItem('rememberedPassword', password);
            await AsyncStorage.setItem('rememberMe', 'true');
          } else {
            await AsyncStorage.removeItem('rememberedEmail');
            await AsyncStorage.removeItem('rememberedPassword');
            await AsyncStorage.setItem('rememberMe', 'false');
          }

          navigation.replace('Dashboard');
        } else {
          Alert.alert('Error', 'Invalid email or password.');
        }
      } else {
        Alert.alert('Error', 'No registered user found.');
      }
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Error', 'Login failed.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#C9D1D9"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />


      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#C9D1D9"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <Icon name={secureText ? 'eye-off' : 'eye'} size={20} color="#C9D1D9" />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberRow}>
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={styles.checkbox}
        >
          <Icon
            name={rememberMe ? 'checkbox' : 'square-outline'}
            size={20}
            color="#FFF"
          />
        </TouchableOpacity>
        <Text style={styles.rememberText}>Remember me</Text>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backArrow: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F46D5D',
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#C9D1D9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9D1D9',
    borderRadius: 8,
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    padding: 14,
    color: '#FFFFFF',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 6,
  },
  rememberText: {
    color: '#C9D1D9',
    marginRight: 'auto',
  },
  forgotButton: {
    marginLeft: 'auto',
  },
  forgot: {
    color: '#C9D1D9',
  },
  loginButton: {
    backgroundColor: '#F46D5D',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
