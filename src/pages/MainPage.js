import { useEffect, useState } from "react";
import TravelBriefingService from "../services/TravelBriefingService";
import { Flex, List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [countries, setCountries] = useState([]);
  const travelBriefingService = new TravelBriefingService();

  useEffect(() => {
    travelBriefingService.getAllCountries().then(onDataLoaded).catch(onError);
  }, []);

  const onDataLoaded = (countryList) => {
    setCountries(countryList);
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Flex flexDirection="column">
      <List>
        {countries.map((item, i) => (
          <ListItem key={i}>
            <Link to={`/${item.name}`}>{item.name}</Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default MainPage;
