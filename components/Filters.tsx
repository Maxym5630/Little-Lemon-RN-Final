import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { FiltersProps } from '@/types';
import { colors, fonts } from '@/utils/theme';

const Filters = ({ onChange, selections, sections }: FiltersProps) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={
            selections[index] ? styles.filterButtonActive : styles.filterButton
          }
          key={index}
        >
          <Text
            style={
              selections[index] ? styles.buttonTextActive : styles.buttonText
            }
          >
            {section}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
    padding: 10,
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  buttonText: {
    ...fonts.sectionCategories,
    textAlign: 'center',
    color: colors.primaryMain,
    fontSize: 16,
  },
  filterButtonActive: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.primarySec,
    borderRadius: 20,
  },
  buttonTextActive: {
    ...fonts.sectionCategories,
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
  },
});

export default Filters;
