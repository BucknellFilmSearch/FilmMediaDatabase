/**
 * This file provides inputs for the user to do a text search.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */
import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import {cleanStopWords, GENRES} from '../helpers';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
/**
 * Styling to line up different input options in the text input modal
 */
const modalStyle = {
  textAlign: 'center'
};
const modalDivStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};
const inputStyle = {
  top: '8px',
  width: '90%'
};
const sortStyle = {
  top: '-4px',
  width: '20%',
  float: 'left'
};
const searchStyle = {
  top: '-4px',
  width: '20%',
  float: 'left'
};
const buttonStyle = {
  float: 'center',
  marginBottom: 8
};
/**
 * Constant for rendering a Search Icon for the 'Search' flat button
 */
const SearchIcon = (props) => {
  return (
    <svg {...props} fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/>
      <path d='M0 0h24v24H0z' fill='none'/>
    </svg>
  );
};
/**
 * Uses Material-UI input components and dropdowns to allow user input for a text based search.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class TextInputModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchType: this.props.searchType || 'object',
      searchText: '',
      errorText: '',
      confidenceSlider: 0.8
    };
    // this.handleClose =  this.props.closeFcn.bind(this);
    this.updateSearchForEnterKeypress = this.updateSearchForEnterKeypress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfidenceSlider = this.handleConfidenceSlider.bind(this);
    this.onSelectSearchType = this.onSelectSearchType.bind(this);
  }
    /**
     * takes the search phrase and returns results in the results page. If they searched for only stop word(s),
     * a warning is displayed and no search is made.
     */
  updateSearch(event) {
        // stop default form submission behavior
    event.preventDefault();
    let keywordOrPhrase = this.refs.updateSearchBox.getValue();
    keywordOrPhrase = cleanStopWords(keywordOrPhrase);
    this.setState({searchText: ''});
    if (keywordOrPhrase === '') {
      this.state.errorText = 'Your search has returned too many results.';
    } else {
            // Send search type to global state if changed
      if (this.state.searchType !== this.props.searchType) {
        console.log('Pushing new search type to global state');
        this.props.onSelectSearchType(this.state.searchType);
      }
            // update the URL
      let newPath = `/${this.state.searchType}/${keywordOrPhrase.replace(/ /g, '&').replace('!', '').replace('?', '')}`;
      console.log(newPath);
      hashHistory.push(newPath);
      this.setState({errorText: ''});
            // this.state.errorText = '';
      this.handleClose();
    }
  }
  updateSearchForEnterKeypress(event) {
        // stop default form submission behavior
    event.preventDefault();
    this.updateSearch(event);
  }
  handleChange(event, newValue) {
    this.setState({searchText: newValue});
  }
  handleClose() {
    this.setState({ errorText: '' });
    this.props.closeFcn();
  }
  onSelectSearchType(val) {
    this.setState({ searchType: val });
  }
  handleConfidenceSlider(event, value) {
    this.setState({confidenceSlider: value});
  }

  render() {
    return (
      <div id='textIconImage' className='hoverHighlight' >
        <Dialog
          style={modalStyle}
          bodyStyle={{padding: 0}}
          modal={false}
          open={this.props.open}
          autoScrollBodyContent={true}
          onRequestClose={() => this.handleClose()}
        >
          <Tabs
            value={this.state.searchType}
            onChange={this.onSelectSearchType}>
            <Tab label="Object"
              value='object'>
              <div style={modalDivStyle}>
                <form style={modalDivStyle} id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                  <TextField
                    hintText='Search Phrase'
                    errorText={this.state.errorText}
                    value={this.state.searchText}
                    style={inputStyle}
                    onChange={this.handleChange}
                    autoFocus
                    ref='updateSearchBox'
                  />
                </form>
                <div style={{display: 'inline-block', width: '100%'}}>
                  <Slider style={{width: '70%'}} value={this.state.confidenceSlider} step={0.05} min={0.4} max={1} onChange={this.handleConfidenceSlider} />
                  {`${this.state.confidenceSlider * 100}%`}
                </div>
                <FlatButton
                  label='Search'
                  labelPosition='before'
                  primary={true}
                  // icon={<SearchIcon style={{verticalAlign: 'middle'}}/>}
                  onClick={(event) => this.updateSearch(event)}
                  style={buttonStyle}
                />
              </div>
            </Tab>
            <Tab label="Text"
                value='text'>
              <div style={modalDivStyle}>
              <form style={{width: '100%'}} id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                <TextField
                  hintText='Search Phrase'
                  errorText={this.state.errorText}
                  value={this.state.searchText}
                  style={inputStyle}
                  onChange={this.handleChange}
                  autoFocus
                  ref='updateSearchBox'
                />
              </form>
              <SelectField
                floatingLabelText='Sort'
                value={this.props.sortType}
                onChange={this.props.onSelectSortType}
                style={sortStyle}
              >
                <MenuItem value={1} primaryText='Relevance' />
                <MenuItem value={2} primaryText='Movie Title (A-Z)' />
                <MenuItem value={3} primaryText='Movie Title (Z-A)' />
                <MenuItem value={4} primaryText='Year (New to Old)' />
                <MenuItem value={5} primaryText='Year (Old to New)' />
              </SelectField>
              <SelectField
                floatingLabelText='Genre'
                value={this.props.genre}
                onChange={this.props.onSelectGenre}
                style={sortStyle}
                maxHeight={200}
              >
                {GENRES.map((genre, index) => <MenuItem key={genre} value={genre} primaryText={genre} />) }
              </SelectField>
              </div>
              <div style={modalDivStyle}>
                <FlatButton
                  label='Search'
                  labelPosition='before'
                  primary={true}
                  // icon={<SearchIcon style={{verticalAlign: 'middle'}}/>}
                  onClick={(event) => this.updateSearch(event)}
                  style={buttonStyle}
                />
              </div>
            </Tab>
            <Tab label="Color"
              value='color'>
              <div style={modalDivStyle}>
              <form id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                <TextField
                  hintText='Search Phrase'
                  errorText={this.state.errorText}
                  value={this.state.searchText}
                  style={inputStyle}
                  onChange={this.handleChange}
                  autoFocus
                  ref='updateSearchBox'
                />
              </form>
              <SelectField
                floatingLabelText='Sort'
                value={this.props.sortType}
                onChange={this.props.onSelectSortType}
                style={sortStyle}
              >
                <MenuItem value={1} primaryText='Relevance' />
                <MenuItem value={2} primaryText='Movie Title (A-Z)' />
                <MenuItem value={3} primaryText='Movie Title (Z-A)' />
                <MenuItem value={4} primaryText='Year (New to Old)' />
                <MenuItem value={5} primaryText='Year (Old to New)' />
              </SelectField>
              <SelectField
                floatingLabelText='Genre'
                value={this.props.genre}
                onChange={this.props.onSelectGenre}
                style={sortStyle}
                maxHeight={200}
              >
                {GENRES.map((genre, index) => <MenuItem key={genre} value={genre} primaryText={genre} />) }
              </SelectField>
              </div>
              <div style={modalDivStyle}>
                <FlatButton
                  label='Search'
                  labelPosition='before'
                  primary={true}
                  // icon={<SearchIcon style={{verticalAlign: 'middle'}}/>}
                  onClick={(event) => this.updateSearch(event)}
                  style={buttonStyle}
                />
              </div>
          </Tab>
        </Tabs>
      </Dialog>
      </div>
    );
  }
}
/**
 * Handles Redux for searches
 */
const selectSearchType = (searchType) => {
  return {
    type: 'SELECT_SEARCH_TYPE',
    searchType
  };
};
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
// Map Redux state to component props
function mapStateToProps(state) {
  return {
    searchType: state.searchType,
    sortType: state.sortType,
    genre: state.genre,
    enableSort: state.search != null && state.searchType == 'text',
    currentOclcId: state.currentMovieOclcId,
    searchTerm: state.search != null && state.search.searchTerm ? state.search.searchTerm : ''
  };
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onSelectSearchType: (searchType) => dispatch(selectSearchType(searchType)),
    onSelectSortType: (event, index, sortType) => dispatch(selectSortType(sortType)),
    onSelectGenre: (event, index, genre) => dispatch(selectGenre(genre))
  };
}
