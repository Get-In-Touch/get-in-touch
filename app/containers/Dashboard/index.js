import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactCard from '../ContactCard';
import { requestContactData } from './actions';
import styles from './styles.css';

class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    // When the component is loading, we request the contacts from the server
    console.log('app/containers/Dashboard/index.js:11; currentUser: ', this.props.signIn.get('currentUser'));
    this.props.requestContactData(this.props.signIn.get('currentUser'));
  }

  render() {
    // Determine which contacts are due or overdue today
    const NOW = new Date();
    const contactsDueToday = this.props.contacts.filter((contact) => contact.get('contactNext').isBefore(NOW)); // esline-disable react/prop-types

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
