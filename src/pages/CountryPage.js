import { useEffect, useState } from "react";
import {
  Text,
  Image,
  Skeleton,
  Flex,
  List,
  ListItem,
  Heading,
  Box,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { GiPhone, GiPoliceBadge, GiAmbulance, GiFire } from "react-icons/gi";
import TravelBriefingService from "../services/TravelBriefingService";
import CounrtySection from "../CounrtySection/CounrtySection";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

const CountryPage = () => {
  const { countryName } = useParams();
  const [country, setCounrty] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

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
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartData = (arr, labels, labelOption, parametr) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          display: false,
        },
        title: {
          display: true,
          text: labelOption,
          font: {
            size: "20px",
          },
        },
      },
    };

    const data = {
      labels: labels,
      datasets: [
        {
          data: arr.map((month) => month[`${parametr}Avg`]),
          borderColor: "#FFB1C1",
          backgroundColor: "red",
          pointRadius: 5,
        },
        {
          data: arr.map((month) => month[`${parametr}Max`]),
          borderColor: "#4BC0C0",
          backgroundColor: "green",
          pointRadius: 5,
        },
        {
          data: arr.map((month) => month[`${parametr}Min`]),
          borderColor: "#9AD0F5",
          backgroundColor: "blue",
          pointRadius: 5,
        },
      ],
    };

    return { data, options };
  };

  useEffect(() => {
    travelBriefing.getCountry(countryName).then(onCityLoaded).catch(onError);
  }, [countryName]);

  const onCityLoaded = (country) => {
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

  // 5ae2e3f221c38a28845f05b67c28484622acf311624c021c68a43175

  const content = country ? (
    <Flex
      maxWidth="1200px"
      flexDirection="column"
      gap="30px"
      p="20px 0px"
      fontSize="18px"
    >
      <Box position="absolute" top="20px" left="20px">
        <Link to="/">
          <BsFillArrowLeftCircleFill size="35px" />
        </Link>
      </Box>

      <Flex gap="40px">
        {loading && <Skeleton width="300px" height="220px" />}

        <Image
          maxWidth="300px"
          maxHeight="220px"
          src={`https://countryflagsapi.com/png/${countryName}`}
          alt={`${countryName} flag`}
          onLoad={handleOnLoad}
        />

        <Flex flexDirection="column" gap="5px">
          <Heading as="h1" fontSize="24px" mb="10px">
            {country.names.name}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="22px">
            Fullname: {country.names.full}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px">
            Continent: {country.names.continent}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px">
            Iso2 code: {country.names.iso2}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px">
            Iso3 code: {country.names.iso3}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px">
            Latitude: {Number(country.maps.lat).toFixed(2)}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px">
            Longitude: {Number(country.maps.long).toFixed(2)}
          </Heading>
        </Flex>
      </Flex>

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

      <Link to={`/${country.names.name}/Moscow`}>Test link</Link>

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
                {`${item.language} (${
                  item.official === "Yes" ? "official" : "not official"
                })`}
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
          <Flex
            // maxWidth="900px"
            flexDirection="column"
            p="20px"
            gap="100px"
          >
            <Line
              {...chartData(
                Object.values(country.weather),
                Object.keys(country.weather),
                `Average temperature (°C) in ${country.names.name} per month`,
                "t"
              )}
            />
            <Line
              {...chartData(
                Object.values(country.weather),
                Object.keys(country.weather),
                `Average precipitation (mm) in ${country.names.name} per month`,
                "p"
              )}
            />
          </Flex>
        }
      />
    </Flex>
  ) : null;

  return <>{content}</>;
};

export default CountryPage;
