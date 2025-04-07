import React, {useEffect} from 'react';
import Header from '../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";

const home = () => {

  const [avatar, setAvatar] = React.useState('');

  useEffect(() => {
    ( async ()=> {
      try {
        const avatar = await AsyncStorage.getItem('avatar');
        if (avatar) setAvatar(avatar);
      } catch(e) {}
    })()
  }, []);




  return <Header avatar={avatar} />;
};

export default home;
