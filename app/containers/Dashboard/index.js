import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactCard from '../Contacts/ContactCard';
import { requestContactData } from './actions';
import styles from './styles.css';
import moment from 'moment';

class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    // When the component is loading, we request the contacts from the server
    this.props.requestContactData(this.props.signIn.get('currentUser'));
  }

  render() {
    // Determine which contacts are due or overdue today
    const NOW = new Date();
    const contactsDueToday = this.props.contacts
      .filter((contact) => {
        const noLastDateRecorded = !contact.get('lastContacted');
        const isOverdue = noLastDateRecorded || // if no last date recorded, then we should contact them
          moment(contact.get('lastContacted'))
            .add(contact.get('contactFrequency'), 'days')
            .isBefore(NOW);

        // The userId condition is only necessary while we're faking multi-user sign-in
        const belongsToCurrentUser = contact.get('userId') === +this.props.signIn.get('currentUser');

        return isOverdue && belongsToCurrentUser;
      });

    return (
      <div>
        <div className={styles.dashboardHeader}>
          Filter menu goes here?
        </div>
        {
          contactsDueToday.map((contact, i) => (
            <ContactCard key={i} contact={contact} />
          ))
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  requestContactData: React.PropTypes.func,
  contacts: React.PropTypes.object,
  signIn: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  contacts: state.get('contacts'),
  signIn: state.get('signIn'),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestContactData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
