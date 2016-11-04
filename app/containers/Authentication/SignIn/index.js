import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeUser } from './actions';
import styles from './styles.css';

export class SignIn extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onChange(e) {
    this.props.changeUser(e.target.value);
  }

  render() {
    const { signIn } = this.props;
    const users = signIn.get('users');
    const currentUser = signIn.get('currentUser');

    return (
      <div className={styles.signIn}>
        <select onChange={(e) => this.onChange(e)} defaultValue={currentUser}>
          <option key="-1" value="-1" disabled>-- select a user --</option>
          {users.map((user, i) => (
            <option key={i} value={user.get('userId')}>
              {user.get('name')}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: React.PropTypes.object,
  changeUser: React.PropTypes.func,
};

function mapStateToProps(state) {
  return { signIn: state.get('signIn') };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
