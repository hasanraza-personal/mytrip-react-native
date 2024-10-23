import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

let database = null;

async function connectToDBHandler() {
  database = await SQLite.openDatabaseAsync("places.db");
}

export async function init() {
  await connectToDBHandler();
  const response = await database.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`
  );

  // const promise = new Promise((resolve, reject) => {
  //   database.transaction((tx) => {
  //     tx.executeSql(
  //       `CREATE TABLE IF NOT EXISTS places (
  //         id INTEGER PRIMARY KEY NOT NULL,
  //         title TEXT NOT NULL,
  //         imageUri TEXT NOT NULL,
  //         address TEXT NOT NULL,
  //         lat REAL NOT NULL,
  //         lng REAL NOT NULL
  //       )`,
  //       [],
  //       () => {
  //         resolve();
  //       },
  //       (_, error) => {
  //         reject(error);
  //       }
  //     );
  //   });
  // });

  return response;
}

export async function insertPlace(place) {
  try {
    const response = await database.runAsync(
      "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)",
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function fetchPlaces() {
  try {
    const response = await database.getAllAsync("SELECT * FROM places");
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function fetchPlaceDetails(id) {
  try {
    const statement = await database.prepareAsync(
      "SELECT * FROM places WHERE id = $value"
    );
    const executedStatement = await statement.executeAsync({
      $value: id,
    });
    const response = await executedStatement.getFirstAsync();
    const place = new Place(
      response.title,
      response.imageUri,
      {
        lat: response.lat,
        lng: response.lng,
        address: response.address,
      },
      response.id
    );
    // console.log("response: ", response);
    return place;
  } catch (error) {
    console.log("error: ", error);
  }
}
