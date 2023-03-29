import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { PhonebookList } from './PhonebookList/PhonebookList';
import { PhonebookFilter } from './PhonebookFilter/PhonebookFilter';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Title } from 'components/shared/Title/Title';
import { Block, Wrap } from './Phonebook.styled';

export const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      toast.success(`${name} 🦄 is already in contacts`);
      return false;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => {
      return [newContact, ...prevContacts];
    });
    return true;
  };

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };

  const removeContact = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== id);
    });
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div>
      <Wrap>
        <Block>
          <PhonebookForm onSubmit={addContact} />
        </Block>

        <Block>
          <PhonebookFilter handleChange={handleFilter} />

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
