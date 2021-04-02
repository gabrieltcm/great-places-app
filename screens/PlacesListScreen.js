import React, { useEffect } from "react";

import { FlatList, Platform } from "react-native";

//Redux
import { useSelector, useDispatch } from "react-redux";

//React Navigation Header Buttons
import { HeaderButtons, Item } from "react-navigation-header-buttons";
//Component
import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
//Redux Actions
import * as placesActions from "../store/places-actions";

const PlacesListScreen = (props) => {
  //Initiliaze the state (7)
  const places = useSelector((state) => state.placesReducer.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      //itemData is data from the "const places" which is linked to the Redux State
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri} //get the data from the useSelector (8) (following the models/place.js)
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            // the second param is to pass the title to the PlaceDetailScreen, we are passing title, and id
            // You can extract these data in the PlaceDetailScreen.js using navigationOptions
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title, //in PlaceDetailScreen.js, you can getParam("placeTitle") to this data from this component
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;
