import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initDatabase,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '@/utils/database';
import { Alert, View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { MenuItem } from '@/types';
import { colors, fonts } from '@/utils/theme';
import { Divider, Searchbar } from 'react-native-paper';
import Filters from '@/components/Filters';

const home = () => {
  const [avatar, setAvatar] = useState('');
  const [data, setData] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<MenuItem[]>([]);
  const [filterSelections, setFilterSelections] = useState<boolean[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    (async () => {
      try {
        const avatar = await AsyncStorage.getItem('avatar');
        if (avatar) setAvatar(avatar);
      } catch (e) {}
    })();
  }, []);
  const sections = ['starters', 'mains', 'desserts'];
  const API_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const menu = (json.menu as MenuItem[]).map((item, index) => {
        return {
          id: index,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
          category: item.category,
        };
      });
      return menu;
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const filterData = async () => {
    let activeCategories = sections.filter(
      (_, index) => filterSelections[index]
    );
    if (activeCategories.length === 0) {
      activeCategories = sections;
    }
    const data = await filterByQueryAndCategories(
      debouncedQuery,
      activeCategories
    );
    setFilteredData(data);
  };

  useEffect(() => {
    void filterData();
  }, [debouncedQuery, filterSelections]);

  useEffect(() => {
    (async () => {
      try {
        await initDatabase();
        let menuItems = await getMenuItems();

        if (menuItems.length < 3) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        setFilteredData(menuItems);
      } catch (e) {
        Alert.alert(getErrorMessage(e));
      }
    })();
  }, []);

  const handleFiltersChange = async (index = 0) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  const images = {
    greekSalad: require('../assets/images/greekSalad.png'),
    bruschetta: require('../assets/images/bruschetta.png'),
    grilledFish: require('../assets/images/grilledFish.png'),
    pasta: require('../assets/images/pasta.png'),
    lemonDessert: require('../assets/images/lemonDessert.png'),
  };

  const renderItem = ({ item }: { item: MenuItem }) => {
    const imageSource = images[item.image.slice(0, -4) as keyof typeof images];

    return (
      <View style={{ paddingHorizontal: 25, paddingVertical: 10 }}>
        <Text style={fonts.cardTitle}>{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.heroTextContainer}>
            <Text
              style={fonts.paragraphText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>
            <Text style={[fonts.highlightText, { marginTop: 15 }]}>
              ${item.price}
            </Text>
          </View>
          <Image
            source={imageSource}
            resizeMode="cover"
            style={{ width: 80, height: 80, alignSelf: 'flex-end' }}
          />
        </View>
        <Divider style={{ marginVertical: 7 }} />
      </View>
    );
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery); // Обновляем значение с задержкой
    }, 500);

    return () => clearTimeout(timeout); // Очищаем таймер при новом вводе
  }, [searchQuery]);
  return (
    <>
      <Header avatar={avatar} />
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <View style={styles.heroContent}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroSubtitle}>Chicago</Text>
              <Text style={styles.heroText}>
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </Text>
            </View>
            <Image
              source={require('../assets/images/Hero image.png')}
              resizeMode="cover"
              style={styles.heroLogo}
            ></Image>
          </View>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View style={{ paddingHorizontal: 25, paddingVertical: 20 }}>
          <Text style={styles.title}>Order for Delivery!</Text>
        </View>
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        <Divider style={{ marginVertical: 10 }} />
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    width: '100%',
    height: 325,
    backgroundColor: colors.primaryMain,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  heroTitle: {
    ...fonts.displayTitle,
    color: colors.primarySec,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  heroSubtitle: {
    ...fonts.subtitle,
    color: colors.white,
  },
  heroText: {
    ...fonts.leadText,
    color: colors.white,
  },
  heroLogo: {
    width: 140,
    height: 150,
    borderRadius: 16,
    alignSelf: 'flex-end',
  },
  searchBar: { marginTop: 10, fontSize: 16 },
  title: {
    ...fonts.sectionTitle,
    color: colors.black,
  },
});

export default home;
