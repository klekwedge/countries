import { Component } from "react";

class TravelBriefingService extends Component {
  getAllCountries = async () => {
    const res = await fetch("https://travelbriefing.org/countries.json");
    const data = await res.json();
    return data;
  };

  getCountry = async (countryName) => {
    const res = await fetch(
      `https://travelbriefing.org/${countryName}?format=json`
    );
    const data = await res.json();
    return data;
  };

  getAttractionCity = async () => {
    const res = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=37.61556&lat=55.75222&rate=3h&format=geojson&apikey=5ae2e3f221c38a28845f05b67c28484622acf311624c021c68a43175`
    );
    const data = await res.json();
    return data;
  };

  // getAttraction = async (id) => {
  //   const res = await fetch(
  //     `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=37.61556&lat=55.75222&rate=3h&format=geojson&apikey=5ae2e3f221c38a28845f05b67c28484622acf311624c021c68a43175`
  //   );
  //   const data = await res.json();
  //   return data;
  // };
}

export default TravelBriefingService;
