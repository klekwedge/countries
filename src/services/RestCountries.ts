function RestCountries() {
  async function getAllCountries() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    return data;
  }

  async function getCountriesByName(countryName: string) {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await res.json();
    return data;
  }

  async function getCountriesByRegion(regionName: string) {
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${regionName}`
    );
    const data = await res.json();
    return data;
  }

  return { getAllCountries, getCountriesByName, getCountriesByRegion };
}

export default RestCountries;
