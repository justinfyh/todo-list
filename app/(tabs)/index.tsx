import { StyleSheet, TextInput, Button, Pressable, ScrollView, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { Text } from '../../components/Themed';
import { ToDoItem } from '../../models';
import { ToDoItemComponent } from '../../components/ToDoItem';
import { getDBConnection, getTodoItems, saveTodoItems, createTable,  deleteTodoItem } from '../db-service';

export default function TabOneScreen() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // async functions for getting, adding and deleting
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
  
  // render page
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
        {todos.length === 0 ? (
            <Text style={styles.nothingtext}>nothing to do...</Text>
          ) : (
            todos.map((todo) => (
              <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem} />
            ))
          )}
        </View> 
      </ScrollView>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          placeholderTextColor={"gray"}
          placeholder="what to do..."
          keyboardType="default"
          onSubmitEditing={addTodo}
        />
        <Pressable style={styles.button} onPress={addTodo} >
          <Text style={styles.addtext}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
  inputcontainer: {
    flexDirection: 'row', 
    borderRadius: 4, 
    backgroundColor: 'transparent', 
    bottom: 12, 
    position: 'absolute', 
    left: 12,
  },

  input: {
    color: '#ffffff',
    borderColor: 'white',
    backgroundColor: 'black',
    height: 45,
    marginRight: 10,
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
    borderWidth: 1.5,
    borderColor: 'gray',
    marginRight: 1,
  },
  addtext: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  
  nothingtext: {
    marginTop: 20,
    fontSize: 16,
  }
});
