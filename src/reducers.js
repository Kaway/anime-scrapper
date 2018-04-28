import crunchy from './data/crunchy.json';
import netflix from './data/netflix.json';
import wakanim from './data/wakanim.json';
import adn from './data/adn.json';

import { combineReducers } from 'redux'

import {RESET_FILTERS, PROVIDER_FILTER, TITLE_FILTER} from './actions'
import {defaultAnimes} from './App'


const animesList = crunchy.concat(netflix).concat(wakanim).concat(adn);

const initialState = {
  selectedProvider: "",
  titleFilter: "",
  animes: animesList
};

const filtersReducer = (state = initialState, action) => {
  switch(action.type) {
    case RESET_FILTERS:
      return Object.assign({}, state, {
        providerFilter: "",
        selectedProvider: "",
        titleFilter: "",
        animes: defaultAnimes
      });
    case PROVIDER_FILTER:
      return Object.assign({}, state, {
        selectedProvider: action.value,
        animes: filterAnimes(action.value, state.selectedProvider, 
          state.titleFilter, state.titleFilter, state.animes)
      });
    case TITLE_FILTER:
      return Object.assign({}, state, {
        titleFilter: action.value,
        animes: filterAnimes(state.selectedProvider, state.selectedProvider,
          action.value, state.titleFilter, state.animes)
      });
    default:
      return state;
  }

}

const gyaApp = combineReducers({
  filtersReducer
});

export default gyaApp;
