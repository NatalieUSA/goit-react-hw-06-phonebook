import PropTypes from 'prop-types';

import { BsTelephone } from 'react-icons/bs';
import { ListItem } from './PhonebookList.styled';
import { List } from './PhonebookList.styled';
import { Btn } from 'components/shared/Button/Button.styled';

export const PhonebookList = ({ removeContact, contacts }) => {
  const contact = contacts.map(({ id, name, number }) => (
    <ListItem key={id}>
      {name}
      <BsTelephone /> {number}
      <Btn type="submit" onClick={() => removeContact(id)}>
        delete
      </Btn>
    </ListItem>
  ));
  return <List>{contact}</List>;
};

PhonebookList.defaultProps = {
  contacts: [],
};

PhonebookList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
