// import NavBar from '../index';

import expect from 'expect';
import NavBar from './index';
import { shallow } from 'enzyme';
import React from 'react';

describe('<NavBar />', () => {
  it('has all the expected links', () => {
    const expectedClasses = [
      'nav-home',
      'nav-profile',
      'nav-contacts',
      'nav-login-logout',
    ];

    const renderedComponent = shallow(
      <NavBar />
    );

    expectedClasses.forEach((expectedClass) => {
      expect(renderedComponent.find(`.${expectedClass}`).length)
        .toBe(1);
    });

    expect(renderedComponent.find('li').length).toBe(expectedClasses.length);
  });
});
