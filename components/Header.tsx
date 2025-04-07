import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import {IconButton} from "react-native-paper";
import {Link, useNavigation} from "expo-router";

const Header = ({ isShow = false, avatar = ''}) => {

  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {isShow ? (
              <Link
                  href="/home">
                <IconButton
                    style={{width: 50, height: 50}}
                    icon={'keyboard-backspace'}
                    onPress={() => {
                      navigation.replace('home');
                    }}
                />
              </Link>
          ) :
          (<View style={styles.spacer}></View>)}
      <Image
        source={require('../assets/images/Logo.png')}
        resizeMode="contain"
        style={styles.logo}
      ></Image>
      <Avatar avatar = {avatar} />
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
