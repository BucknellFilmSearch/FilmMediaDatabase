import * as React from "react";

import * as $ from "jquery";

import { IndividualFilmResults } from "./IndividualFilmResults";

import {FilmResultsDataWrapperI, IndividualFilmDataI} from "../../ts/Interfaces";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan700, pinkA200, grey800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {MetadataDrawer} from './MetadataDrawer';
import ResultsAppBar from './ResultsAppBar';


// import {Graph} from "../graphs/Graph";

export class AllFilms extends React.Component<any, any> {
    constructor() {
        super();

        this.state = null;
    }

    loadData(pathname: string) {
        $.getJSON('http://localhost:8080/moviesearch' + pathname,  (data: FilmResultsDataWrapperI) => {
            this.setState({
                films: data.results
            });
        });
    }

    componentDidMount() {
        this.loadData(this.props.location.pathname);
    }


       // TODO - implement this method in case new search terms are submitted and this component needs to rerendered
    componentWillReceiveProps(nextProps: any) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.loadData(nextProps.props.location.pathname);
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
                        <MetadataDrawer/>
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