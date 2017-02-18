import * as React from "react";

import { ConnectedIndividualFilmResults } from "./IndividualFilmResults.jsx";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey50, cyan700, pinkA200, grey800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {ConnectedMetadataDrawer} from './MetadataDrawer.jsx';
import {ConnectedContextDialog} from './ContextDialog.jsx';
import ResultsToolbar from './ResultsToolbar.jsx';

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
                {this.state.status == null || this.state.status == "loading" ? (
                        <div>
                            <h2>Loading Relevant Films...</h2>
                        </div>
                    ) :
                    (
                        <div>
                            <ResultsToolbar />
                            <ConnectedMetadataDrawer />
                            <ConnectedContextDialog />
                            {/*<Graph/>*/}
                            {this.state.response.map(function (object) {
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
    return {
        search: state.search
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