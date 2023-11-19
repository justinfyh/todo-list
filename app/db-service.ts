import * as SQLite from 'expo-sqlite';
import { ToDoItem } from '../models';

const tableName = 'todoData';

// establish and open database
export const getDBConnection = async () => {
    const db = SQLite.openDatabase('todo-data.db');
    return db;
};

// create a new table if doesnt exist
export const createTable = async (db: SQLite.SQLiteDatabase) => {
    await db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                value TEXT NOT NULL
            );`
        );
    });
};
  
// get all the items on the todo list from db
export const getTodoItems = async (db: SQLite.SQLiteDatabase): Promise<ToDoItem[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT rowid as id, value FROM ${tableName}`,
                [],
                (_, results) => {
                const todoItems: ToDoItem[] = [];
                for (let index = 0; index < results.rows.length; index++) {
                    todoItems.push(results.rows.item(index));
                }
                resolve(todoItems);
                },
            //   (_, error) => {
            //     console.error('Error getting todoItems:', error);
            //     reject(new Error('Failed to get todoItems !!!'));
            //   }
            );
        });
    });
};

// save the todo item into the db
export const saveTodoItems = async (db: SQLite.SQLiteDatabase, todoItems: ToDoItem[]) => {
return new Promise<void>((resolve, reject) => {
        db.transaction(tx => {
            const insertQuery =
                `INSERT OR REPLACE INTO ${tableName}(id, value) VALUES ` +
                todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

            tx.executeSql(
                insertQuery,
                [],
                (_, results) => {
                resolve();
                },
            //   (_, error) => {
            //     reject(error);
            //   }
            );
        });
    });
};

// delete item from list
export const deleteTodoItem = async (db: SQLite.SQLiteDatabase, id: number) => {
    await db.transaction(tx => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    });
};

// delete the whole table
export const deleteTable = async (db: SQLite.SQLiteDatabase) => {
    await db.transaction(tx => {
        tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
    });
};