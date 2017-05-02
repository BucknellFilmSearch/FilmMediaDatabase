/**
 * This file generates screenshots for each result returned by the database call.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from "react";
import IndividualFilmResults from "./IndividualFilmResults.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey50, cyan700, pinkA200, grey800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MetadataDrawer from './MetadataDrawer.jsx';
import ContextDialog from './ContextDialog.jsx';
import ResultsToolbar from './ResultsToolbar.jsx';
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import ScrollEvent from 'react-onscroll';
import { hashHistory } from 'react-router';
import {relevanceSort, alphabeticalSort, yearSort} from '../helpers';


/**
 * The AllFilms returns  grid lists of screenshots for each movie where the
 * search term or phrase was used. It connects to the redux store to map the
 * screenshots with the oclcId of the movie.
 */

@connect(mapStateToProps, mapDispatchToProps)
export default class AllFilms extends React.Component {

    /**
     * Binds event handler to the class.
     */
    constructor() {
        super();
        this.handleScrollCallback = this.handleScrollCallback.bind(this);
    }

    componentDidMount() {
        // save context until search term is loaded
        if (this.props.routeParams['contextOclcId']) {
            console.log('queuing context');
            this.props.queueContext(this.props.routeParams['contextOclcId'], this.props.routeParams['contextScreenshot']);
            hashHistory.push(`${this.props.routeParams['searchTerm']}`);
        }

        this.props.fetchNewSearchTerm(this.props.routeParams['searchTerm']);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.queueContextMovieOclcId && nextProps.filmsLoaded) {
            this.props.dequeueContext();
            // update url if there is queued context
            hashHistory.push(`${nextProps.routeParams['searchTerm']}/context/${nextProps.queueContextMovieOclcId}/${nextProps.queueCurrentContextMovieLineNumber}`);
            return;
        }

        // compare old search term to new, and old context to new

        // new search term
        if (nextProps.routeParams['searchTerm'] != this.props.routeParams['searchTerm']) {
            console.log('new search');
            this.props.fetchNewSearchTerm(nextProps.routeParams['searchTerm']);
        }
        // swap context
        if (nextProps.routeParams['contextOclcId'] != this.props.routeParams['contextOclcId'] ||
            nextProps.routeParams['contextScreenshot'] != this.props.routeParams['contextScreenshot']) {
            this.props.openContext(nextProps.routeParams['contextOclcId'], nextProps.routeParams['contextScreenshot']);
        }
        // close context
        else if ((!nextProps.routeParams.hasOwnProperty('contextOclcId') && this.props.routeParams.hasOwnProperty('contextOclcId'))) {
            this.props.closeContext();
        }
    }

    handleScrollCallback() {
        this.props.onScrollScreen();
    }

    render () {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: grey800,
                primary2Color: cyan700,
                primary3Color: pinkA200,
                accent1Color: grey800,
                accent2Color: grey50,
                accent3Color: grey800
            }
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <ScrollEvent handleScrollCallback={this.handleScrollCallback} />
                    <ResultsToolbar />
                    <MetadataDrawer />
                    {this.props.hasContext && <ContextDialog />}
                    {!this.props.filmsLoaded ? (
                        <div style={{paddingTop: '60px'}}>
                            <h2>Loading Relevant Films...</h2>
                        </div>
                    ) :
                        this.props.films.map(function (object) {
                            return <IndividualFilmResults
                                key={`filmkey${object.movieOclcId}`}
                                individualFilm={object} />;
                            }
                        )
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}


/**
 * Redux action for when the user requests a new search term
 * @param searchTerm New search term
 */
export const requestNewSearchTerm = (searchTerm) => {
    return {
        type: 'REQUEST_NEW_SEARCH_TERM',
        searchTerm
    }
};


/**
 * Redux action for when the API call is received for the requested search term.
 * @param response Response to the API call
 */
const receiveNewSearchTerm = (response) => {
    return {
        type: 'RECEIVE_NEW_SEARCH_TERM',
        response
    }
};


/**
 * Composite Redux action for fetching a new search term. Requests the search term,
 * makes the API call, and submits an action when the API call returns data.
 * @param searchTerm New search term
 */
const fetchNewSearchTerm = (searchTerm) => {
    return (dispatch) => {
        dispatch(requestNewSearchTerm(searchTerm));
        return fetch(`http://localhost:8080/moviesearch/${searchTerm}`)
            .then(response => response.json())
            .then(response => dispatch(receiveNewSearchTerm(response.results)));
    }
};


/**
 * Redux action when the user requests opening the context for a given screenshot
 * @param movieOclcId The movieOclcId corresponding to the context they requested
 * @param movieLineNumber The movieLineNumber corresponding to the context they requested
 */
const openContext = (movieOclcId, movieLineNumber) => {
    return {
        type: 'OPEN_CONTEXT',
        movieOclcId,
        movieLineNumber
    }
};


/**
 * Redux action when the user directly requests the context for a film before entering a
 * search. This action queues the requesting the context until the search is completed.
 * @param movieOclcId The movieOclcId corresponding to the context they requested
 * @param movieLineNumber The movieLineNumber corresponding to the context they requested
 */
const queueContext = (movieOclcId, movieLineNumber) => {
    return {
        type: 'QUEUE_CONTEXT',
        movieOclcId,
        movieLineNumber
    }
};


/**
 * Redux action that dequeues the pending context request when the API call is eventually made.
 */
const dequeueContext = () => {
    return {
        type: 'DEQUEUE_CONTEXT'
    }
};


/**
 * Redux action that triggers when the user scrolls on the screen. This removes the metadata from the
 * metadata drawer when they scroll.
 */
const scrollScreen = () => {
    return {
        type: 'SCROLL_SCREEN'
    };
};


/**
 * Redux action that triggers when the user wishes to close the context dialog.
 */
const closeContextDialog = () => {
    return {
        type: 'CLOSE_CONTEXT_DIALOG'
    };
};


const areFilmsLoaded = (state) => state.search && state.search.status == "loaded";
const getSearchResponse = (state) => areFilmsLoaded(state) ? [...state.search.response] : [] ;
const getSortType = (state) => state.sortType;
const getGenre = (state) => state.genre;
const getFilms = createSelector(
    [ getSearchResponse, getSortType, getGenre],
    (films, sortType, genre) => {
        // sort films based on user input
        if (sortType == 1) {
            films = films.sort(relevanceSort);
        }
        else if (sortType == 2) {
            films = films.sort(alphabeticalSort);
        }
        else if (sortType == 3) {
            films = films.sort(alphabeticalSort).reverse();
        }
        else if (sortType == 4) {
            films = films.sort(yearSort);
        }
        else if (sortType == 5) {
            films = films.sort(yearSort).reverse();
        }
        return genre == 'All' ? films :
            films.filter(film => film.genre1 == genre || film.genre2 == genre || film.genre3 == genre);
    }
);

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        filmsLoaded: areFilmsLoaded(state),
        films: getFilms(state),
        hasContext: state.contextMovieOclcId,
        search: state.search,
        queueContextMovieOclcId: state.queueContextMovieOclcId,
        queueCurrentContextMovieLineNumber: state.queueCurrentContextMovieLineNumber
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        fetchNewSearchTerm: (searchTerm) => dispatch(fetchNewSearchTerm(searchTerm)),
        onScrollScreen: () => dispatch(scrollScreen()),
        openContext: (oclcId, screenshot) => dispatch(openContext(oclcId, screenshot)),
        closeContext: () => dispatch(closeContextDialog()),
        queueContext: (oclcId, screenshot) => dispatch(queueContext(oclcId, screenshot)),
        dequeueContext: () => dispatch(dequeueContext())
    }
}