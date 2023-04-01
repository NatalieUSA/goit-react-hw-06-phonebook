export const getAllContacts = store => store.contacts;
console.log(getAllContacts);

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }
  const normalizedFilter = filter.toLowerCase();
  const result = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });
  return result;
};
