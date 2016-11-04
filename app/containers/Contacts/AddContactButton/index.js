import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles.css';
import { Button, Modal, Glyphicon } from 'react-bootstrap';
import AddContactForm from './AddContactForm';
import { requestAddContact } from './actions';

export class AddContactButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { requestAddContact, signIn } = this.props; // eslint-disable-line no-shadow
    return (
      <div className={styles.addContactButton}>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add Contact
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.close}
        >
          <div className={styles.modalHeader}>
            <Glyphicon
              className={styles.removeBtn}
              glyph="remove"
              onClick={this.close}
            />
            <h1>Add a contact</h1>
            <h4>Fill out the form below with the new contact information</h4>
          </div>
          <div className={styles.modalContent}>
            <AddContactForm
              onSubmit={(values) => {
                requestAddContact(signIn.get('currentUser'), values);
                this.close();
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

AddContactButton.propTypes = {
  requestAddContact: React.PropTypes.func.isRequired,
  signIn: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    signIn: state.get('signIn'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestAddContact }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContactButton);
