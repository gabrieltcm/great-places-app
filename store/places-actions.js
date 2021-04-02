import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACE";

//Environment variable
import ENV from "../env";

//Database
import { insertPlace, fetchPlaces } from "../database/db";

//Gets title and image uri date from NewPlaceScreen.js dispatch function in savePlaceHandler function (5 >> to places-reducer)
export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }

    const address = resData.results[0].formatted_address;
    //so what split and pop does is for eg, our folder name is someFolder/myimage.jpg by split returns ["someFolder", "myimage.jpg"] by pop returns myimage.jpg
    //The pop() method removes the last element of an array, and returns that element.
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log(dbResult);
      /* WebSQLResultSet {
        "insertId": 2,
        "rows": WebSQLRows {
          "_array": Array [],
          "length": 0,
        },
        "rowsAffected": 1,
      } */
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw "Ops!! Haiyaa!";
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      /*
      dbResult {
  "insertId": undefined,
  "rows": WebSQLRows {
    "_array": Array [
      Object {
        "address": "Dummy address",
        "id": 1,
        "imageUri": "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540gabrieltcm96%252Fgreat-places-app/ce233e39-ae90-4e82-b540-27306dc67388.jpg",
        "lat": 15.6,
        "lng": 12.3,
        "title": "My Kitchen",
      },
      Object {
        "address": "Dummy address",
        "id": 2,
        "imageUri": "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540gabrieltcm96%252Fgreat-places-app/8e24f4c1-e942-48c8-8cc1-419b361bed8f.jpg",
        "lat": 15.6,
        "lng": 12.3,
        "title": "My Living Room",
      },
    ],
    "length": 2,
  },
  "rowsAffected": 0,
}
      */
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
