import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router';
import SignIn from '../../containers/Authentication/SignIn';

export default class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // TODO: What is "profile" all about?
    // TODO: Login should probably go elsewhere
    return (
      <div>
        <ul className={styles.navbar}>
          <li className="nav-home"><Link to="/">Home</Link></li>
          <li className="nav-profile"><Link to="/profile">Profile</Link></li>
          <li className="nav-contacts"><Link to="/contacts">Contacts</Link></li>
          <li className="nav-login-logout"><Link to="/login">Login</Link></li>
        </ul>
        <SignIn />
      </div>
    );
  }
}
