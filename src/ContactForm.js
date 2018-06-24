import React from "react";
import ContactsClient from "./ContactsClient";


class ContactForm extends React.Component {
  state = {
    contacts: [],
    selectedContactId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    addressStreet: "",
    addressPostcode: "",
    addressCity: "",
    buttonText: "Save",
    formState: "",
    successHeader: "Contact Saved",
    deleteDisabled: true
  };

  componentDidMount() {
    this.getAllContacts()
  };

  getAllContacts() {
    ContactsClient.getAll(contacts => {
      this.setState({
        contacts: contacts
      });
    });
  }

  handleChange = e => {
    const {name, value} = e.target;

    this.setState(() => ({
      [name]: value,
      formState: ""
    }))
  };

  deleteContact = () => {
    this.setState({
      successHeader: "Contact Removed"
    });

    ContactsClient.deleteOne(this.state.selectedContactId, response => {
      this.setState({
        formState: "success",
        selectedContactId: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addressStreet: "",
        addressPostcode: "",
        addressCity: "",
        deleteDisabled: true,
        buttonText: "Save"
      });

      this.getAllContacts();
    })
  };

  saveContact = (event) => {
    event.preventDefault();

    const contact = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
      address: {
        street: this.state.addressStreet,
        postcode: this.state.addressPostcode,
        city: this.state.addressCity
      }
    };

    ContactsClient.saveOne(this.state.selectedContactId, contact, response => {
      this.setState({
        formState: "success",
        selectedContactId: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addressStreet: "",
        addressPostcode: "",
        addressCity: "",
        buttonText: "Save",
        deleteDisabled: true
      });

      this.getAllContacts();
    });
  };

  selectContact = (event) => {
    const contactId = event.target.value;
    this.setState({
      selectedContactId: contactId,
      formState: ""
    });

    if (contactId === "") {
      this.setState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addressStreet: "",
        addressPostcode: "",
        addressCity: "",
        buttonText: "Save",
        successHeader: "Contact Saved",
        deleteDisabled: true
      })
    } else {
      ContactsClient.getOne(contactId, contact => {
        this.setState({
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          addressStreet: contact.address.street,
          addressPostcode: contact.address.postcode,
          addressCity: contact.address.city,
          buttonText: "Update",
          successHeader: "Contact Updated",
          deleteDisabled: false
        })
      })
    }
  };

  render() {
    const { firstName, lastName, phone, email, addressStreet, addressPostcode, addressCity, contacts } = this.state;

    const contactList = contacts.map((contact, idx) => (
      <option key={idx} value={contact._id}>{contact.firstName}&nbsp;{contact.lastName}</option>
    ));

    return (
      <div className="contact-form">
        <div className="ui form saved-contacts">
          <div className="field">
            <label>Saved contacts</label>
            <select className="ui search dropdown" onChange={this.selectContact} value={this.state.selectedContactId}>
              <option value="">Select Contact</option>
              {contactList}
            </select>
          </div>
        </div>
        <form className={`ui form ${this.state.formState}`}>
          <div className="fields">
            <div className="field">
              <label>First Name</label>
              <input name="firstName" placeholder="First Name" type="text" onChange={this.handleChange} value={firstName}/>
            </div>
            <div className="field">
              <label>Last Name</label>
              <input name="lastName" placeholder="Last Name" type="text" onChange={this.handleChange} value={lastName}/>
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label>Telephone</label>
              <input name="phone" placeholder="+31612345678" type="text" onChange={this.handleChange} value={phone}/>
            </div>
            <div className="field">
              <label>E-mail</label>
              <input name="email" placeholder="joe@schmoe.com" type="email" onChange={this.handleChange} value={email}/>
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label>Street Address</label>
              <input name="addressStreet" placeholder="Street Address" type="text" onChange={this.handleChange} value={addressStreet}/>
            </div>
            <div className="field">
              <label>Postcode</label>
              <input name="addressPostcode" placeholder="Postcode" type="text" onChange={this.handleChange} value={addressPostcode}/>
            </div>
            <div className="field">
              <label>City</label>
              <input name="addressCity" placeholder="City" type="text" onChange={this.handleChange} value={addressCity}/>
            </div>
          </div>
          <div className="ui success message">
            <div className="header">{this.state.successHeader}</div>
          </div>
          <button className="ui button" type="button" onClick={this.saveContact} value={this.state.buttonText}>{this.state.buttonText}</button>
          <button className="ui button" disabled={this.state.deleteDisabled} type="button" onClick={this.deleteContact} value="Delete">Delete</button>
        </form>
      </div>
    )
  }
}

export default ContactForm;