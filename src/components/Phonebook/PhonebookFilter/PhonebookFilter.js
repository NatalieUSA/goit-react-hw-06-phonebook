import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from './PhonebookFilter.styled';

import { getFilter } from 'components/redux/filter/FilterSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'components/redux/filter/FilterSlice';

export const PhonebookFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  console.log(filter);

  // const handleFilter = ({ target }) => {
  //   dispatch(setFilter(target.value));
  // };

  const handleFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FormGroup>
      <Label></Label>
      <Input
        value={filter}
        name="filter"
        type="text"
        // onChange={e => dispatch(setFilter(e.target.value))}
        onChange={handleFilter}
        placeholder="find contacts by name"
        autoComplete="off"
      />
    </FormGroup>
  );
};

// PhonebookFilter.propTypes = {
//   handleChange: PropTypes.func.isRequired,
// };

// import PropTypes from 'prop-types';

// import { FormGroup, Label, Input } from './PhonebookFilter.styled';

// export const PhonebookFilter = ({ handleChange, value }) => {

//   return (
//     <FormGroup>
//       <Label></Label>
//       <Input
//         value={value}
//         name="filter"
//         onChange={handleChange}
//         placeholder="find contacts by name"
//       />
//     </FormGroup>
//   );
// };

// PhonebookFilter.propTypes = {
//   handleChange: PropTypes.func.isRequired,
// };
