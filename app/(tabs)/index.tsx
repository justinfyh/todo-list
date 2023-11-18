import { StyleSheet, TextInput, Button, Pressable } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
        <Text style={styles.title}>To Do List</Text>  
      </View>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholderTextColor={"gray"}
          placeholder="useless placeholder"
          keyboardType="default"
        />
        <Pressable style={styles.button} >
          <Text style={styles.text}>Y</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    width: '80%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  
  button: {
    height: 40,
    width: '10%',
    marginTop: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
