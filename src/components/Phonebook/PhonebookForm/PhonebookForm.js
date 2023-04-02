import { useState } from 'react';
import PropTypes from 'prop-types';

// import { Button } from 'components/shared/Button/Button';

import { initialState } from './initialState';
import { FormGroup, Input, Label } from './PhonebookForm.styled';
import { FormBtn } from './PhonebookForm.styled';

import { addContact } from 'components/redux/contacts/ContactsSlice';
import { useSelector, useDispatch } from 'react-redux';

import { getAllContacts } from 'components/redux/contacts/ContactsSelector';
import { toast } from 'react-toastify';

export const PhonebookForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });
  const allContacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

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

  const handleChange = ({ target }) => {
    // console.log(target.value);
    const { value, name } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact({ ...state });
    setState({ ...initialState });
  };

  // const handleAddContact = ({ name, number }) => {
  //   console.log(name, number);
  //   // if (isDublicate(name)) {
  //   //   toast.success(`${name} 🦄 is already in contacts`);
  //   //   return false;
  //   // }

  //   const action = addContact({ name, number });
  //   console.log(action);
  //   dispatch(action);
  // };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          onChange={handleChange}
          placeholder="enter name"
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <Label></Label>
        <Input
          onChange={handleChange}
          placeholder="enter number"
          type="text"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <FormBtn type="submit" onSubmit={handleAddContact}>
          Add contact
        </FormBtn>
      </FormGroup>
    </form>
  );
};

// PhonebookForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// import { useState } from 'react';
// import PropTypes from 'prop-types';

// // import { Button } from 'components/shared/Button/Button';

// import { initialState } from './initialState';
// import { FormGroup, Input, Label } from './PhonebookForm.styled';
// import { FormBtn } from './PhonebookForm.styled';

// import { addContact } from 'components/redux/contacts/ContactsSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllContacts } from 'components/redux/contacts/ContactsSelector';

// export const PhonebookForm = () => {
//   // const dispatch = useDispatch();
//   // const allContacts = useSelector(getAllContacts);
//   // console.log(allContacts[0].name);

//   // const handleAddContact = ({ name, number }) => {
//   //   console.log(name, number);
//   //   const action = addContact({ name, number });
//   //   console.log(action);
//   //   dispatch(action);
//   // };

//   const handleAddContact = (values, actions) => {
//     if (allContacts.find(contact => contact.name === values.name)) {
//       return alert(`${values.name} is already in contacts.`);
//     }

//     dispatch(addContact(values));
//     actions.resetForm();
//   };
//   // const [state, setState] = useState({ ...initialState });

//   // const handleChange = ({ target }) => {
//   //   // console.log(target.value);
//   //   const { value, name } = target;
//   //   setState(prevState => {
//   //     return { ...prevState, [name]: value };
//   //   });
//   // };

//   // const handleSubmit = e => {
//   //   e.preventDefault();
//   //   onSubmit({ ...state });
//   //   setState({ ...initialState });
//   // // };
//   // const handleSubmit = e => {
//   //   e.preventDefault();
//   //   handleAddContact({ ...state });
//   //   setState({ ...initialState });
//   // };

//   // const handleAddContact = ({ name, number }) => {
//   //   console.log(name, number);
//   //   // if (isDublicate(name)) {
//   //   //   toast.success(`${name} 🦄 is already in contacts`);
//   //   //   return false;
//   //   // }

//   //   const action = addContact({ name, number });
//   //   console.log(action);
//   //   dispatch(action);
//   // };

//   // const isDublicate = name => {
//   //   const normalizedName = name.toLowerCase();
//   //   const result = allContacts.find(({ name }) => {
//   //     return name.toLowerCase() === normalizedName;
//   //   });
//   //   return Boolean(result);
//   // };

//   // const { name, number } = state;

//   return (
//     <form
//       // onSubmit={handleSubmit}
//       onSubmit={handleAddContact}
//     >
//       <FormGroup>
//         <Label></Label>
//         <Input
//           // onChange={handleChange}
//           placeholder="enter name"
//           type="text"
//           name="name"
//           // value={name}
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//         />

//         <Label></Label>
//         <Input
//           // onChange={handleChange}
//           placeholder="enter number"
//           type="text"
//           // name="number"
//           // value={number}
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//         />
//         <FormBtn type="submit">Add contact</FormBtn>
//       </FormGroup>
//     </form>
//   );
// };
///+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import { useState } from 'react';
// import PropTypes from 'prop-types';

// // import { Button } from 'components/shared/Button/Button';

// import { initialState } from './initialState';
// import { FormGroup, Input, Label } from './PhonebookForm.styled';
// import { FormBtn } from './PhonebookForm.styled';

// import { addContact } from 'components/redux/contacts/ContactsSlice';
// import { useDispatch } from 'react-redux';

// export const PhonebookForm = ({ onSubmit }) => {
//   const [state, setState] = useState({ ...initialState });

//   const handleChange = ({ target }) => {
//     // console.log(target.value);
//     const { value, name } = target;
//     setState(prevState => {
//       return { ...prevState, [name]: value };
//     });
//   };

//   // const handleSubmit = e => {
//   //   e.preventDefault();
//   //   onSubmit({ ...state });
//   //   setState({ ...initialState });
//   // };
//   const handleSubmit = e => {
//     e.preventDefault();
//     handleAddContact({ ...state });
//     setState({ ...initialState });
//   };

//   const dispatch = useDispatch();

//   const handleAddContact = ({ name, number }) => {
//     console.log(name, number);
//     // if (isDublicate(name)) {
//     //   toast.success(`${name} 🦄 is already in contacts`);
//     //   return false;
//     // }

//     const action = addContact({ name, number });
//     console.log(action);
//     dispatch(action);
//   };

//   // const isDublicate = name => {
//   //   const normalizedName = name.toLowerCase();
//   //   const result = allContacts.find(({ name }) => {
//   //     return name.toLowerCase() === normalizedName;
//   //   });
//   //   return Boolean(result);
//   // };

//   const { name, number } = state;

//   return (
//     <form onSubmit={handleSubmit}>
//       <FormGroup>
//         <Label></Label>
//         <Input
//           onChange={handleChange}
//           placeholder="enter name"
//           type="text"
//           name="name"
//           value={name}
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//         />

//         <Label></Label>
//         <Input
//           onChange={handleChange}
//           placeholder="enter number"
//           type="text"
//           name="number"
//           value={number}
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//         />
//         <FormBtn type="submit" onSubmit={handleAddContact}>
//           Add contact
//         </FormBtn>
//       </FormGroup>
//     </form>
//   );
// };

// PhonebookForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

///********************************************* */

// import { useState } from 'react';
// import PropTypes from 'prop-types';

// // import { Button } from 'components/shared/Button/Button';

// import { initialState } from './initialState';
// import { FormGroup, Input, Label } from './PhonebookForm.styled';
// import { FormBtn } from './PhonebookForm.styled';

// import { addContact } from 'components/redux/contacts/ContactsSlice';
// import { useDispatch } from 'react-redux';

// export const PhonebookForm = ({ onSubmit }) => {
//   const [state, setState] = useState({ ...initialState });

//   const handleChange = ({ target }) => {
//     // console.log(target.value);
//     const { value, name } = target;
//     setState(prevState => {
//       return { ...prevState, [name]: value };
//     });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     onSubmit({ ...state });
//     setState({ ...initialState });
//   };

//   const dispatch = useDispatch();

//   const handleAddContact = ({ name, number }) => {
//     console.log(name, number);
//     // if (isDublicate(name)) {
//     //   toast.success(`${name} 🦄 is already in contacts`);
//     //   return false;
//     // }

//     const action = addContact({ name, number });
//     console.log(action);
//     dispatch(action);
//   };

//   const { name, number } = state;

//   return (
//     <form onSubmit={handleSubmit}>
//       <FormGroup>
//         <Label></Label>
//         <Input
//           onChange={handleChange}
//           placeholder="enter name"
//           type="text"
//           name="name"
//           value={name}
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//         />

//         <Label></Label>
//         <Input
//           onChange={handleChange}
//           placeholder="enter number"
//           type="text"
//           name="number"
//           value={number}
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//         />
//         <FormBtn type="submit" onSubmit={handleAddContact}>
//           Add contact
//         </FormBtn>
//       </FormGroup>
//     </form>
//   );
// };

// // PhonebookForm.propTypes = {
// //   onSubmit: PropTypes.func.isRequired,
// // };
