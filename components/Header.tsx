import React from 'react';
import { Image, View, StyleSheet, Alert } from 'react-native';
import { colors } from './theme';
import { Link } from 'expo-router';

const Header = ({ isShow = true }) => {
  return (
    <View style={styles.header}>
      <View style={{ width: 50 }}></View>
      <Image
        source={require('../assets/images/Logo.png')}
        resizeMode="contain"
        style={styles.logo}
      ></Image>
      {isShow ? (
        <Link href="/profile">
          <Image
            source={require('../assets/images/Profile.png')}
            resizeMode="contain"
            style={styles.profile}
          ></Image>
        </Link>
      ) : (
        <View style={{ width: 50 }}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 96,
    width: '100%',
    backgroundColor: '#fff',
  },
  spacer: {
    width: 50,
    height: 50,
  },
  logo: { width: 179, height: 56 },
  profile: {
    width: 50,
    height: 50,
  },
});

export default Header;
