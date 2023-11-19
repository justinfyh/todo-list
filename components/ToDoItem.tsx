import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import { ToDoItem } from '../models';
export const ToDoItemComponent: React.FC<{
  todo: ToDoItem;
  deleteItem: Function;
}> = ({ todo: {id, value}, deleteItem }) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoTextContainer}>
        <Text
          style={styles.sectionTitle}>
          {value}
        </Text>
      </View>
      <Pressable style={styles.button} onPress={() => deleteItem(id)} >
        <Image source={require('../assets/images/check-mark.png')} style={styles.icon}/>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 3,
    height: 45,
  },
  todoTextContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#333333',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 12,
    marginLeft: 0,
    width: '85%',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  button: {
    width: '12%',    
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  icon: {
    width: '62%',
    height: '59%',
  }
});