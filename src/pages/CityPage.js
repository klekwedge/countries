import { useEffect, useState } from "react";
import { Flex, List, ListItem, Heading } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import TravelBriefingService from "../services/TravelBriefingService";

const CityPage = () => {
  const { cityName } = useParams();
  const [attractions, setAttractions] = useState([]);
  // const [loading, setLoading] = useState(true);

  const travelBriefing = new TravelBriefingService();

  useEffect(() => {
    travelBriefing.getAttractionCity().then(onAttractionLoaded).catch(onError);
  }, [cityName]);

  const onAttractionLoaded = (attractions) => {
    setAttractions(attractions.features);
  };

  const onError = (error) => {
    console.log(error);
  };

  const content =
    attractions.length > 0 ? (
      <Flex
        maxWidth="1200px"
        flexDirection="column"
        gap="30px"
        p="20px 0px"
        fontSize="18px"
      >
        <List>
          {attractions.map((item, i) => (
            <ListItem key={i} display="flex" gap="10px">
              <Heading as="h2" fontWeight="400" fontSize="20px">
                {console.log()}
                <Link to={`${item.properties.xid}`}>{item.properties.name}</Link>
              </Heading>
              <Heading as="h2" fontWeight="400" fontSize="20px">
                {item.properties.rate}
              </Heading>
            </ListItem>
          ))}
        </List>
      </Flex>
    ) : null;

  return <>{content}</>;
};

export default CityPage;
