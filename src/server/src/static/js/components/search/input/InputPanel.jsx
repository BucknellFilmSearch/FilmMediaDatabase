/**
 * This file provides inputs for the user to do a text search.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { cleanStopWords, GENRES } from '../../helpers';
import { FlatButton, IconButton, MenuItem, RaisedButton, SelectField, Slider, TextField } from 'material-ui';
import { Tab, Tabs } from 'material-ui/Tabs';
import HelpIcon from 'material-ui/svg-icons/action/help';
import Dropzone from 'react-dropzone';
import {FileCloudUpload} from 'material-ui/svg-icons';
/**
 * Styling to line up different input options in the text input modal
 */
const styles = {
  tabs: {
    root: {
      textAlign: 'center'
    },
    div: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    mods: {
      display: 'flex',
      justifyContent: 'center',
      width: '80%',
      textAlign: 'center',
      alignItems: 'middle',
      marginBottom: '0px',
      marginTop: '12px'
    }
  },
  slider: {
    height: '30px',
    width: '70%',
    marginBottom: '0px',
    display: 'inline-block'
  },
  input: {
    top: '8px',
    width: '90%'
  },
  dropdown: {
    top: '-4px',
    float: 'left'
  },
  button: {
    float: 'center',
    marginBottom: 8
  }
};
/**
 * Uses Material-UI input components and dropdowns to allow user input for a text based search.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class InputPanel extends React.Component {

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
    this.onDrop = this.onDrop.bind(this);
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
  onSelectSearchType(val) {
    this.setState({ searchType: val });
  }
  handleConfidenceSlider(event, value) {
    this.setState({confidenceSlider: value});
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...
    console.log('add functionality to handle dropping here!');
  }

  render() {
    return (
      <div style={styles.tabs.root} >
        <Tabs
          value={this.state.searchType}
          onChange={this.onSelectSearchType}>
          <Tab label="Find Objects"
            value='object'>
            <div style={styles.tabs.div}>
              <form style={styles.tabs.div} id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                <TextField
                  hintText='Search Phrase'
                  errorText={this.state.errorText}
                  value={this.state.searchText}
                  style={styles.input}
                  onChange={this.handleChange}
                  autoFocus
                  ref='updateSearchBox'
                />
              </form>
              <div style={styles.tabs.mods}>
                <p style={{marginTop: '8px', marginRight: '16px', marginBottom: '0px', width: '30%'}}>
                  <IconButton
                    tooltipPosition='top-center'
                    tooltip='Lower confidence will return more items'
                    iconStyle={{ width: 16, height: 16, color: '#bbb'}}
                  >
                    <HelpIcon />
                  </IconButton>
                  {`Confidence: ${Math.floor(this.state.confidenceSlider * 100)}%`}
                </p>
                <Slider
                  style={styles.slider}
                  value={this.state.confidenceSlider}
                  step={0.05}
                  min={0.4}
                  max={1}
                  onChange={this.handleConfidenceSlider}
                />
              </div>
            </div>
          </Tab>
          <Tab label="Search Dialogue"
              value='text'>
            <div style={styles.tabs.div}>
              <form style={styles.tabs.div} id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                <TextField
                  hintText='Search Phrase'
                  errorText={this.state.errorText}
                  value={this.state.searchText}
                  style={styles.input}
                  onChange={this.handleChange}
                  autoFocus
                  ref='updateSearchBox'
                />
              </form>
              <div style={styles.tabs.mods}>
                <SelectField
                  floatingLabelText='Sort'
                  value={this.props.sortType}
                  onChange={this.props.onSelectSortType}
                  style={styles.dropdown}
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
                  style={styles.dropdown}
                  maxHeight={200}
                >
                  {GENRES.map((genre) => <MenuItem key={genre} value={genre} primaryText={genre} />) }
                </SelectField>
              </div>
            </div>
          </Tab>
          <Tab label="Match Colors"
            value='color'>
            <div style={{...styles.tabs.div, marginTop: '24px', marginBottom: '24px'}}>
              <Dropzone onDrop={this.onDrop} style={{width: '350px', height: '250px', border: '1.5px dashed #ccc', borderRadius: '5px', background: '#fafafa'}}>
                <div style={{...styles.tabs.div, height: '100%'}}>
                <FileCloudUpload style={{width: '48px', height: '48px'}} color={'#ccc'}/>
                <p style={{color: '#ccc'}}>Drag and drop your file here</p>
                </div>
              </Dropzone>
            </div>
        </Tab>
      </Tabs>
      <RaisedButton
        label='Search'
        labelPosition='before'
        primary={true}
        // icon={<SearchIcon style={{verticalAlign: 'middle'}}/>}
        onClick={(event) => this.updateSearch(event)}
        style={styles.button}
      />
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
    enableSort: state.search !== null && state.searchType === 'text',
    currentOclcId: state.currentMovieOclcId,
    searchTerm: state.search !== null && state.search.searchTerm ? state.search.searchTerm : ''
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
