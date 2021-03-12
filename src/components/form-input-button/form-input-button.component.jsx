import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const FormInputButton = ({
  handleChange,
  handleSubmit,
  placeholder,
  buttonLabel,
}) => {
  return (
    <form onSubmit={handleSubmit} className="">
      <InputGroup className="mb-3">
        <FormControl
          placeholder={placeholder}
          onChange={handleChange}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit">
            {buttonLabel}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </form>
  );
};

export default FormInputButton;
