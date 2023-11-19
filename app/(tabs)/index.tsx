import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
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
      const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getTodoItems(db);
      if (storedTodoItems.length) {
        setTodos(storedTodoItems);
      } else {
        await saveTodoItems(db, initTodos);
        setTodos(initTodos);
      }
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };
  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
        <Text style={styles.title}>To Do List</Text>  
        
      </View>
      <View style={{flex:1}} >
      {todos.map((todo) => (
            <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem} />
          ))}
      </View>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          placeholderTextColor={"gray"}
          placeholder="useless placeholder"
          keyboardType="default"
        />
        <Pressable style={styles.button} onPress={addTodo} >
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
    marginTop: 10,
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
