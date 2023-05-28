import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Phonebook.module.css';

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
      <form onSubmit={this.handleSubmit} className={css.contactForm}>
        <label className={css.label}>Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleNameChange}
        />
        <label className={css.label}>Phone</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleNumberChange}
        />
        <button className={css.button} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

export const ContactList = ({ contacts, deleteContact }) => (
  <ul className={css.list}>
    {contacts.map(contact => (
      <li key={contact.id} className={css.item}>
        {contact.name} - {contact.number}
        <button
          className={css.btnDelete}
          onClick={() => deleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export const Filter = ({ filter, handleFilterChange }) => (
  <>
    <label className={css.labelSearch}>Find contacts by name</label>
    <input
      className={css.inputSearch}
      type="text"
      name="filter"
      placeholder="Search"
      value={filter}
      onChange={handleFilterChange}
    />
  </>
);

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
Filter.propTypes = {
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func,
};
