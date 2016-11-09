import * as React from "react";

import { IndividualFilmResults } from "./IndividualFilmResults";

export class AllFilms extends React.Component<any, any> {
    constructor() {
        super();

        this.state = null;
    }

    loadData() {
        $.getJSON('http://localhost:8080/moviesearch/phone/All/1996/2016/1',  (data: FilmResultsDataWrapperI) => {
            this.state = {
                films: data.results
            };

            // TODO - move this up so that a parent component delegates rendering to a child component
            this.forceUpdate();
        });
    }

    componentDidMount() {
        this.loadData();
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
                    <h2>Loading...</h2>
                </div>
            )
        }

    }
}