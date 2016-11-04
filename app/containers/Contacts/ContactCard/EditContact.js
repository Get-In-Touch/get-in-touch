import React from 'react';
import { Field, reduxForm } from '../../../../node_modules/redux-form/immutable';
import { Button, Glyphicon } from 'react-bootstrap';
import styles from './styles.css';
import {
  contactName, contactNameWarning,
  contactEmail,
  contactPhone,
  contactLastContacted,
  contactContactFrequency, contactContactFrequencyWarning,
} from '../../../utils/validation';

const validate = (values) => ({
  name: contactName(values.get('name')),
  email: contactEmail(values.get('email')),
  phone: contactPhone(values.get('phone')),
  lastContacted: contactLastContacted(values.get('lastContacted')),
  contactFrequency: contactContactFrequency(values.get('contactFrequency')),
});

const warn = (values) => ({
  contactName: contactNameWarning(values.get('name')),
  contactFrequency: contactContactFrequencyWarning(values.get('contactFrequency')),
});

const renderField = ({ input, name, label, type, meta: { touched, error, warning } }) => ( // eslint-disable-line react/prop-types
  <div className={"form-group"}>
    <label htmlFor={name} className="col-sm-3 control-label">{label}</label>
    <div className="col-sm-9">
      <input className={`form-control${(touched && error) ? ` ${styles.formFieldError}` : ''}`} {...input} placeholder={label} type={type} />
      {
        touched &&
        ((error && <div className={styles.formErrorMessage}>{error}</div>) ||
          (warning && <div className={styles.formWarningMessage}>{warning}</div>))
      }
    </div>
  </div>
);

class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, appStatus, contact } = this.props;
    const contactAppStatus = !!appStatus.get('contacts') &&
      appStatus.get('contacts').get(contact.get('id'));
    const pendingUpdate = !!contactAppStatus && (contactAppStatus.get('updatingStatus') === true);
    const updateError = !!contactAppStatus &&
      (typeof contactAppStatus.get('updatingStatus') === 'string') &&
      contactAppStatus.get('updatingStatus');

    return (
      <div className="col-sm-10">
        <form onSubmit={handleSubmit} className="form-horizontal">
          <Field name="name" label="Name" type="text" component={renderField} />
          <Field name="email" label="Email" type="email" component={renderField} />
          <Field name="phone" label="Phone" type="text" component={renderField} />
          <Field name="lastContacted" label="Last Contacted" type="date" component={renderField} />
          <Field name="contactFrequency" label="Contact Frequency" type="text" component={renderField} />
          <div className="row">
            <div className="col-sm-9 col-sm-offset-3">
              <span className={styles.formErrorMessage}>
                {updateError && 'Error: Couldn\'t update contact. Try again in a few seconds.'}
              </span>
            </div>
          </div>
          <div className={`row ${styles.formControls}`}>
            <div className="col-sm-9 col-sm-offset-3">
              <Button
                type="submit"
                bsStyle="primary"
                disabled={pendingUpdate}
                className={styles.editSubmitButton}
              >
                <Glyphicon glyph="ok" /> Submit
              </Button>
              <Button
                onClick={this.props.onCancelClick}
                bsStyle="danger"
                disabled={pendingUpdate}
                className={`pull-right ${styles.editCancelButton}`}
              >
                <Glyphicon glyph="remove" /> Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onCancelClick: React.PropTypes.func.isRequired,
  appStatus: React.PropTypes.object,
  contact: React.PropTypes.object,
};

export default reduxForm({
  validate,
  warn,
})(ContactForm);
