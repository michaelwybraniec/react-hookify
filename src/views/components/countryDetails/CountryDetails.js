import React from "react";
import { Card } from "react-bootstrap";

class ListItem extends React.Component {
  render() {
    const { country } = this.props;

    return (
      <React.Fragment>
        {country.nativeName && (
          <Card fluid="true" bg="light">
            <Card.Img variant="top" src={country.flag} />
            <Card.Body>
              <Card.Title>
                <p>{country.nativeName}</p>
              </Card.Title>
              <Card.Text>
                Alpha3Code: {country.alpha3Code}
                <br />
                Capital: {country.capital}
                <br />
                Population: {country.population}
                <br />
                Languages: {country.languages}
                <br />
                Timezone: {country.timezones}
                <br />
                Currency: {country.currenciesNames}
                <br />
                Neighbours: {country.nameOfBorderCountries}
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default ListItem;
