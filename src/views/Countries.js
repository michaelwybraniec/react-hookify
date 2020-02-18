import React from "react";
import SingleSearchBar from "./components/forms/SingleSearchBar.js";
import CountriesList from "./components/countriesList/CountriesList.js";
import CountryDetails from "./components/countryDetails/CountryDetails.js";
import { formatJSON } from "../services/RESTcountries.js";
import { Row, Col, Alert } from "react-bootstrap";

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      allNonModifiedCountries: [],
      singleSearch: false,
      countries: [],
      country: [],
      isLoading: true,
      error: null,
      selectedCountry: []
    };
  }

  APIGetAll = (allCountries = true) => {
    this.setState({ isLoading: true });
    let url = this.state.searchInput
      ? `https://restcountries.eu/rest/v2/name/${this.state.searchInput}`
      : "https://restcountries.eu/rest/v2/all";
    fetch(url)
      .then(results => {
        return results.json();
      })
      .then(response => {
        if (allCountries) {
          this.setState({ allNonModifiedCountries: response });
          response = formatJSON(response, this.state.allNonModifiedCountries);
          this.setState({ countries: response });
          this.setState({ singleSearch: false });
          this.setState({ isLoading: false });
          this.setState({ error: null });
          this.setState({ country: [] });
          this.setState({
            selectedCountry:
              response.find(c => c.nativeName === "Polska") || null
          });
        } else {
          if (!response.status || response.status !== 404) {
            response = formatJSON(
              response,
              this.state.allNonModifiedCountries,
              false
            );
            this.setState({ country: response });
            this.setState({ singleSearch: true });
            this.setState({ isLoading: false });
            this.setState({ error: null });
            this.setState({
              selectedCountry: !this.props.isMobileSized
                ? response.length === 1
                  ? response[0]
                  : []
                : []
            });
          } else if (response.status && response.status === 404) {
            this.setState({
              error: {
                status: response.status,
                message: response.message,
                messageCustom:
                  "Ops! Nothing found, but did you try to search on Mars ?"
              }
            });
            this.setState({ country: [] });
            this.setState({ singleSearch: true });
            this.setState({ isLoading: false });
            this.setState({ selectedCountry: [] });
          } else {
            console.error("APIGetAll error: response:", response);
          }
        }
      });
  };

  componentDidMount() {
    this.APIGetAll();
  }

  getSearchInputData = SingleSearchBarData => {
    this.setState({ searchInput: SingleSearchBarData }, () => {
      this.APIGetAll(false);
    });
  };

  selectedCountryCallback = country => {
    this.setState({ selectedCountry: country });
  };

  render() {
    const data = !this.state.singleSearch
      ? [...this.state.countries]
      : [...this.state.country];

    let scrollStyle = this.props.isMobileSized
      ? {}
      : { height: 1000, overflowY: "scroll" };
    return (
      <React.Fragment>
        <Row>
          <Col className="pt-4">
            <SingleSearchBar
              countriesCallback={this.getSearchInputData}
              isLoading={this.state.isLoading}
            />
            {this.state.error ? (
              <Alert className="mt-2" variant="warning">
                {this.state.error.messageCustom}
              </Alert>
            ) : (
              !this.state.isLoading && (
                <Row className="mt-2">
                  <Col md="6" style={scrollStyle}>
                    <CountriesList
                      key={data.alpha3Code}
                      countries={data}
                      isMobileSized={this.props.isMobileSized}
                      selectedCountryCallback={this.selectedCountryCallback}
                    />
                  </Col>
                  <Col md="6">
                    {!this.props.isMobileSized && (
                      <CountryDetails country={this.state.selectedCountry} />
                    )}
                  </Col>
                </Row>
              )
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Countries;
