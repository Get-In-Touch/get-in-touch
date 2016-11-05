import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ContactCard from '../ContactCard';

export class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { contacts } = this.props;
    return (
      <div className={styles.contactPage}>
        <h1>This is the contact page.</h1>
        {
          contacts.map((contact, i) => (
            <ContactCard key={i} contact={contact} />
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
