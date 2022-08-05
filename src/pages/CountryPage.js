import { useEffect, useState } from "react";
import { Flex, List, ListItem, Heading, Box } from "@chakra-ui/react";
import TravelBriefingService from "../services/TravelBriefingService";
import { useParams } from "react-router-dom";
import CounrtySection from "../CounrtySection/CounrtySection";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GiPhone, GiPoliceBadge, GiAmbulance, GiFire } from "react-icons/gi";

const CountryPage = () => {
  const { countryName } = useParams();
  const [country, setCounrty] = useState(null);

  const telephoneIcons = [
    <GiPhone size="30px" />,
    <GiPoliceBadge size="30px" />,
    <GiAmbulance size="30px" />,
    <GiFire size="30px" />,
  ];
  const telephoneTitle = [
    "Country code:",
    "Police:",
    "Ambulance:",
    "Fire Department:",
  ];

  const electricityTitle = ["Voltage:", "Frequency:", "Plugs:"];

  const travelBriefing = new TravelBriefingService();

  useEffect(() => {
    travelBriefing.getCountry(countryName).then(onCityLoaded).catch(onError);
  }, [countryName]);

  const onCityLoaded = (country) => {
    console.log(country);
    setCounrty(country);
  };

  const onError = (error) => {
    console.log(error);
  };

  const checkWater = () => {
    switch (country.water.short) {
      case "not safe":
        return "red";
      case "safe":
        return "green";
      case "not recommended":
        return "orange";
      default:
        return "blue";
    }
  };

  const content = country ? (
    <Flex flexDirection="column" gap="30px" p="20px 0px" fontSize="18px">
      <Flex flexDirection="column" gap="3px">
        <Heading as="h1" fontSize="24px">
          {country.names.name}
        </Heading>
        <Heading as="h2" fontWeight="400" fontSize="22px">
          {country.names.full}
        </Heading>
        <Heading as="h2" fontWeight="400" fontSize="20px">
          {country.names.continent}
        </Heading>
        <Heading as="h2" fontWeight="400" fontSize="20px">
          {country.names.iso2}
        </Heading>
        <Heading as="h2" fontWeight="400" fontSize="20px">
          {country.names.iso3}
        </Heading>

        <List display="flex" gap="10px" alignItems="center" fontSize="20px">
          <Heading as="h2" fontSize="inherit" fontWeight="400">
            Other countries in the neighborhood of {country.names.name}:
          </Heading>
          {country.neighbors.map((item, i) => (
            <Link key={i} to={`/${item.name}`}>
              {item.name},
            </Link>
          ))}
        </List>
        <Heading as="h2" fontWeight="400" fontSize="20px">
          Latitude: {country.maps.lat}
        </Heading>
        <Heading as="h2" fontWeight="400" fontSize="20px">
          Longitude: {country.maps.long}
        </Heading>
      </Flex>

      <CounrtySection
        title={"Drinking water"}
        content={
          <Text p="15px 20px 15px 20px">
            Drinking tap water in {country.names.name} is{" "}
            <span style={{ color: checkWater() }}>
              {country.water.short ? country.water.short : "uknnown"}
            </span>
          </Text>
        }
      />

      {country.vaccinations.length > 0 ? (
        <CounrtySection
          title={"Vaccinations"}
          content={
            <List
              display="flex"
              flexDirection="column"
              gap="10px"
              p="15px 20px 15px 20px"
            >
              {country.vaccinations.map((item, i) => (
                <ListItem key={i}>
                  <Heading as="h3" fontSize="20px" fontWeight="600">
                    {item.name}
                  </Heading>
                  <Text as="h3">{item.message}</Text>
                </ListItem>
              ))}
            </List>
          }
        />
      ) : null}

      <CounrtySection
        title={"Language"}
        content={
          <Box p="15px 20px 15px 20px">
            The language spoken in {country.names.name} is{" "}
            {country.language.map((item, i) => (
              <span key={i}>
                {item.language}
                {country.language.length > 1 &&
                i !== country.language.length - 1
                  ? ", "
                  : null}
              </span>
            ))}
          </Box>
        }
      />

      <CounrtySection
        title={"Telephone"}
        content={
          <List display="flex" gap="10px" p="15px 20px 15px 20px">
            {Object.entries(country.telephone).map((item, i) => (
              <ListItem
                borderRadius="10px"
                key={i}
                flex="1 1 100%"
                display="flex"
                alignItems="center"
                gap="10px"
                background="black"
                color="white"
                p="10px 10px"
              >
                {telephoneIcons[i]}
                {telephoneTitle[i]}
                <Heading as="h3" fontSize="20px" fontWeight="400">
                  {i === 0 ? `+${item[1]}` : item[1]}
                </Heading>
              </ListItem>
            ))}
          </List>
        }
      />

      <CounrtySection
        title={"Electricity"}
        content={
          <List display="flex" gap="10px" p="15px 20px 15px 20px">
            {Object.entries(country.electricity).map((item, i) => (
              <ListItem
                borderRadius="10px"
                key={i}
                flex="1 1 100%"
                display="flex"
                alignItems="center"
                gap="10px"
                background="black"
                color="white"
                p="10px 10px"
              >
                {console.log(item)}
                {electricityTitle[i]}
                <Heading as="h3" fontSize="20px" fontWeight="400">
                  {i === 0 ? `${item[1]} Volt` : null}
                  {i === 1 ? `${item[1]} Herz` : null}
                  {i === 2 ? item[1].join(", ") : null}
                </Heading>
              </ListItem>
            ))}
          </List>
        }
      />
    </Flex>
  ) : null;

  return <>{content}</>;
};

export default CountryPage;
