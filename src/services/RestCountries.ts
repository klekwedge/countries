function RestCountries() {
  async function getAllCountries() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    return data;
  }

  async function getCountry(countryName: string) {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await res.json();
    return data;
  }

  return { getAllCountries, getCountry };
}

export default RestCountries;
