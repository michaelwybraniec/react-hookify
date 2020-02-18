import React from "react";
import ListItem from "./ListItem.js";

class CountriesList extends React.Component {
  render() {
    const countries = [...this.props.countries];
    return (
      <React.Fragment>
        {countries &&
          countries.map(c => (
            <ListItem
              key={c.alpha3Code}
              country={c}
              isMobileSized={this.props.isMobileSized}
              selectedCountryCallback={this.props.selectedCountryCallback}
            />
          ))}
      </React.Fragment>
    );
  }
}

export default CountriesList;
