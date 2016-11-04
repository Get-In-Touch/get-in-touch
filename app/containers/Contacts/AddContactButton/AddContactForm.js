import React from 'react';
import { Field, reduxForm } from '../../../../node_modules/redux-form/immutable';
import { Button, Row } from 'react-bootstrap';
import styles from './styles.css';
import formStyles from '../../../assets/formStyles.css';

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

const AddContactForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div>
        <Row>
          <div className={styles.formFieldContainer}>
            <Field
              className={styles.formField}
              placeholder="Name"
              name="name"
              component="input"
              type="text"
            />
          </div>
        </Row>
        <Row>
          <div className={styles.formFieldContainer}>
            <Field
              className={styles.formField}
              placeholder="Email"
              name="email"
              component="input"
              type="email"
            />
          </div>
        </Row>
        <Row>
          <div className={styles.formFieldContainer}>
            <Field
              className={styles.formField}
              placeholder="Phone Number"
              name="phone"
              component="input"
            />
          </div>
        </Row>
        <Row>
          <div className={styles.formFieldContainer}>
            <Field
              className={styles.formField}
              placeholder="Contact Frequency"
              name="contactFrequency"
              component="input"
              type="number"
            />
          </div>
        </Row>
        <Row>
          <div className={`${styles.formFieldContainer} ${styles.notes}`}>
            <Field
              className={styles.formField}
              placeholder="Notes..."
              name="notes"
              component="input"
              type="text"
            />
          </div>
        </Row>
      </div>
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
})(AddContactForm);
