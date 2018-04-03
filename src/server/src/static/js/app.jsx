/**
* This file is used to instantiate the application. This includes creating the Redux store,
* defining the routes for React-Router, and rendering components to the DOM.
*
* Author: Team EndFrame
* Organization: Bucknell University
* Spring 2017
*/

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import SearchContainer from './components/search/SearchContainer.jsx';
import AllFilms from './components/results/AllFilms.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'isomorphic-fetch';
import _ from 'lodash';


// allows use of chrome extension to monitor react performance
import Perf from 'react-addons-perf';
window.Perf = Perf;

// can be used to replace images with placeholder images to save bandwidth
export let DEBUG_MODE = true;

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  'palette': {
    'primary1Color': '#2196f3',
    'primary2Color': '#1976d2',
    'accent1Color': '#f57c00',
    'pickerHeaderColor': '#2196f3'
  },
  'tabs': {
    'backgroundColor': '#f5f5f5',
    'textColor': '#2196f3',
    'selectedTextColor': '#ef6c00'
  }
});

/**
* Generates the next state of the application. Changes are passed to the components for rerendering.
*
* @param {object} state The previous state of the application
* @param {object} action An action triggered by the user or an API call
* @returns {*} The next state of the application
*/
export const reducer = (state = {
  search: null,
  context: [],
  searchType: undefined,
  sortType: 1,
  genre: 'All'
}, action) => {
  switch (action.type) {
    case 'MOUSE_ENTER_SCREENSHOT':
      return {
        ...state,
        hoverMovieOclcId: action.movieOclcId,
        hoverMovieLineNumber: action.movieLineNumber
      };
    case 'SCROLL_SCREEN':
      return {
        ...state,
        hoverMovieOclcId: null,
        hoverMovieLineNumber: null
      };
    case 'OPEN_CONTEXT':
      return {
        ...state,
        contextMovieOclcId: parseInt(action.movieOclcId, 10),
        currentContextMovieLineNumber: parseInt(action.movieLineNumber, 10)
      };
    case 'QUEUE_CONTEXT':
      return {
        ...state,
        queueContextMovieOclcId: parseInt(action.movieOclcId, 10),
        queueCurrentContextMovieLineNumber: parseInt(action.movieLineNumber, 10)
      };
    case 'DEQUEUE_CONTEXT':
      return {
        ...state,
        queueContextMovieOclcId: null,
        queueCurrentContextMovieLineNumber: null
      };
    case 'SLIDE_SCREENSHOT':
      return {
        ...state,
        currentContextMovieLineNumber: action.newMovieLineNumber
      };
    case 'CLOSE_CONTEXT_DIALOG':
      return {
        ...state,
        contextMovieOclcId: null,
        currentContextMovieLineNumber: null
      };
    case 'RECEIVE_CONTEXT':
      return {
        ...state,
        context: _.concat(
          state.context,
          _(action.context)
            .map(img => ({ ...img, key: `oclc${action.movieOclcId}line${img.movieLineNumber}` })) // remap context screenshots to include key
            .filter(img => _.find(state.context, ctxImg => img.key === ctxImg.key) === undefined) // Filter out screenshots that already exist in the context
            .compact().value()
        )
      };
    case 'REQUEST_NEW_SEARCH_TERM':
      return {
        ...state,
        search: {
          status: 'loading',
          response: null,
          searchTerm: action.searchTerm,
          searchType: action.searchType
        },
        searchType: action.searchType,
        searchTerm: action.searchTerm,
        hoverMovieOclcId: null,
        hoverMovieLineNumber: null
      };
    case 'RECEIVE_NEW_SEARCH_TERM':
      console.log(
      );
      return {
        ...state,
        search: {
          status: 'loaded',
          response: action.response,
          searchType: state.search.searchType,
          searchTerm: state.search.searchTerm
        },
        context: _.concat(
          state.context,
          _.flatMap(action.response, film =>
            _(film.results)
              .map(img => ({ ...img, key: `oclc${film.movieOclcId}line${img.movieLineNumber}` })) // remap context screenshots to include key
              .reduce((imgs, filmImgs) => _.concat(imgs, filmImgs), []) // flatten list of screenshots
              .filter(img => state.context.find(ctxImg => img.key === ctxImg.key) === undefined) // filter out films that are already in the context
          )
        )
      };
    case 'SCROLL_INTO_FILM':
      return {
        ...state,
        currentMovieOclcId: action.movieOclcId
      };
    case 'SELECT_SEARCH_TYPE':
      return {
        ...state,
        searchType: action.searchType
      };
    case 'SELECT_SORT_TYPE':
      return {
        ...state,
        sortType: action.sortType
      };
    case 'SELECT_GENRE':
      return {
        ...state,
        genre: action.genre
      };
    default:
      return state;
  }
};


// create the Redux store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware) // lets us dispatch() functions
);


// render the components to the page and define the routes on the page
ReactDOM.render((
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <Router history={ hashHistory }>
        <Route path="/">
          <IndexRoute component={ SearchContainer } />
          <Route path=":searchType/:searchTerm(/context/:contextOclcId/:contextScreenshot)" component={ AllFilms } />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  ), document.getElementById('appContainer'));
