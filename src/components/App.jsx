import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { WrapperContent } from './App.styled';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

const CONTACTS = 'contacts';
const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts
  );

  useEffect(() => {
    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);
  const [filter, setFilter] = useState('');

  const creatContact = ({ name, number }) => {
    if (
      contacts.some(
        existingContact =>
          existingContact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notiflix.Notify.failure(`Contact ${name} is already`);
    } else {
      setContacts(old => {
        const list = [...old];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        Notiflix.Notify.success(`Contact ${name} added to  your phonebook`);
        return list;
      });
    }
  };

  const deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  const getFiltredContacts = () => {
    const { contacts, filter } = this.state;

    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtredContacts;
  };
  const hadleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <WrapperContent>
      <ContactForm creatContact={creatContact} />
      <Filter value={filter} onChange={hadleFilterChange}></Filter>
      <Contacts
        deleteContact={deleteContact}
        contacts={getFiltredContacts()}
      ></Contacts>
    </WrapperContent>
  );
};
