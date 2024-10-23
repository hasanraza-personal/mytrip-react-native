import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    const response = await insertPlace(place);
    // console.log("response: ", response);

    // navigation.navigate("AllPlaces", {
    //   place: place,
    // });

    navigation.navigate("AllPlaces");
  }

  return (
    <>
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </>
  );
}

export default AddPlace;
