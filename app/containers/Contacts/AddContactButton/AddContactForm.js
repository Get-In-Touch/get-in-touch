import React from 'react';
import { Field, reduxForm } from '../../../../node_modules/redux-form/immutable';
import { Button } from 'react-bootstrap';
import styles from './styles.css';
import formStyles from '../../../assets/formStyles.css';
import validation from '../../../utils/validation';
const { contactValidation: val } = validation;

const validate = (values) => ({
  name: val.contactName(values.get('name')),
  email: val.contactEmail(values.get('email')),
  phone: val.contactPhone(values.get('phone')),
  lastContacted: val.contactLastContacted(values.get('lastContacted')),
  contactFrequency: val.contactContactFrequency(values.get('contactFrequency')),
});

const warn = (values) => ({
  contactName: val.contactNameWarning(values.get('name')),
  contactFrequency: val.contactContactFrequencyWarning(values.get('contactFrequency')),
});

const renderField = ({ input, name, label, type, meta: { touched, error, warning } }) => ( // eslint-disable-line react/prop-types
  <div className={"form-group"}>
    <label htmlFor={name} className="col-sm-3 control-label">{label}</label>
    <div className="col-sm-9">
      {
        type === 'textarea' ?
          <textarea name={name} className={`form-control${(touched && error) ? ` ${formStyles.formFieldError}` : ''}`} {...input} placeholder={label} cols="30" rows="10" /> :
          <input name={name} className={`form-control${(touched && error) ? ` ${formStyles.formFieldError}` : ''}`} {...input} placeholder={label} type={type} />
      }
      {
        touched &&
        ((error && <div className={formStyles.formErrorMessage}>{error}</div>) ||
        (warning && <div className={formStyles.formWarningMessage}>{warning}</div>))
      }
    </div>
  </div>
);

const AddContactForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <Field name="name" label="Name" component={renderField} type="text" />
      <Field name="email" label="Email" component={renderField} type="text" />
      <Field name="phone" label="Phone" component={renderField} type="text" />
      <Field name="lastContacted" label="Last Contacted" type="date" component={renderField} />
      <Field name="contactFrequency" label="Contact Frequency" component={renderField} type="text" />
      <Field name="notes" label="Notes" component={renderField} type="textarea" />
      <div>
        <Button className={styles.submitAddContactBtn} type="submit">Submit</Button>
      </div>
    </form>
  );
};

AddContactForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'addContact',
  validate,
  warn,
})(AddContactForm);
