import * as React from "react";

import { IndividualFilmResults } from "./IndividualFilmResults";

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
        if (this.state) {
            return (
                <div>
                    {this.state.films.map(function (object: IndividualFilmDataI) {
                            return <IndividualFilmResults individualFilm={object}/>;
                        }
                    )}
                </div>
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