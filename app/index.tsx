import { colors, fonts } from '../components/theme';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

export default function Index() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userName = await AsyncStorage.getItem('firstName');
      if (userName) {
        navigation.replace('home');
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleRegister = async () => {
    if (firstName && lastName && isEmailValid(email)) {
      await AsyncStorage.multiSet([
        ['firstName', firstName],
        ['lastName', lastName],
        ['email', email],
      ]);
      navigation.replace('home');
    } else {
      Alert.alert('Invalid Input', 'Please fill in all fields correctly.');
    }
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/Logo.png')}
          resizeMode="contain"
          style={styles.logo}
        ></Image>
      </View>
      <View style={styles.hero}>
        <Text style={[styles.heroText]}>Let’s get to know you</Text>
      </View>
      <View style={styles.title}>
        <Text style={[styles.titleText]}>Personal information</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="First Name"
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          mode="outlined"
          label="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <Button
        mode="contained"
        disabled={!firstName || !lastName || !isEmailValid(email)}
        dark={false}
        buttonColor={colors.primarySec}
        style={styles.button}
        onPress={handleRegister}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: '100%',
    backgroundColor: colors.white,
  },
  logo: { width: 275, height: 59 },
  hero: {
    height: 150,
    width: '100%',
    backgroundColor: colors.primaryMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    color: colors.white,
    ...fonts.subtitle,
  },
  title: {
    height: 160,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  titleText: {
    color: colors.black,
    ...fonts.leadText,
  },
  button: {
    margin: 20,
    padding: 5,
    borderRadius: 10,
  },
  form: { flex: 1, gap: 20, paddingHorizontal: 20 },
});
