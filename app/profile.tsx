import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert, ScrollView} from 'react-native';
import Header from '../components/Header';
import { colors, fonts } from '@/components/theme';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import {MaskedTextInput} from "react-native-mask-text";
import {isEmailValid} from "@/app/index";
import Avatar from "@/components/Avatar";

const profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferences, setPreferences] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });
  const [avatar, setAvatar] = useState('');
  const navigation = useNavigation();

  const loadUserData = async () => {
    try {
        const {firstName, lastName, email, phone, preferences, avatar} = Object.fromEntries(await AsyncStorage.multiGet([
            'firstName',
            'lastName',
            'email',
            'phone',
            'preferences',
            'avatar'
        ]));
      if (preferences){
        const parsedPref = JSON.parse(preferences);
        setPreferences(parsedPref);
      }
      if (firstName) setFirstName(firstName);
      if (lastName) setLastName(lastName);
      if (email) setEmail(email);
      if (phone) setPhone(phone)
      else setPhone('');
      if (avatar) setAvatar(avatar);
    } catch (error) {
      console.error('Error loading user data', error);
    }
  };

  const saveUserData = async () => {
      if (!firstName || !lastName || !isEmailValid(email) || (phone && phone.length != 14)) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
      }
      try {
        await AsyncStorage.multiSet([
            ['preferences', JSON.stringify(preferences)],
            ['firstName', firstName],
            ['lastName', lastName],
            ['email', email],
            ['phone', phone],
            ['avatar', avatar],
          ]);
        Alert.alert('Success', 'User data saved successfully');
      } catch (error) {
        console.error('Error saving user data', error);
      }
    };

  useEffect(() => {
    void loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Header isShow={true} avatar = {avatar} />
      <ScrollView>
      <View style={styles.title}>
        <Text style={[styles.titleText]}>Personal information</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar
        big={true}
        avatar = {avatar}
        />
        <Button onPress={()=>{setAvatar('../assets/images/Profile.png')}} mode={"contained"}> Change </Button>
        <Button onPress={()=>{setAvatar((firstName[0] + lastName[0]))}} mode={"outlined"}> Remove </Button>
      </View>

      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="First Name"
          placeholder={'John'}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          mode="outlined"
          label="Last Name"
          placeholder={'Doe'}
          value={lastName}
            onChangeText={setLastName}
        />
        <TextInput
          mode="outlined"
          label="Email"
          placeholder={'john_doe@example.com'}
          value={email}
          keyboardType={'email-address'}
          onChangeText={setEmail}
        />
        <TextInput
            mode="outlined"
            label="Phone Number"
            placeholder={'(217) 555-1212'}
            value={phone}
            render={props => (
                <MaskedTextInput
                    {...props}
                    mask="(999) 999-9999"
                    keyboardType="phone-pad"
                    onChangeText={(text, _raw) => setPhone(text)}
                />
            )}
        />
        {/*<TextInput
            mode="outlined"
            label="Phone"
            placeholder="(217) 555-1212"
            value={phone}
            keyboardType={'phone-pad'}
            onChangeText={setPhone}
        />*/}
      </View>
      <View style={styles.title}>
        <Text style={[styles.titleText]}>Personal information</Text>
      </View>
      <Checkbox.Item label={"Order statuses"} status={preferences.orderStatuses? 'checked': 'unchecked'} onPress={() => { setPreferences(prevState => {
        return {
          ...prevState,
          orderStatuses: !prevState.orderStatuses
        }
      }) }} />
      <Checkbox.Item label={"Password changes"} status={preferences.passwordChanges? 'checked': 'unchecked'} onPress={() => {
        setPreferences(prevState => {
          return {
            ...prevState,
            passwordChanges: !prevState.passwordChanges
          }
        })
      }} />
      <Checkbox.Item label={"Special offers"} status={preferences.specialOffers ? 'checked': 'unchecked'} onPress={() => {
        setPreferences(prevState => {
          return {
            ...prevState,
            specialOffers: !prevState.specialOffers
          }
        })
      }} />
      <Checkbox.Item label={"Newsletter"} status={preferences.newsletter? 'checked': 'unchecked'} onPress={() => {
        setPreferences(prevState => {
          return {
            ...prevState,
            newsletter: !prevState.newsletter
          }
        })
      }} />
      </ScrollView>
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
      <View style={styles.containerFooter}>
        <Button
        mode="outlined"
        onPress={loadUserData}
        >Discard changes</Button>

        <Button
        mode="contained"
        onPress={saveUserData}
        >Save changes</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: '100%',
    backgroundColor: colors.white,
  },
  logo: { width: 275, height: 59 },
  title: {
    width: '100%',
    justifyContent: 'center',
    padding: 20
  },
  titleText: {
    color: colors.black,
    ...fonts.sectionCategories,
  },
    avatarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row',
    },
  button: {
    margin: 20,
    padding: 5,
    borderRadius: 10,
  },
  form: { flex: 1, gap: 20, paddingHorizontal: 20 },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  }
});

export default profile;
