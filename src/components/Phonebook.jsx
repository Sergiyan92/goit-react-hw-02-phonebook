import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { contacts, addContact } = this.props;
    const existingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    console.log(existingContact);
    if (existingContact) {
      alert(`${name} is already in the phonebook.`);
    } else {
      if (name.trim() !== '' && number.trim() !== '') {
        const newContact = {
          id: nanoid(),
          name: name.trim(),
          number: number.trim(),
        };
        addContact(newContact);
        this.setState({ name: '', number: '' });
      }
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleNameChange}
        />
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleNumberChange}
        />
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

export class ContactList extends Component {
  render() {
    const { contacts } = this.props;
    return (
      <ul>
        {contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </ul>
    );
  }
}

export class ContactItem extends Component {
  render() {
    const { contact } = this.props;
    return (
      <li>
        {contact.name} - {contact.number}
      </li>
    );
  }
}

export class Filter extends Component {
  render() {
    const { filter, handleFilterChange } = this.props;
    return (
      <input
        type="text"
        name="filter"
        placeholder="Search"
        value={filter}
        onChange={handleFilterChange}
      />
    );
  }
}
ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func,
};
