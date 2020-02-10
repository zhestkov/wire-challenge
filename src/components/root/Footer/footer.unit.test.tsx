import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Footer from './Footer';

const customProps = {
  label: 'Test footer label'
};

describe('Footer', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Footer {...customProps} />)
  });

  it('should render into the document', () => {
    expect(component).not.toBeNull();
  });

  it('should render a proper label received from props', () => {
    expect(component.find('.footerLabel').html()).toMatch(customProps.label);
  });

});
