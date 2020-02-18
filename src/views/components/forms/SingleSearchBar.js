import React, { useState } from "react";
import {
  Form,
  FormControl,
  Spinner,
  Button,
  Col,
  InputGroup
} from "react-bootstrap";

function SingleSearchBar({ isLoading, countriesCallback }) {
  let [input, setInput] = useState("");
  const handleChange = e => setInput(e.target.value);
  const handleClick = () => countriesCallback(input);

  return (
    <Form.Row>
      <Form.Group as={Col}>
        <InputGroup>
          <InputGroup.Prepend>
            <Button
              variant="primary"
              style={{ width: 150 }}
              onClick={handleClick}>
              {isLoading ? (
                <span>
                  <Spinner animation="border" size="sm" />
                </span>
              ) : (
                "Find"
              )}
            </Button>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            value={input}
            name="searchInput"
            placeholder=""
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
    </Form.Row>
  );
}
export default SingleSearchBar;
