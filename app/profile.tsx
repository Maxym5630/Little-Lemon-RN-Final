import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import { colors, fonts } from '../components/theme';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const profile = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const navigation = useNavigation();

  const loadUserData = async () => {
    try {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const email = await AsyncStorage.getItem('email');
      if (firstName) setFirstName(firstName);
      if (lastName) setLastName(lastName);
      if (email) setEmail(email);
    } catch (error) {
      console.error('Error loading user data', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Header isShow={false} />
      <View style={styles.title}>
        <Text style={[styles.titleText]}>Personal information</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          readOnly={true}
          label="First Name"
          value={firstName}
        />
        <TextInput
          mode="outlined"
          readOnly={true}
          label="Last Name"
          value={lastName}
        />
        <TextInput
          mode="outlined"
          label="Email"
          readOnly={true}
          value={email}
        />
      </View>
      <Button
        mode="contained"
        dark={false}
        buttonColor={colors.primarySec}
        style={styles.button}
        onPress={async () => {
          try {
            await AsyncStorage.clear();
            navigation.replace('index'); // Navigate to the index screen after clearing data
          } catch (error) {
            Alert.alert('Error clearing user data');
          }
        }}
      >
        Log out
      </Button>
    </View>
  );
};

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

export default profile;
