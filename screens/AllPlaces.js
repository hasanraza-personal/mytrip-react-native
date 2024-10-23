import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const response = await fetchPlaces();
      // console.log("response: ", response);
      setLoadedPlaces(response);
    }
    if (isFocused) {
      setTimeout(() => {
        loadPlaces();
      }, 1000);
      // setLoadedPlaces((prevData) => [...prevData, route.params.place]);
    }
  }, [isFocused]);

  return (
    <>
      <PlacesList places={loadedPlaces} />
    </>
  );
}

export default AllPlaces;
