import * as SQLite from "expo-sqlite";

//This will connect to the database or create a new one if not found
//this code line will be executed everytinme we execute this file, when we import this file anywhere
const db = SQLite.openDatabase("places.db");

//initializing the database in a TABLE form, because sqlite works with tables that will hold your records,
//records are rows of data you add to your table
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    //tx is a transactionObject
    db.transaction((tx) => {
      //create a table if not exist, if not exist create a "places" table
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        //2nd argument holds an array of arguments
        [],
        //3rd argument, success function, executes if 1st argument succeeded
        () => {
          resolve();
        },
        //4th argument executes if it fails
        (_, err) => {
          //(_, err) 1st gets the query you executed (adding "_" means we dont care about it), 2nd argument is either err or results normally
          reject(err);
        }
      );
    });
  });
  return promise;
};

//Inserting data into the database
export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
        [title, imageUri, address, lat, lng], //passing the data in to the sql query above
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//this function is to provide the data to all the components, call this function to get the data from the database
export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places", //some sql stuff right here
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
