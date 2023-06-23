import { useState } from 'react';
import { Input, AddButton, Form, Title } from './ContactForm.styled';
import PropTypes from 'prop-types';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ e }) => {
    e.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <>
      <Title>Phonebook</Title>
      <Form
        onSubmit={evt => {
          evt.preventDefault(); // відміняємо стандартну поведінку браузера
          addContact({ name, number }); // додаємо контакт
          setName(''); // очищаємо поля
          setNumber(''); // очищаємо поля
        }}
      >
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
          onChange={handleChange}
          value={name}
        />
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Number"
          onChange={handleChange}
          value={number}
        />
        <AddButton type="submit">Add contact</AddButton>
      </Form>
    </>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
