import * as React from 'react';
import { Link } from "react-router";
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {createSelector} from 'reselect';
import Dialog from 'material-ui/Dialog';

const GENRES = ["All", "Action", "Thriller", "Comedy", "Family", "Adventure", "Mystery", "Romance", "Sci-Fi", "Horror",
    "Drama", "Biography", "Fantasy", "Crime", "War", "Animation", "History", "Musical"];

const modalStyle = {
    textAlign: 'center'
};

const sortStyle = {
    height: '71px',
    top: '18px',
    width: '20%'
};

const inputStyle = {
    width: '50%'
};

const SearchIcon = (props) => {
    return (
        <svg {...props} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );
};


@connect(mapStateToProps, mapDispatchToProps)
export default class TextInputModal extends React.Component {


    constructor() {
        super();

        this.state = {
            open: false,
            searchText: ''
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateSearchForEnterKeypress = this.updateSearchForEnterKeypress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    updateSearch() {
        // stop default form submission behavior
        event.preventDefault();

        let keywordOrPhrase = this.refs["updateSearchBox"].getValue();

        this.setState({searchText: ''});

        // update the URL
        let newPath = `/${keywordOrPhrase.replace(/ /g, '&').replace('!','').replace('?','')}`;
        hashHistory.push(newPath);
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    updateSearchForEnterKeypress(event) {

        // stop default form submission behavior
        event.preventDefault();

        this.updateSearch();
    }

    handleChange(event, newValue) {
        this.setState({searchText: newValue});
    }



    render() {

        // Actions for the text box modal
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Search"
                labelPosition="before"
                primary={true}
                icon={<SearchIcon style={{verticalAlign: 'middle'}}/>}
                onClick={() => this.updateSearch()}
            />
        ];


        return (
                <div>
                    <img src="/static/imageFiles/textIcon.jpg" onTouchTap={this.handleOpen}></img>

                    <Dialog
                        actions={actions}
                        style={modalStyle}
                        modal={false}
                        open={this.state.open}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleClose}
                    >
                        <form id='textForm' onSubmit={this.updateSearchForEnterKeypress}>
                            <TextField
                                hintText="Search Phrase"
                                value={this.state.searchText}
                                style={inputStyle}
                                onChange={this.handleChange}
                                ref="updateSearchBox"
                            />
                        </form>

                        <SelectField
                        floatingLabelText="Sort"
                        value={this.props.sortType}
                        onChange={this.props.onSelectSortType}
                        style={sortStyle}
                        >
                            <MenuItem value={1} primaryText="Relevance" />
                            <MenuItem value={2} primaryText="Movie Title (A-Z)" />
                            <MenuItem value={3} primaryText="Movie Title (Z-A)" />
                            <MenuItem value={4} primaryText="Year (High to Low)" />
                            <MenuItem value={5} primaryText="Year (Low to High)" />
                        </SelectField>

                        <SelectField
                            floatingLabelText="Genre"
                            value={this.props.genre}
                            onChange={this.props.onSelectGenre}
                            style={sortStyle}
                            maxHeight={200}
                        >
                            {GENRES.map((genre, index) => <MenuItem key={genre} value={genre} primaryText={genre} />) }
                        </SelectField>


                    </Dialog>
                </div>
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

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        sortType: state.sortType,
        genre: state.genre,
        enableSort: state.search != null && state.search.searchType == "text",
        currentOclcId: state.currentMovieOclcId,
        searchTerm: state.search != null && state.search.searchTerm ? state.search.searchTerm : ''
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onSelectSortType: (event, index, sortType) => dispatch(selectSortType(sortType)),
        onSelectGenre: (event, index, genre) => dispatch(selectGenre(genre))
    }
}
