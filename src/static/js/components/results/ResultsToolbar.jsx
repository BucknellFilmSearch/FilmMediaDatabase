import * as React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from "react-router";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';


class ResultsToolbar extends React.Component {

    render() {
        return (
            <Toolbar className="resultsToolbar">
                <ToolbarGroup firstChild={true}>
                    <Link to={"/"}><FlatButton label="Home" /></Link>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="Search Results" />
                    <SelectField
                        floatingLabelText="Sort"
                        value={this.props.sortType}
                        onChange={this.props.onSelectSortType}
                    >
                        <MenuItem value={1} primaryText="Relevance" />
                        <MenuItem value={2} primaryText="A-Z" />
                        <MenuItem value={3} primaryText="Z-A" />
                        <MenuItem value={4} primaryText="Year (High to Low)" />
                        <MenuItem value={5} primaryText="Year (Low to High)" />
                    </SelectField>

                    <RaisedButton label="Filter" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}


const selectSortType = (sortType) => {
    console.log('new sort type');
    console.log(sortType);
    return {
        type: "SELECT_SORT_TYPE",
        sortType
    }
};


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        sortType: state.sortType
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onSelectSortType: (event, index, sortType) => dispatch(selectSortType(sortType))
    }
}

export const ConnectedResultsToolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsToolbar);