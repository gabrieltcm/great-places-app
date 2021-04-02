//Redux Actions
import { ADD_PLACE, SET_PLACES } from "./places-actions";
//Models
import Place from "../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image, //gets instructions and data from actions (6)
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      ); //(id,title,imageUri)
      return {
        //Takes the old array, adds a new item, and returns a brand new array with "newPlace"
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
