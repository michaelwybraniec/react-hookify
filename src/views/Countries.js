import React, { useEffect, useState } from "react";
import SingleSearchBar from "./components/forms/SingleSearchBar.js";
import CountriesList from "./components/countriesList/CountriesList.js";
import CountryDetails from "./components/countryDetails/CountryDetails.js";
import { formatJSON, fetchAPI } from "../services/RESTcountries.js";
import { Row, Col, Alert } from "react-bootstrap";

const Countries = ({ isMobileSized }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [singleSearch, setSingleSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [allNonModifiedCountries, setAllNonModifiedCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const APIGetAll = (allCountries = true) => {
    setIsLoading(true);
    fetchAPI(searchInput).then(response => {
      if (allCountries) {
        setAllNonModifiedCountries(response);
        response = formatJSON(response, allNonModifiedCountries);
        setCountries(response);
        setSingleSearch(false);
        setIsLoading(false);
        setError(null);
        setCountry([]);
        setSelectedCountry(
          response.find(c => c.nativeName === "Polska") || null
        );
      } else {
        if (!response.status || response.status !== 404) {
          response = formatJSON(response, allNonModifiedCountries, false);
          setCountry(response);
          setSingleSearch(true);
          setIsLoading(false);
          setError(null);
          setSelectedCountry(
            !isMobileSized ? (response.length === 1 ? response[0] : []) : []
          );
        } else if (response.status && response.status === 404) {
          setError({
            status: response.status,
            message: response.message,
            messageCustom:
              "Ops! Nothing found, but did you try to search on Mars ?"
          });
          setCountry([]);
          setSingleSearch(true);
          setIsLoading(false);
          setSelectedCountry([]);
        } else {
          console.error("APIGetAll error: response:", response);
        }
      }
    });
  };

  // Load all countries on init
  // Below due to the error: Cannot compile namespaces when the '--isolatedModules' flag is provided.  TS1208
  // eslint-disable-next-line
  useEffect(() => APIGetAll(), []);

  // Search countries on input change
  // Below due to the error: Cannot compile namespaces when the '--isolatedModules' flag is provided.  TS1208
  // eslint-disable-next-line
  useEffect(() => APIGetAll(false), [searchInput]);

  const getSearchInputData = singleSearchBarData => {
    setSearchInput(singleSearchBarData);
  };

  const selectedCountryCallback = country => setSelectedCountry(country);
  const data = !singleSearch ? countries : country;
  let scrollStyle = isMobileSized ? {} : { height: 1000, overflowY: "scroll" };

  return (
    <React.Fragment>
      <Row>
        <Col className="pt-4">
          <SingleSearchBar
            countriesCallback={getSearchInputData}
            isLoading={isLoading}
          />
          {error ? (
            <Alert className="mt-2" variant="warning">
              {error.messageCustom}
            </Alert>
          ) : (
            !isLoading && (
              <Row className="mt-2">
                <Col md="6" style={scrollStyle}>
                  <CountriesList
                    key={data.alpha3Code}
                    countries={data}
                    isMobileSized={isMobileSized}
                    selectedCountryCallback={selectedCountryCallback}
                  />
                </Col>
                <Col md="6">
                  {!isMobileSized && (
                    <CountryDetails country={selectedCountry} />
                  )}
                </Col>
              </Row>
            )
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Countries;
