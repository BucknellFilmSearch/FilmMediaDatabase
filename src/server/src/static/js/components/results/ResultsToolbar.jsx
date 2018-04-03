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
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { createSelector } from 'reselect';
import { GENRES, relevanceSort, alphabeticalSort, yearSort } from '../helpers';
import { IconButton, FlatButton, SelectField, MenuItem } from 'material-ui';
import { ActionSearch, NavigationArrowBack } from 'material-ui/svg-icons';


const selectStyle = {
  width: '160px'
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
      errorText: ''
    };
  }

  /**
   * Jumps to a film that is selected from the dropdown list of films for the current search.
   * @param {event} event The event object from the trigger
   * @param {number} index The index of the item selected
   * @param {string} value The value of the item selected
   * @returns {undefined}
   */
  scrollToMovie(event, index, value) {
    document.getElementsByName(value)[0].scrollIntoView();
  }

  sortFilms() {
    let films = this.props.films.map(film => film);
    return films.sort(relevanceSort);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sortType !== this.props.sortType) {
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    }
  }

  render() {
        // let sortedFilms = this.sortFilms();
    return (
      <Toolbar className="resultsToolbar" style={{height: '72px'}}>
        <ToolbarGroup firstChild={true}>
          <Link to={'/'}>
            <IconButton>
              <NavigationArrowBack color={'#2196f3'} hoverColor={'#1976d2'}/>
            </IconButton>
          </Link>
          {
            (this.props.films.length > 0 || this.props.totalScreenshots === 0) ? (
              <ToolbarTitle
                text={`${this.props.totalScreenshots} Results for '${this.props.searchTerm.replace(/&/g, ' ')}' in ${this.props.films.length} films`}
              />
            ) : null
          }
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <SelectField
            className="chooseAFilm"
            floatingLabelText="Film"
            value={'Films'}
            hintText="Choose a film"
            onChange={this.scrollToMovie}
            style={selectStyle}
          >
            {
              this.props.films.map(film => <MenuItem key={film.movieOclcId} value={film.movieOclcId} primaryText={film.movieTitle} />)}
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
            { GENRES.map((genre) => <MenuItem key={genre} value={genre} primaryText={genre} />) }
          </SelectField>

          <FlatButton
            label="Update Search"
            labelPosition="after"
            icon={<ActionSearch color={'#aaa'} style={{verticalAlign: 'middle'}}/>}
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
    type: 'SELECT_SORT_TYPE',
    sortType
  };
};

const selectGenre = (genre) => {
  return {
    type: 'SELECT_GENRE',
    genre
  };
};

const getSearch = (state) => state.search;
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

const getTotalScreenshots = createSelector(
    [getSearch, getFilms],
    (search, films) => search && search.status === 'loading' ? 'Loading' :
        films.reduce((totalScreenshots, film) => totalScreenshots + film.results.length, 0)
);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    sortType: state.sortType,
    genre: state.genre,
    films: getFilms(state),
    enableSort: state.search !== null && state.search.searchType === 'text',
    currentOclcId: state.currentMovieOclcId,
    searchTerm: state.search !== null && state.search.searchTerm ? state.search.searchTerm : '',
    totalScreenshots: getTotalScreenshots(state)
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onSelectSortType: (event, index, sortType) => dispatch(selectSortType(sortType)),
    onSelectGenre: (event, index, genre) => dispatch(selectGenre(genre))
  };
}
