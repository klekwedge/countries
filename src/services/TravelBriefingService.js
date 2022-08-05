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

}

export default TravelBriefingService;
