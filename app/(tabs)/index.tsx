import { StyleSheet, TextInput, Button, Pressable, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { Text, View } from '../../components/Themed';
import { ToDoItem } from '../../models';
import { ToDoItemComponent } from '../../components/ToDoItem';
import { getDBConnection, getTodoItems, saveTodoItems, createTable,  deleteTodoItem } from '../db-service';

export default function TabOneScreen() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getTodoItems(db);

      setTodos(storedTodoItems);

    } catch (error) {
      console.error(error + "df");
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const newTodos = [...todos, {
        id: todos.length ? todos.reduce((acc, cur) => {
          if (cur.id > acc.id) return cur;
          return acc;
        }).id + 1 : 0, value: newTodo
      }];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoItems(db, newTodos);
      setNewTodo('');
    } catch (error) {
      console.error(error + "g2");
    }
  };
  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
  
      // Create a new array without the deleted item
      const updatedTodos = todos.filter(todo => todo.id !== id);
  
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error + "g3");
    }
  };
  
  return (
    <View style={styles.container}>

      <View style={{flex:1, alignItems: 'center'}}>
        {/* <Text style={styles.title}>To Do List</Text>  */}
        <ScrollView>
        <View style={{}} >
          {todos.map((todo) => (
              <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem} />
            ))}
        </View> 
        </ScrollView>
        
      </View>

      <View style={{flexDirection: 'row', borderRadius: 4, backgroundColor: 'transparent', marginTop: 8,}}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          placeholderTextColor={"gray"}
          placeholder="useless placeholder"
          keyboardType="default"
        />
        <Pressable style={styles.button} onPress={addTodo} >
          <Text style={styles.text}>+</Text>
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
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  input: {
    color: '#ffffff',
    borderColor: 'white',
    backgroundColor: 'black',
    height: 45,
    marginRight: 12,
    width: '85%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  
  button: {
    height: 45,
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 1,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
});
