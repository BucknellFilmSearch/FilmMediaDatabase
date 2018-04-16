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
import { GENRES } from '../../helpers';
import { IconButton, MenuItem, RaisedButton, SelectField, Slider, TextField, AutoComplete } from 'material-ui';
import { Tab, Tabs } from 'material-ui/Tabs';
import HelpIcon from 'material-ui/svg-icons/action/help';
import Dropzone from 'react-dropzone';
import {FileCloudUpload} from 'material-ui/svg-icons';
import { InputPanel as styles } from './styling';
import _ from 'lodash';

/**
 * Uses Material-UI input components and dropdowns to allow user input for a text based search.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class InputPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchType: this.props.searchType || 'object',
      searchText: this.props.searchTerm || '',
      errorText: '',
      confidence: this.props.confidence || 0.8,
      classes: []
    };
    this.updateSearchForEnterKeypress = this.updateSearchForEnterKeypress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUpdateConfidence = this.onUpdateConfidence.bind(this);
    this.onSelectSearchType = this.onSelectSearchType.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {
    fetch(`${window.location.origin}/api/classes`)
    .then(res => res.json())
    .then(res => res.results)
    .then(data => {
      this.setState({
        classes: data
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      confidence: nextProps.confidence
    });
  }

  /**
   * takes the search phrase and returns results in the results page. If they searched for only stop word(s),
   * a warning is displayed and no search is made.
   *
   * @param {object} event The event called by a form for submission
   * @returns {undefined}
   */
  updateSearch(event) {
        // stop default form submission behavior
    event.preventDefault();
    const keywordOrPhrase = encodeURIComponent(this.state.searchText);
    this.setState({searchText: ''});

    // Checks for illegal object
    if (this.state.searchType === 'object' && _.find(this.state.classes, className => className === this.state.searchText) === undefined) {
      this.setState({errorText: `'${this.state.searchText}' is not a recognized object type`});

    // Checks for empty search phrase
    } else if (keywordOrPhrase === '') {
      this.setState({errorText: 'Your search has returned too many results.'});

    // Runs the request
    } else {
      // Send search type to global state if changed
      if (this.state.searchType !== this.props.searchType) {
        this.props.onSelectSearchType(this.state.searchType);
      }

      // Update the confidence level
      if (this.state.confidence !== this.props.confidence) {
        this.props.onUpdateConfidence(this.state.confidence);
      }

            // update the URL
      let newPath = `/${this.state.searchType}/${keywordOrPhrase}?confidence=${this.state.confidence}`;
      hashHistory.push(newPath);
      this.setState({errorText: ''});
      if (this.props.handleClose) {
        this.props.handleClose();
      }
    }
  }
  updateSearchForEnterKeypress(event) {
        // stop default form submission behavior
    event.preventDefault();
    this.updateSearch(event);
  }
  handleChange(newValue) {
    this.setState({searchText: newValue});
  }
  onSelectSearchType(val) {
    this.setState({ searchType: val });
  }
  onUpdateConfidence(event, value) {
    this.setState({confidence: value});
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...
    console.log('add functionality to handle dropping here!');
    console.log(acceptedFiles);
    console.log(rejectedFiles);
  }

  render() {
    return (
      <div style={styles.tab.container} >
        <Tabs
          value={this.state.searchType}
          onChange={this.onSelectSearchType}>
          <Tab label="Find Objects"
            value='object'>
            <div style={styles.tab.div}>
              <form style={styles.tab.div} id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                <AutoComplete
                  searchText={this.state.searchText}
                  dataSource={this.state.classes}
                  hintText='Search Phrase'
                  errorText={this.state.errorText}
                  style={styles.tab.div}
                  fullWidth={true}
                  textFieldStyle={styles.input}
                  filter={AutoComplete.fuzzyFilter}
                  onUpdateInput={this.handleChange}
                  autoFocus
                />
              </form>
              <div style={styles.tab.filter}>
                <p style={styles.slider.description}>
                  <IconButton
                    tooltipPosition='top-center'
                    tooltip='Lower confidence will return more items'
                    iconStyle={{ width: 16, height: 16, color: '#bbb'}}
                  >
                    <HelpIcon />
                  </IconButton>
                  {`Confidence: ${Math.floor(this.state.confidence * 100)}%`}
                </p>
                <Slider
                  style={styles.slider.component}
                  value={this.state.confidence}
                  step={0.05}
                  min={0.4}
                  max={1}
                  onChange={this.onUpdateConfidence}
                />
              </div>
            </div>
          </Tab>
          <Tab label="Search Dialogue"
              value='text'>
            <div style={styles.tab.div}>
              <form style={styles.tab.div} id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                <TextField
                  hintText='Search Phrase'
                  errorText={this.state.errorText}
                  value={this.state.searchText}
                  style={styles.input}
                  onChange={(evt, newText) => this.handleChange(newText)}
                  autoFocus
                />
              </form>
              <div style={styles.tab.filter}>
                <SelectField
                  floatingLabelText='Sort By'
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
            <div style={{...styles.tab.div, marginTop: '24px', marginBottom: '24px'}}>
              <Dropzone onDrop={this.onDrop} style={styles.dropzone.component}>
                <div style={{...styles.tab.div, height: '100%'}}>
                <FileCloudUpload style={styles.dropzone.icon} color={'#ccc'}/>
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
        onClick={(event) => this.updateSearch(event)}
        style={styles.button}
      />
      </div>
    );
  }
}

//=====================//
//       REDUX         //
//=====================//

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
const updateConfidence = (confidence) => {
  return {
    type: 'UPDATE_CONFIDENCE',
    confidence
  };
};
// Map Redux state to component props
function mapStateToProps(state) {
  return {
    confidence: state.confidence,
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
    onUpdateConfidence: (confidence) => dispatch(updateConfidence(confidence)),
    onSelectSearchType: (searchType) => dispatch(selectSearchType(searchType)),
    onSelectSortType: (event, index, sortType) => dispatch(selectSortType(sortType)),
    onSelectGenre: (event, index, genre) => dispatch(selectGenre(genre))
  };
}
