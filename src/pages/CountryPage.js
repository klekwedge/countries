import { useEffect, useState } from "react";
import { Text, Flex, List, ListItem, Heading, Box } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { GiPhone, GiPoliceBadge, GiAmbulance, GiFire } from "react-icons/gi";
import TravelBriefingService from "../services/TravelBriefingService";
import CounrtySection from "../CounrtySection/CounrtySection";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "T",
      },
    },
  };

  const chartData = (arr, labels, option) => {
    const data = {
      labels: labels,
      datasets: [
        {
          data: arr.map((month) => month[option]),
          borderColor: "black",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    // console.log(arr);
    // console.log(data);
    return data;
  };

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
        title={"Currency"}
        content={
          <Box p="15px 20px 15px 20px">
            <Heading as="h3" fontWeight="400" fontSize="inherit">
              The currency in {country.names.name} is {country.currency.name}
            </Heading>
            <Heading as="h3" fontWeight="400" fontSize="inherit">
              Rate: {Number(country.currency.rate).toFixed(2)} $
            </Heading>
            <Heading as="h3" fontWeight="400" fontSize="inherit">
              Code: {country.currency.code}
            </Heading>
          </Box>
        }
      />

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

      <CounrtySection
        title={"Weather"}
        content={
          <List
            // maxWidth="700px"
            // alignItems="center"
            display="flex"
            flexDirection="column"
            p="20px"
            gap="100px"
          >
            {console.log(Object.keys(Object.values(country.weather)[0]))}
            {/* {chartData(Object.values(country.weather))} */}
            {Object.keys(Object.values(country.weather)[0]).map((item, i) => (
              <Bar
                key={i}
                options={options}
                data={chartData(
                  Object.values(country.weather),
                  Object.keys(country.weather),
                  item
                )}
              />
            ))}
          </List>
        }
      />
    </Flex>
  ) : null;

  return <>{content}</>;
};

export default CountryPage;
