import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router';
import SignIn from '../../containers/Authentication/SignIn';

export default class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <ul className={styles.navbar}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/contacts">Connections</Link></li>
        </ul>
        <SignIn />
      </div>
    );
  }
}
