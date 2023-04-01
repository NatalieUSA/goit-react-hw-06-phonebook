// import { useEffect, useState } from 'react';
// import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { PhonebookList } from './PhonebookList/PhonebookList';
import { PhonebookFilter } from './PhonebookFilter/PhonebookFilter';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Title } from 'components/shared/Title/Title';
import { Block, Wrap } from './Phonebook.styled';
//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
} from 'components/redux/contacts/ContactsSlice';
import {
  getAllContacts,
  getFilteredContacts,
} from 'components/redux/contacts/ContactsSelector';
import { getFilter } from 'components/redux/filter/FilterSelectors';
import { setFilter } from 'components/redux/filter/FilterSlice';

export const Phonebook = () => {
  // const [contacts, setContacts] = useState(() => {
  //   const contacts = JSON.parse(localStorage.getItem('my-contacts'));
  //   return contacts ? contacts : [];
  // });

  const allContacts = useSelector(getAllContacts);
  console.log(allContacts);
  const filteredContacts = useSelector(getFilteredContacts);

  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

  // useEffect(() => {
  //   localStorage.setItem('my-contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    console.log(name, number);
    if (isDublicate(name)) {
      toast.success(`${name} 🦄 is already in contacts`);
      return false;
    }

    const action = addContact({ name, number });
    console.log(action);
    dispatch(action);
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  // const getFilteredContacts = () => {
  //   if (!filter) {
  //     return contacts;
  //   }
  //   const normalizedFilter = filter.toLowerCase();
  //   const result = contacts.filter(({ name }) => {
  //     return name.toLowerCase().includes(normalizedFilter);
  //   });
  //   return result;
  // };

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  // const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div>
      <Wrap>
        <Block>
          <PhonebookForm onSubmit={handleAddContact} />
        </Block>

        <Block>
          <PhonebookFilter value={filter} handleChange={handleFilter} />

          {isContacts && (
            <PhonebookList
              removeContact={removeContact}
              contacts={filteredContacts}
            />
          )}

          {!isContacts && <Title>No contacts in list</Title>}
        </Block>
      </Wrap>
    </div>
  );
};
