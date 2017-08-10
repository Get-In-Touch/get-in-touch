import AddContactButton from '../../containers/Contacts/AddContactButton';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import SideBar from '../index';

describe('<SideBar />', () => {
  it('Has an AddContactButton', () => {
    const shallowSidebar = shallow(<Sidebar />);
    expect(shallowSidebar.find(AddContactButton)).to.have.length(1);
  });
});
