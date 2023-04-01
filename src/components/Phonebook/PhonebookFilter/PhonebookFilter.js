import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from './PhonebookFilter.styled';

export const PhonebookFilter = ({ handleChange, value }) => {
  return (
    <FormGroup>
      <Label></Label>
      <Input
        value={value}
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
