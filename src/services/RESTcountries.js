const formatJSON = (
  APIresponse,
  allNonModifiedCountries,
  allCountries = true
) => {
  return (
    APIresponse &&
    APIresponse.map(c => ({
      flag: c.flag,
      alpha3Code: c.alpha3Code ? c.alpha3Code : "",
      nativeName: c.nativeName ? c.nativeName : "",
      capital: c.capital ? c.nativeName : "",
      population: c.population ? c.population : 0,
      languages: c.languages ? c.languages.map(l => l.name) : [],
      timezones: c.timezones ? c.timezones : [],
      currenciesNames: c.currencies.length ? c.currencies.map(c => c.name) : [],
      nameOfBorderCountries: allCountries
        ? c.borders
          ? c.borders.map(code => {
              const country = APIresponse.find(
                country => country.cioc === code || country.alpha3Code === code
              );
              return country.name ? country.name : code;
            })
          : []
        : !allCountries
        ? c.borders.map(code => {
            const country = allNonModifiedCountries.find(
              country => country.cioc === code || country.alpha3Code === code
            );
            return country ? country.name : code;
          })
        : {}
    }))
  );
};

const fetchAPI = searchInput => {
  let url = searchInput
    ? `https://restcountries.eu/rest/v2/name/${searchInput}`
    : "https://restcountries.eu/rest/v2/all";
  return fetch(url).then(results => {
    return results.json();
  });
};

module.exports = {
  formatJSON,
  fetchAPI
};
