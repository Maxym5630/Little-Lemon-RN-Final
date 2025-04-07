import React from 'react';
import {Link} from "expo-router";
import {Image, Text, View, StyleSheet } from "react-native";

const Avatar = ({ big=false, avatar = ''}) => {
    const style = big ? styles.profileBig : styles.profile;
    const styleText = big ? styles.textBig : styles.text;
    return avatar.length > 2 ? (
        <Link href="/profile">
            <Image
                source={require('../assets/images/Profile.png')}
                resizeMode="contain"
                style={style}
            ></Image>
        </Link>) : (
        <Link href="/profile">
            <View style={style}>
                <Text style={styleText}>
                    {avatar.toUpperCase()}
                </Text>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    profile: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#62d6c4',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        fontSize: 20,
        fontFamily: 'MarkaziText',
        color: '#fff',
    },
    textBig: {
        fontSize: 40,
        fontFamily: 'MarkaziText',
        color: '#fff',
    },
    profileBig: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#62d6c4',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
});

export default Avatar;
