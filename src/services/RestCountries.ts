function RestCountries() {
  async function getAllCountries() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    return data;
  }

  return { getAllCountries };
}

export default RestCountries;
