import { useEffect, useState } from "react";
import { Flex, List, ListItem, Heading } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import TravelBriefingService from "../services/TravelBriefingService";

const AttractionPage = () => {
  const { attractionName } = useParams();
  const [attractions, setAttractions] = useState([]);
  // const [loading, setLoading] = useState(true);

  const travelBriefing = new TravelBriefingService();

  useEffect(() => {
    console.log(attractionName);
    // travelBriefing.getAttractionCity().then(onAttractionLoaded).catch(onError);
  }, [attractionName]);

  // const onAttractionLoaded = (attractions) => {
  //   setAttractions(attractions.features);
  // };

  // const onError = (error) => {
  //   console.log(error);
  // };

  const content =
    attractions.length > 0 ? (
      <Flex
        maxWidth="1200px"
        flexDirection="column"
        gap="30px"
        p="20px 0px"
        fontSize="18px"
      >
        {/* {console.log(attractions)} */}
      </Flex>
    ) : null;

  return <>{"!!!!!!!!"}</>;
};

export default AttractionPage;
