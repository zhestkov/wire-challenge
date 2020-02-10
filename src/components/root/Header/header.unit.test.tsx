import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Header from './Header';

const HEADER_TITLE: string = 'Wire Challenge';

describe('Header', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Header />);
  });

  it('should renders correctly', () => {
    // const component = shallow(<Header />);
    expect(component.find('.header').html()).toMatch(HEADER_TITLE);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  })
});
