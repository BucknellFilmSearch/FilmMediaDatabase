import * as React from "react";

import * as $ from "jquery";

import { IndividualFilmResults } from "./IndividualFilmResults";

import {FilmResultsDataWrapperI, IndividualFilmDataI} from "../../ts/Interfaces";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


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
                accent1Color: deepOrange500
            }
        });

        if (this.state) {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        {/*<Graph/>*/}
                        {this.state.films.map(function (object: IndividualFilmDataI) {
                                return <IndividualFilmResults
                                    key={`filmkey${object.movieOclcId}`}
                                    individualFilm={object} />;
                            }
                        )}
                    </div>
                </MuiThemeProvider>
            );
        }
        else {
            return (
                <div>
                    <h2>Loading Relevant Films...</h2>
                </div>
            )
        }
    }
}