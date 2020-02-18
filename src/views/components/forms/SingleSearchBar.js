import React from "react";
import {
  Form,
  FormControl,
  Spinner,
  Button,
  Row,
  Col,
  InputGroup
} from "react-bootstrap";

class SingleSearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick = () => {
    this.props.countriesCallback(this.state.searchInput);
  };

  render() {
    return (
      <>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  variant="primary"
                  style={{ width: 150 }}
                  onClick={this.handleClick}>
                  {this.props.isLoading ? (
                    <span className="">
                      {" "}
                      <Spinner animation="border" size="sm" className="" />
                    </span>
                  ) : (
                    "Find"
                  )}
                </Button>
              </InputGroup.Prepend>
              <FormControl
                type="text"
                value={this.state.searchInput}
                name="searchInput"
                placeholder=""
                onChange={this.handleChange.bind(this)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </>
    );
  }
}

export default SingleSearchBar;
