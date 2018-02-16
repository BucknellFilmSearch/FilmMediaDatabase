/**
 * This file generates the toolbar that is the top of the search results view. It is used in
 * the render function of AllFilms.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from "react-router";
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import {createSelector} from 'reselect';
import {STOP_WORDS, GENRES, relevanceSort, alphabeticalSort, yearSort} from '../helpers';


const selectStyle = {
    width: '160px'
};

const inputFieldStyle = {
    width: '150px',
    float: 'left'
};

const SearchIcon = (props) => {
    return (
        <svg {...props} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );
};


/**
 * Uses the toolbar component in Material-UI to generate a toolbar with options to sort, filter, jump to a film,
 * and perform new searches. Connects to the Redux store for information about the current search and sort status.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ResultsToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            errorText: '',
        };
        this.updateSearchForEnterKeypress = this.updateSearchForEnterKeypress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static cleanStopWords(input) {
        let splitString = input.toLowerCase().split(' ');
        let buildString = '';
        for (let i = 0; i < splitString.length; i++) {
            if (!(STOP_WORDS.includes(splitString[i]))) {
                // If it is the first non stop word
                if (buildString == '') {
                    buildString = splitString[i];
                }
                // If it is a middle non stop word or last non stop word
                else {
                    buildString = buildString + ' ' + splitString[i];
                }
            }
        }
        return buildString;
    }

    updateSearch(event) {
        // stop default form submission behavior
        event.preventDefault();

        let keywordOrPhrase = this.refs["updateSearchBox"].getValue();
        keywordOrPhrase = ResultsToolbar.cleanStopWords(keywordOrPhrase);

        this.setState({searchText: ''});

        if (keywordOrPhrase != '') {
            // update the URL
            let newPath = `/${keywordOrPhrase.replace(/ /g, '&').replace('!', '').replace('?', '')}`;
            hashHistory.push(newPath);
            this.state.errorText = '';
        }
        else {
            this.state.errorText = "Too many results, try again.";
        }
    }

    /**
     * Jumps to a film that is selected from the dropdown list of films for the current search.
     */
    scrollToMovie(event, index, value) {
        document.getElementsByName(value)[0].scrollIntoView();
    };


    updateSearchForEnterKeypress(event) {

        // stop default form submission behavior
        event.preventDefault();

        this.updateSearch(event);
    }

    handleChange(event, newValue) {
        this.setState({searchText: newValue});
    }

    sortFilms() {
        let films = this.props.films.map(film => film);
        return films.sort(relevanceSort);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.sortType != this.props.sortType) {
            window.scrollTo(0,1);
            window.scrollTo(0,0);
        }
    }

    render() {
        // let sortedFilms = this.sortFilms();
        return (
            <Toolbar className="resultsToolbar" style={{height:'72px'}}>
                <ToolbarGroup firstChild={true}>
                    <Link to={"/"}><FlatButton label="Home" /></Link>
                    {(this.props.films.length > 0 || this.props.totalScreenshots == 0) ? (
                        <ToolbarTitle
                            text={`${this.props.totalScreenshots} Results for '${this.props.searchTerm.replace(/&/g, ' ')}' in ${this.props.films.length} films`}/>
                    ) : null
                    }
                    
                    
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    <SelectField
                        className="chooseAFilm"
                        floatingLabelText="Film"
                        value={"Films"}
                        hintText="Choose a film"
                        onChange={this.scrollToMovie}
                        style={selectStyle}
                    >
                        {this.props.films.map(film => <MenuItem key={film.movieOclcId} value={film.movieOclcId} primaryText={film.movieTitle} />)}
                    </SelectField>

                    <SelectField
                        floatingLabelText="Sort"
                        value={this.props.sortType}
                        onChange={this.props.onSelectSortType}
                        style={selectStyle}
                        disabled={!this.props.enableSort}
                    >
                        <MenuItem value={1} primaryText="Relevance" />
                        <MenuItem value={2} primaryText="Movie Title (A-Z)" />
                        <MenuItem value={3} primaryText="Movie Title (Z-A)" />
                        <MenuItem value={4} primaryText="Year (New to Old)" />
                        <MenuItem value={5} primaryText="Year (Old to New)" />
                    </SelectField>

                    <SelectField
                        floatingLabelText="Genre"
                        value={this.props.genre}
                        onChange={this.props.onSelectGenre}
                        style={selectStyle}
                    >
                        {GENRES.map((genre, index) => <MenuItem key={genre} value={genre} primaryText={genre} />) }
                    </SelectField>

                    <FlatButton
                        label="Update Search"
                        labelPosition="after"
                        icon={<SearchIcon style={{verticalAlign: 'middle'}}/>}
                        onClick={(event) => this.props.openSearchModal(event)}
                        secondary={true}
                    />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const selectSortType = (sortType) => {
    return {
        type: "SELECT_SORT_TYPE",
        sortType
    }
};

const selectGenre = (genre) => {
    return {
        type: "SELECT_GENRE",
        genre
    }
};

const getSearch = (state) => state.search;
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

const getTotalScreenshots = createSelector(
    [getSearch, getFilms],
    (search, films) => search && search.status == "loading" ? "Loading" :
        films.reduce((totalScreenshots, film) => totalScreenshots + film.results.length, 0)
);

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        sortType: state.sortType,
        genre: state.genre,
        films: getFilms(state),
        enableSort: state.search != null && state.search.searchType == "text",
        currentOclcId: state.currentMovieOclcId,
        searchTerm: state.search != null && state.search.searchTerm ? state.search.searchTerm : '',
        totalScreenshots: getTotalScreenshots(state)
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onSelectSortType: (event, index, sortType) => dispatch(selectSortType(sortType)),
        onSelectGenre: (event, index, genre) => dispatch(selectGenre(genre))
    }
}
