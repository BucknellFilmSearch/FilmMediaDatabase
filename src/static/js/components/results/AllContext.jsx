import * as React from "react";

// import * as $ from "jquery";

import {IndividualFilmResults} from "./IndividualFilmResults.jsx";

export class AllContext extends React.Component {
    constructor() {
        super();

        this.state = null;
    }

    loadData(pathname) {
        // $.getJSON('http://localhost:8080/moviesearch' + pathname,  (data: IndividualFilmDataI) => {
        //     this.setState({
        //         // get only the first element because only one film is returned for context
        //         context: data.results[0]
        //     });
        //     console.log(this.state.context);
        // });
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