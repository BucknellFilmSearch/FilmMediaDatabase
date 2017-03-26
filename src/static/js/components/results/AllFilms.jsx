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

@connect(mapStateToProps, mapDispatchToProps)
export default class AllFilms extends React.Component {
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
    handleEscape(e) {
        alert('Enter... (KeyPress, use charCode)');
        if (e.charCode == 27) {
            alert('Enter... (KeyPress, use charCode)');
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
                    <ResultsToolbar />
                    <MetadataDrawer firstFilm={this.props.films[0]} />
                    <ContextDialog />
                    {/*<Graph/>*/}
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
        films: getFilms(state)
    }
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        fetchNewSearchTerm: (searchTerm) => dispatch(fetchNewSearchTerm(searchTerm))
    }
}