import React, { Component } from 'react';
import styles from './styles.css';
import AddContactButton from '../../containers/Contacts/AddContactButton';

class SideBar extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.sidebarWrapper}>
        <ul className={styles.sidebarNav}>
          <li className={styles.sidebarItem}>
            <AddContactButton />
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
