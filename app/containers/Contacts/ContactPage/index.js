import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ContactCard from '../ContactCard';
import { Link } from 'react-router';

export class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const allContacts = this.props.contacts;
    return (
      <div className={styles.contactPage}>
        <h1>This is the contact page..</h1>
        {
          allContacts.map((contact, i) => (
            <Link key={i} to={contact.get('name')}><ContactCard contact={contact} /></Link>
          ))
        }
      </div>
    );
  }
}

ContactPage.propTypes = {
  contacts: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    contacts: state.get('contacts'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
