import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function PointScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>
        Архив
      </Text>
    </ScrollView>
  );
}

ArchiveScreen.navigationOptions = {
  title: 'Архив',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
