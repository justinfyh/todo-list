import { StyleSheet, TextInput, Button, Pressable } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <View style={styles.inputcontainer}>
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
    justifyContent: 'space-between',
  },
  inputcontainer: {
    flex: 1,
    flexDirection: 'row',
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
  },
  
  button: {
    height: 40,
    width: '10%',
    marginTop: 12,
    marginRight: 12,


    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 4,
    // elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    // lineHeight: 21,
    fontWeight: 'bold',
    // letterSpacing: 0.25,
    color: 'black',
  },
});
