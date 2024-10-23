import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  const selectedPlaceId = route.params.placeId;

  function showOnMapHandler() {
    console.log("fetchedPlace: ", fetchedPlace);
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  useEffect(() => {
    async function loadPlaceData() {
      let response = await fetchPlaceDetails(selectedPlaceId);
      console.log("response: ", response);
      setFetchedPlace(response);
      navigation.setOptions({
        title: response.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <>
        <View style={styles.fallback}>
          <Text>Loading place data...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <ScrollView>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationCenter}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          </View>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </ScrollView>
    </>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
