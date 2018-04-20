/**
* This file generates screenshots for each result returned by the database call.
*
* Author: Team EndFrame
* Organization: Bucknell University
* Spring 2017
*/

import * as React from 'react';
import IndividualFilmResults from './IndividualFilmResults.jsx';
import MetadataDrawer from './MetadataDrawer.jsx';
import ContextDialog from './ContextDialog.jsx';
import ResultsToolbar from './ResultsToolbar.jsx';
import { Modal as SearchInput } from '../search/input';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import ScrollEvent from 'react-onscroll';
import { hashHistory } from 'react-router';
import {relevanceSort, alphabeticalSort, yearSort} from '../helpers';
import _ from 'lodash';


/**
* The AllFilms returns  grid lists of screenshots for each movie where the
* search term or phrase was used. It connects to the redux store to map the
* screenshots with the oclcId of the movie.
*/

@connect(mapStateToProps, mapDispatchToProps)
export default class AllFilms extends React.Component {

  constructor(props) {
    super(props);
    this.handleScrollCallback = this.handleScrollCallback.bind(this);
    this.state = {
      searchModalOpen: false
    };
  }

  componentDidMount() {
    // save context until search term is loaded
    if (this.props.routeParams.contextOclcId) {
      this.props.queueContext(this.props.routeParams.contextOclcId, this.props.routeParams.contextScreenshot);
      hashHistory.push(`${this.props.routeParams.searchType}/${this.props.routeParams.searchTerm}`);
    }

    const params = {
      type: this.props.routeParams.searchType || undefined,
      confidence: this.props.confidence
    };
    this.props.fetchNewSearchTerm(decodeURIComponent(this.props.routeParams.searchTerm), params);
  }

  /**
   * Handle the search modal opening
   * @returns {undefined}
   */
  openSearchModal() {
    this.setState({ searchModalOpen: true });
  }

  /**
   * Handle the search modal closing
   * @returns {undefined}
   */
  closeSearchModal() {
    this.setState({ searchModalOpen: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.queueContextMovieOclcId && nextProps.filmsLoaded) {
      this.props.dequeueContext();
      // update url if there is queued context
      hashHistory.push(`${nextProps.routeParams.searchType}/${nextProps.routeParams.searchTerm}/context/${nextProps.queueContextMovieOclcId}/${nextProps.queueCurrentContextMovieLineNumber}`);
      return;
    }

    // Pull out incoming values for paths/search/confidence
    const {
      routeParams: { searchType: newRouteType, searchTerm: newRouteTerm },
      search: { searchTerm: newSearchTerm, searchType: newSearchType},
      location: { query: { confidence } }
    } = nextProps;

    // Use pre-existing confidence if not specified
    const newConfidence = parseFloat(confidence || this.props.confidence);

    // No search run yet
    if (this.props.search === null) {
      const params = {
        type: newRouteType || newSearchType || undefined,
        confidence: newConfidence || nextProps.confidence
      };
      this.props.fetchNewSearchTerm(newSearchTerm || newRouteTerm, params);
    // If a search already exists
    } else {
      // Pull out current values
      const {
        routeParams: {
          searchType: oldRouteType
        },
        confidence: oldConfidence
      } = this.props;
      // If existing values don't match incoming values
      if (newSearchTerm !== newRouteTerm || newRouteType !== oldRouteType || oldConfidence !== newConfidence) {
        // Map new params
        const params = {
          type: newRouteType || newSearchType || undefined,
          confidence: newConfidence || nextProps.confidence
        };
        this.props.fetchNewSearchTerm(decodeURIComponent(newRouteTerm), params);
      }
    }

    // swap context
    const { contextOclcId: oldOclcId, contextScreenshot: oldScreenshot } = this.props.routeParams;
    const { contextOclcId: newOclcId, contextScreenshot: newScreenshot } = nextProps.routeParams;
    if (newOclcId !== oldOclcId || newScreenshot !== oldScreenshot) {
      this.props.openContext(newOclcId, newScreenshot);
    } else if ((!_.has(nextProps.routeParams, 'contextOclcId') && _.has(this.props.routeParams, 'contextOclcId'))) {
      this.props.closeContext();
    }
  }

  handleScrollCallback() {
    this.props.onScrollScreen();
  }

  render() {

    return (
      <div>
        <ScrollEvent handleScrollCallback={this.handleScrollCallback} />
        <ResultsToolbar openSearchModal={() => this.openSearchModal()} />
        <SearchInput open={this.state.searchModalOpen} handleClose={() => this.closeSearchModal()} />
        <MetadataDrawer />
        {this.props.hasContext && <ContextDialog />}
        {!this.props.filmsLoaded ? (
          <div style={{paddingTop: '60px'}}>
          <h2>Loading Relevant Films...</h2>
          </div>
        ) :
          this.props.films.map((film)=> <IndividualFilmResults key={`filmkey${film.movieOclcId}`} individualFilm={film} />
        )
      }
      </div>
    );
  }
}


/**
* Redux action for when the user requests a new search term
* @param {string} searchTerm New search term
* @param {string} searchType The type of search to run (one of: text, object, color)
* @param {string} confidence The minimum confidence bound for the search
* @returns {object} The action for requesting a new search term
*/
export const requestNewSearchTerm = (searchTerm, searchType, confidence) => {
  return {
    type: 'REQUEST_NEW_SEARCH_TERM',
    searchTerm,
    searchType,
    confidence
  };
};


/**
* Redux action for when the API call is received for the requested search term.
* @param {array} response Response to the API call
* @returns {object} The action for handling a new set of search results
*/
const receiveNewSearchTerm = (response) => {
  return {
    type: 'RECEIVE_NEW_SEARCH_TERM',
    response
  };
};


/**
* Composite Redux action for fetching a new search term. Requests the search term,
* makes the API call, and submits an action when the API call returns data.
* @param {string} searchTerm New search term
* @param {object} params The search parameters to include (type, sort, etc.)
* @returns {function} A function that will submit a request for a new search term
*/
const fetchNewSearchTerm = (searchTerm, params) => {
  return (dispatch) => {
    dispatch(requestNewSearchTerm(searchTerm, params.type, params.confidence));
    let queryString = `${window.location.origin}/api/moviesearch/${searchTerm}`;

    if (_.keys(params).length !== 0) {
      queryString += `?${_(params).keys().map(key => `${key}=${params[key]}`).join('&')}`;
    }
    return fetch(queryString)
    .then(response => response.json())
    .then(response => dispatch(receiveNewSearchTerm(response.results)));
  };
};


/**
* Redux action when the user requests opening the context for a given screenshot
* @param {number} movieOclcId The movieOclcId corresponding to the context they requested
* @param {number} movieLineNumber The movieLineNumber corresponding to the context they requested
* @returns {object} The action for opening an image's context
*/
const openContext = (movieOclcId, movieLineNumber) => {
  return {
    type: 'OPEN_CONTEXT',
    movieOclcId,
    movieLineNumber
  };
};


/**
* Redux action when the user directly requests the context for a film before entering a
* search. This action queues the requesting the context until the search is completed.
* @param {number} movieOclcId The movieOclcId corresponding to the context they requested
* @param {number} movieLineNumber The movieLineNumber corresponding to the context they requested
* @returns {object} The action for queuing a new context
*/
const queueContext = (movieOclcId, movieLineNumber) => {
  return {
    type: 'QUEUE_CONTEXT',
    movieOclcId,
    movieLineNumber
  };
};


/**
* Redux action that dequeues the pending context request when the API call is eventually made.
* @returns {object} The action for dequeuing a context
*/
const dequeueContext = () => {
  return {
    type: 'DEQUEUE_CONTEXT'
  };
};


/**
* Redux action that triggers when the user scrolls on the screen. This removes the metadata from the
* metadata drawer when they scroll.
* @returns {object} The action for signifying the user's scroll
*/
const scrollScreen = () => {
  return {
    type: 'SCROLL_SCREEN'
  };
};


/**
* Redux action that triggers when the user wishes to close the context dialog.
* @returns {object} The action for closing the context dialog
*/
const closeContextDialog = () => {
  return {
    type: 'CLOSE_CONTEXT_DIALOG'
  };
};


const areFilmsLoaded = (state) => state.search && state.search.status === 'loaded';
const getSearchResponse = (state) => areFilmsLoaded(state) ? [...state.search.response] : [];
const getSortType = (state) => state.sortType;
const getGenre = (state) => state.genre;
const getFilms = createSelector(
  [ getSearchResponse, getSortType, getGenre],
  (films, sortType, genre) => {
    // sort films based on user input
    if (sortType === 1) {
      films = films.sort(relevanceSort);
    } else if (sortType === 2) {
      films = films.sort(alphabeticalSort);
    } else if (sortType === 3) {
      films = films.sort(alphabeticalSort).reverse();
    } else if (sortType === 4) {
      films = films.sort(yearSort);
    } else if (sortType === 5) {
      films = films.sort(yearSort).reverse();
    }
    return genre === 'All' ? films :
    films.filter(film => film.genre1 === genre || film.genre2 === genre || film.genre3 === genre);
  }
);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    filmsLoaded: areFilmsLoaded(state),
    films: getFilms(state),
    hasContext: state.contextMovieOclcId,
    search: state.search,
    searchType: state.searchType,
    searchTerm: state.searchTerm,
    confidence: state.confidence,
    queueContextMovieOclcId: state.queueContextMovieOclcId,
    queueCurrentContextMovieLineNumber: state.queueCurrentContextMovieLineNumber
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    fetchNewSearchTerm: (searchTerm, params) => dispatch(fetchNewSearchTerm(searchTerm, params)),
    onScrollScreen: () => dispatch(scrollScreen()),
    openContext: (oclcId, screenshot) => dispatch(openContext(oclcId, screenshot)),
    closeContext: () => dispatch(closeContextDialog()),
    queueContext: (oclcId, screenshot) => dispatch(queueContext(oclcId, screenshot)),
    dequeueContext: () => dispatch(dequeueContext())
  };
}
