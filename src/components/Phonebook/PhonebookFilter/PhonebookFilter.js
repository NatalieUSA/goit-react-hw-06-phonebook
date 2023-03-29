import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from './PhonebookFilter.styled';

export const PhonebookFilter = ({ handleChange }) => {
  return (
    <FormGroup>
      <Label></Label>
      <Input
        name="filter"
        onChange={handleChange}
        placeholder="find contacts by name"
      />
    </FormGroup>
  );
};

PhonebookFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
