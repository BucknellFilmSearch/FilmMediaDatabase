import * as React from "react";

import { ConnectedIndividualFilmResults } from "./IndividualFilmResults.jsx";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey50, cyan700, pinkA200, grey800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {ConnectedMetadataDrawer} from './MetadataDrawer.jsx';
import {ConnectedContextDialog} from './ContextDialog.jsx';
import {ConnectedResultsToolbar} from './ResultsToolbar.jsx';

import {connect} from 'react-redux'

class AllFilms extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchNewSearchTerm(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.fetchNewSearchTerm(nextProps.location.pathname);
        }
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
                    <ConnectedResultsToolbar />
                    <ConnectedMetadataDrawer />
                    <ConnectedContextDialog />
                    {/*<Graph/>*/}
                    {!this.props.filmsLoaded ? (
                            <div style={{paddingTop: '60px'}}>
                                <h2>Loading Relevant Films...</h2>
                            </div>
                        ) :
                        this.props.films.map(function (object) {
                                return <ConnectedIndividualFilmResults
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

export const requestNewSearchTerm = (searchTerm) => {
    return {
        type: 'REQUEST_NEW_SEARCH_TERM',
        searchTerm
    }
};

const receiveNewSearchTerm = (response) => {
    return {
        type: 'RECEIVE_NEW_SEARCH_TERM',
        response
    }
};

const fetchNewSearchTerm = (searchTerm) => {
    console.log('searchTerm');
    console.log(searchTerm);
    return (dispatch) => {
        dispatch(requestNewSearchTerm(searchTerm.slice(1)));
        return fetch(`http://localhost:8080/moviesearch${searchTerm}`)
            .then(response => response.json())
            .then(response => dispatch(receiveNewSearchTerm(response.results)));
        // TODO - add catch handler to handle errors
    }
};

// Map Redux state to component props
function mapStateToProps(state) {
    let filmsLoaded = state.search && state.search.status == "loaded";

    let films = filmsLoaded ? [...state.search.response] : [] ;

    // check if films are loaded
    if (filmsLoaded) {

        // sort films based on user input
        if (state.sortType == 1) {
            films = films.sort(relevanceSort);
        }
        else if (state.sortType == 2) {
            films = films.sort(alphabeticalSort);
        }
        else if (state.sortType == 3) {
            films = films.sort(alphabeticalSort).reverse();
        }
        else if (state.sortType == 4) {
            films = films.sort(yearSort);
        }
        else if (state.sortType == 5) {
            films = films.sort(yearSort).reverse();
        }

        // filter films by genre
        let genre = state.genre;

        films = genre == 'All' ? films :
            films.filter(film => film.genre1 == genre || film.genre2 == genre || film.genre3 == genre);
    }


    return {
        filmsLoaded: filmsLoaded,
        films: films,
        sortType: state.sortType,
        genre: state.genre
    }
}

function relevanceSort(a, b) {
    if (a.results.length > b.results.length) {
        return -1;
    }
    else if (a.results.length < b.results.length) {
        return 1;
    }
    else {
        return 0;
    }
}

function alphabeticalSort(a, b) {
    return a.movieTitle.localeCompare(b.movieTitle);
}

function yearSort(a, b) {
    if (a.movieReleaseYear > b.movieReleaseYear) {
        return -1;
    }
    else if (a.movieReleaseYear < b.movieReleaseYear) {
        return 1;
    }
    else {
        return 0;
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        fetchNewSearchTerm: (searchTerm) => dispatch(fetchNewSearchTerm(searchTerm))
    }
}

export const ConnectedAllFilms = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllFilms);