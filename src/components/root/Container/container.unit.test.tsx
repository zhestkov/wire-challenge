import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Container from './Container';
import HomeView from '../../home/HomeView';
import { SearchView } from '../../search/SearchView';

describe('Container', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Container />);
  });

  it('should render an instance', () => {
    expect(component).not.toBeNull();
  });

  describe('Switch', () => {
    let pageSwitch: ShallowWrapper;
    let pageRoutes: ShallowWrapper;

    beforeAll(() => {
      pageSwitch = component.find('Switch');
      pageRoutes = component.find('Route');
    });

    it('should render a Switch', () => {
      expect(pageSwitch).toHaveLength(1);
    });

    describe('HomeView', () => {
      let homeRoute: ShallowWrapper;

      beforeAll(() => {
        homeRoute = pageRoutes.find({ component: HomeView });
      });

      it('should render route for HomeView', () => {
        expect(homeRoute).not.toBeNull();
      });
    });

    describe('SearchView', () => {
      let searchRoute: ShallowWrapper;

      beforeAll(() => {
        searchRoute = pageRoutes.find({ component: SearchView });
      });

      it('should render route for SearchView', () => {
        expect(searchRoute).not.toBeNull();
      })
    })
  });
});
