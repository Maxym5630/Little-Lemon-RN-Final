import React, {useEffect} from 'react';
import Header from '../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initDatabase, insertItem, getAllItems } from '@/components/database';

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

  useEffect(() => {
    const setup = async () => {
      await initDatabase();

      await insertItem({
        name: 'Greek Salad',
        price: 12.99,
        description: 'Salad with feta and olives.',
        image: 'greekSalad.jpg',
        category: 'Salads',
      });

      const items = await getAllItems();
      console.log(items);
    };

    void setup();
  }, []);




  return <Header avatar={avatar} />;
};

export default home;
