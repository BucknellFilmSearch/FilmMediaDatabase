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
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import SearchContainer from "./components/search/SearchContainer.jsx";
import AllFilms from "./components/results/AllFilms.jsx";
import 'isomorphic-fetch';


// allows use of chrome extension to monitor react performance
import Perf from 'react-addons-perf';
window.Perf = Perf;

// can be used to replace images with placeholder images to save bandwidth
export let DEBUG_MODE = true;

injectTapEventPlugin();


/**
* Generates the next state of the application. Changes are passed to the components for rerendering.
*
* @param state The previous state of the application
* @param action An action triggered by the user or an API call
* @return {*} The next state of the application
*/
export const reducer = (state = {
    search: null,
    context: [],
    searchType: undefined,
    sortType: 1,
    genre: 'All'
  } , action) => {
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
        contextMovieOclcId: parseInt(action.movieOclcId),
        currentContextMovieLineNumber: parseInt(action.movieLineNumber)
      };
    case 'QUEUE_CONTEXT':
      return {
        ...state,
        queueContextMovieOclcId: parseInt(action.movieOclcId),
        queueCurrentContextMovieLineNumber: parseInt(action.movieLineNumber)
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
      // remap context screenshots to include key
      console.log(action);
      let newContextScreenshots = action.context.map(screenshot => ({
        ...screenshot,
        key: `oclc${action.movieOclcId}line${screenshot.movieLineNumber}`
      })
      // filter out films that are already in the context
      ).filter(newScreenshot => state.context.find(contextScreenshot => newScreenshot.key == contextScreenshot.key) === undefined
      );

      return {
        ...state,
        context: state.context.concat(newContextScreenshots)
      };
    case 'REQUEST_NEW_SEARCH_TERM':
      return {
        ...state,
        search: {
          status: "loading",
          response: null,
          searchTerm: action.searchTerm
        },
        searchTerm: action.searchTerm,
        hoverMovieOclcId: null,
        hoverMovieLineNumber: null
      };
    case 'RECEIVE_NEW_SEARCH_TERM':

      // flatten 2D list containing screenshots for each film to a 1D list
      let newSearchResultsScreenshots = action.response.map(film =>
      // collect screenshots from each film
      film.results.map(screenshot => ({
        ...screenshot,
        key: `oclc${film.movieOclcId}line${screenshot.movieLineNumber}`
      })
      )
      // flatten list of screenshots
      ).reduce(
        ((screenshots, filmScreenshots) => screenshots.concat(filmScreenshots)), []
      // filter out films that are already in the context
      ).filter(newScreenshot => state.context.find(contextScreenshot => newScreenshot.key == contextScreenshot.key) === undefined
      );

      return {
        ...state,
        search: {
          status: "loaded",
          response: action.response,
          searchType: state.search.searchType,
          searchTerm: state.search.searchTerm
        },
        context: state.context.concat(newSearchResultsScreenshots)
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
      return state
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
    <Router history={ hashHistory }>
      <Route path="/">
        <IndexRoute component={ SearchContainer } />
        <Route path=":searchType/:searchTerm(/context/:contextOclcId/:contextScreenshot)" component={ AllFilms } />
      </Route>
    </Router>
  </Provider>
  ), document.getElementById('appContainer'));
