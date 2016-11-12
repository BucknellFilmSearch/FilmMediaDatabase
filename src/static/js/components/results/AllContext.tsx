import * as React from "react";

import {IndividualFilmResults} from "./IndividualFilmResults";

export class AllContext extends React.Component<any, any> {
    constructor() {
        super();

        this.state = null;
    }

    loadData(pathname: string) {
        $.getJSON('http://localhost:8080/moviesearch' + pathname,  (data: any) => {
            this.state = {
                // get only the first element because only one film is returned for context
                context: data.results[0]
            };
            console.log(this.state.context);
            // TODO - move this up so that a parent component delegates rendering to a child component
            this.forceUpdate();
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
                <div className="list-group">
                    <IndividualFilmResults individualFilm={this.state.context} fromContext={true} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <h2>Loading Context...</h2>
                </div>
            )
        }

    }
}