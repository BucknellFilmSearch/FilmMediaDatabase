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

        this.state = {
            "status": null
        };
    }

    componentDidMount() {
        this.props.fetchNewSearchTerm();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.fetchNewSearchTerm();
        }

        if (nextProps.search !== undefined) {
            this.setState(
                nextProps.search
            )
        }
        console.log(nextProps);
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
                {this.props.search == null || this.props.search.status == "loading" ? (
                        <div>
                            <h2>Loading Relevant Films...</h2>
                        </div>
                    ) :
                    (
                        <div>
                            <ConnectedResultsToolbar />
                            <ConnectedMetadataDrawer />
                            <ConnectedContextDialog />
                            {/*<Graph/>*/}
                            {this.props.search.response.map(function (object) {
                                    return <ConnectedIndividualFilmResults
                                        key={`filmkey${object.movieOclcId}`}
                                        individualFilm={object} />;
                                }
                            )}
                        </div>
                    )
                }
            </MuiThemeProvider>
        );
    }
}

export const requestNewSearchTerm = () => {
    return {
        type: 'REQUEST_NEW_SEARCH_TERM'
    }
};

const receiveNewSearchTerm = (response) => {
    return {
        type: 'RECEIVE_NEW_SEARCH_TERM',
        response
    }
};

const fetchNewSearchTerm = (searchTerm) => {
    return (dispatch) => {
        dispatch(requestNewSearchTerm());
        return fetch(`http://localhost:8080/moviesearch${searchTerm}`)
            .then(response => response.json())
            .then(response => dispatch(receiveNewSearchTerm(response.results)));
        // TODO - add catch handler to handle errors
    }
};

// Map Redux state to component props
function mapStateToProps(state) {
    console.log('resorting');
    console.log('sortType:');
    console.log(state.sortType);

    let search = state.search;

    if (search && search.status == "loaded") {
        if (state.sortType == 1) {
            search.response = search.response.sort(relevanceSort);
        }
        else if (state.sortType == 2) {
            search.response = search.response.sort(alphabeticalSort);
        }
        else if (state.sortType == 3) {
            search.response = search.response.sort(alphabeticalSort).reverse();
        }
        else if (state.sortType == 4) {
            search.response = search.response.sort(yearSort);
        }
        else if (state.sortType == 5) {
            search.response = search.response.sort(yearSort).reverse();
        }
    }

    return {
        search: search,
        sortType: state.sortType
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
function mapDispatchToProps(dispatch, props) {
    return {
        fetchNewSearchTerm: () => dispatch(fetchNewSearchTerm(props.location.pathname))
    }
}

export const ConnectedAllFilms = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllFilms);