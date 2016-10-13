import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ContactCard from '../ContactCard';
import moment from 'moment';
import { requestContactData } from './actions';
import axios from 'axios';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    // When the component is loading, we request the contacts from the server
    this.props.requestContactData();
  }

  render() {
    // Determine which contacts are due or overdue today
    const NOW = new Date();
    const contactsDueToday = this.props.contacts.filter(contact => contact.get('contactNext').isBefore(NOW));

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {
          contactsDueToday.map((contact, i) => (
            <ContactCard key={ i } contact={ contact } />
          ))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const contacts = state.get('contacts');
  return {
    contacts: state.get('contacts')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestContactData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);