
import React from 'react';
import styles from './styles.css';
// import { Button } from 'react-bootstrap';
import AddContactButton from '../../containers/Contacts/AddContactButton';
class SideBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
