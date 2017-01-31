import * as React from "react";

import { IndividualFilmResults } from "./IndividualFilmResults";

import {IndividualFilmDataI} from "../../ts/Interfaces";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan700, pinkA200, grey800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {ConnectedMetadataDrawer} from './MetadataDrawer';
import ResultsAppBar from './ResultsAppBar';

import {connect} from 'react-redux'


// import {Graph} from "../graphs/Graph";

class AllFilms extends React.Component<any, any> {
    constructor() {
        super();

        this.state = null;
    }

    // This function has been converted to redux down below in fetchNewSearchTerm
    // loadData(pathname: string) {
    //     $.getJSON('http://localhost:8080/moviesearch' + pathname,  (data: FilmResultsDataWrapperI) => {
    //         this.setState({
    //             films: data.results
    //         });
    //     });
    // }

    componentDidMount() {
        this.props.fetchNewSearchTerm();
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.fetchNewSearchTerm();
        }
    }


    render () {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: grey800,
                primary2Color: cyan700,
                primary3Color: pinkA200,
                accent1Color: grey800,
                accent2Color: grey800,
                accent3Color: grey800
            }
        });
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {this.state ? (
                    <div>
                        <ResultsAppBar />
                        <ConnectedMetadataDrawer/>
                        {/*<Graph/>*/}
                        {this.state.films.map(function (object: IndividualFilmDataI) {
                                return <IndividualFilmResults
                                    key={`filmkey${object.movieOclcId}`}
                                    individualFilm={object} />;
                            }
                        )}
                    </div>
                    ):
                    (
                    <div>
                        <h2>Loading Relevant Films...</h2>
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
        return fetch(`http://localhost:8080/moviesearch/${searchTerm}`)
            .then((response:any) => response.json().data)
            .then((response:any) => dispatch(receiveNewSearchTerm(response)));
        // TODO - add catch handler to handle errors
    }
};

// Map Redux state to component props
function mapStateToProps() {
    return {}
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