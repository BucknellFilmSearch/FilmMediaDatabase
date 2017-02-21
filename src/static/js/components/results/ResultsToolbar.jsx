import * as React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from "react-router";
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';

const GENRES = ["All", "Action", "Thriller", "Comedy", "Family", "Adventure", "Mystery", "Romance", "Sci-Fi", "Horror",
    "Drama", "Biography", "Fantasy", "Crime", "War", "Animation", "History", "Musical"];

const selectStyle = {
    width: '150px'
};

class ResultsToolbar extends React.Component {

    render() {
        return (
            <Toolbar className="resultsToolbar">
                <ToolbarGroup firstChild={true}>
                    <Link to={"/"}><FlatButton label="Home" /></Link>
                    <ToolbarTitle text="Search Results" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <SelectField
                        floatingLabelText="Film"
                        value={this.props.currentOclcId}
                        onChange={console.log}
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
                        <MenuItem value={2} primaryText="A-Z" />
                        <MenuItem value={3} primaryText="Z-A" />
                        <MenuItem value={4} primaryText="Year (High to Low)" />
                        <MenuItem value={5} primaryText="Year (Low to High)" />
                    </SelectField>

                    <SelectField
                        floatingLabelText="Genre"
                        value={this.props.genre}
                        onChange={this.props.onSelectGenre}
                        style={selectStyle}
                    >
                        {GENRES.map((genre, index) => <MenuItem key={genre} value={genre} primaryText={genre} />) }
                    </SelectField>

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


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        sortType: state.sortType,
        genre: state.genre,
        films: state.search != null && state.search.status == "loaded" ? state.search.response : null,
        enableSort: state.search != null && state.search.searchType == "text",
        currentOclcId: state.currentMovieOclcId
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onSelectSortType: (event, index, sortType) => dispatch(selectSortType(sortType)),
        onSelectGenre: (event, index, genre) => dispatch(selectGenre(genre))
    }
}

export const ConnectedResultsToolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsToolbar);