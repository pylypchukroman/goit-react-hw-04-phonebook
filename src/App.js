import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Filter from './Filter/Filter.jsx';
import ContactForm from './contactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const App = () => {
  const contactsFotChecking = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'rosie simpson', number: '459-12-56' },
    { id: 'id-6', name: 'hermione kline', number: '443-89-12' },
    { id: 'id-7', name: 'eden clements', number: '645-17-79' },
    { id: 'id-8', name: 'annie copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || contactsFotChecking
  );
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const checkedName = contacts.some(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );
    checkedName
      ? Notify.failure(`${name} is already in contacts.`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const getCurrentContacts = () => {
    const noRegisterRequest = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(noRegisterRequest)
    );
    return filteredContacts;
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const currentContactList = getCurrentContacts();

  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        contacts={currentContactList}
        onDeleteContact={deleteContact}
      />
    </>
  );
};

export default App;
