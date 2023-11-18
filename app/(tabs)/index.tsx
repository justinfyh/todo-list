import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholderTextColor={"gray"}
        placeholder="useless placeholder"
        keyboardType="default"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    color: '#ffffff',
    borderColor: 'white',
    height: 40,
    margin: 12,
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
});
