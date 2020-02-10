import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configMockStore from 'redux-mock-store';
import  { SearchView } from './SearchView';
import {fetchPackages, SET_FILTER, SET_PACKAGES } from '../../store/modules/search';
import {IPackage} from '../../shared/interfaces/IPackage';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mockedPackages from './mockedPackages.json';
import thunk from 'redux-thunk';
import {SET_LOADING} from '../../store/modules/loading';

const PACKAGE_LIST: IPackage[] = [
  {
    name: 'package 1',
    homepage: 'http://github.com/owner1/package1',
    description: 'Description 1',
    stars: 14,
    repository_url: 'http://github.com/owner1/package1',
    owner: 'owner1'
  },
  {
    name: 'package 2',
    homepage: 'http://github.com/owner2/package2',
    description: 'Description 2',
    stars: 20,
    repository_url: 'http://github.com/owner2/package2',
    owner: 'owner2'
  }
];

describe('SearchView component', () => {
  describe('fetch data', () => {
    let component: ShallowWrapper;
    const spy = jest.spyOn(SearchView.prototype, 'onSearchQueryChange');
    const uri = `https://libraries.io/api/bower-search?q=react&per_page=5&page=1&api_key=${process.env.REACT_APP_API_KEY}`;

    const middlewares = [thunk];
    const mockStore = configMockStore(middlewares);
    const mockAdapter = new MockAdapter(axios);

    const customProps = {
      filteredPackages: PACKAGE_LIST,
      filter: {
        query: '',
        page: 1,
        limit: 5
      },
      isLoading: false,
      fetchPackages: jest.fn(),
      setFilter: jest.fn()
    };

    beforeEach(() => {
      component = shallow(<SearchView {...customProps} />);
    });

    afterEach(() => {
      mockAdapter.restore();
    });

    it('method onSearchQueryChange was executed', () => {
      const input = component.find('.inputField');
      input.simulate('change', { currentTarget: { value: 'react' }});
      expect(spy).toHaveBeenCalled();
    });

    it('async actions', () => {
      mockAdapter.onGet(uri)
        .reply(200, PACKAGE_LIST);

      const expectedActions = [
        { type: SET_LOADING, payload: true },
        { type: SET_FILTER, payload: { limit: 5, query: 'react', total: 12 }},
        { type: SET_PACKAGES, payload: mockedPackages },
        { type: SET_LOADING, payload: false },
      ];

      const filter = { query: 'react' };
      const store = mockStore({
        search: {
          packages: PACKAGE_LIST,
          filter: { query: 'react' }
        },
        loading: {
          isLoading: false
        }
      });
      return store.dispatch(fetchPackages(filter)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('axios.get on input change', (done) => {
      mockAdapter.onGet(uri)
        .reply(500, PACKAGE_LIST);
      done();
    });

  });
});
