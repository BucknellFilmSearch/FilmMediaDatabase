import * as React from "react";

import { Link, hashHistory } from 'react-router'

let GENRES = ["Action", "Thriller", "Comedy", "Family", "Adventure", "Mystery", "Romance", "Sci-Fi", "Horror",
    "Drama", "Biography", "Fantasy", "Crime", "War", "Animation", "History", "Musical"];

let EARLIEST_RELEASE_YEAR = "1996";
let LATEST_RELEASE_YEAR = "2016";

export class InputForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    /**
     * Retrieve form data and push the new URL to the router
     * @param event Used to prevent default form submission behavior
     */
    handleFormSubmission(event) {

        // stop default form submission behavior
        event.preventDefault();

        // get the form data
        var keywordOrPhrase = this.refs["keywordOrPhrase"]["value"];
        var genre = this.refs["genre"]["value"];
        var earliestReleaseYear = this.refs["earliestReleaseYear"]["value"] || EARLIEST_RELEASE_YEAR;
        var latestReleaseYear = this.refs["latestReleaseYear"]["value"] || LATEST_RELEASE_YEAR;

        // TODO - sanitize url and allow for multiple word search phrase

        // update the URL
        var newPath = `/${keywordOrPhrase}/${genre}/${earliestReleaseYear}/${latestReleaseYear}`;
        hashHistory.push(newPath);
    }


    render() {
        // TODO - make sure user types something into the search box
        return (
            <form id="searchCriteria" onSubmit={this.handleFormSubmission}>
                <input onChange={ (e) => this.setState({ keywordOrPhrase: e.target.value }) }
                       ref="keywordOrPhrase" type="text" placeholder="Keyword/phrase..." required/>
                <br />
                Limit results to a specific genre:
                <select defaultValue="All" ref="genre">
                    <option value="All">All Genres</option>
                    { GENRES.map( value => <option key={`$option${value}`} value={value}>{value}</option> ) }
                </select>
                <br />
                Limit results to movies originally released between:
                <br />

                <input ref="earliestReleaseYear" type="number" placeholder={EARLIEST_RELEASE_YEAR} min={EARLIEST_RELEASE_YEAR} max={LATEST_RELEASE_YEAR} />
                and
                <input ref="latestReleaseYear" type="number" placeholder={LATEST_RELEASE_YEAR} min={EARLIEST_RELEASE_YEAR} max={LATEST_RELEASE_YEAR} />
                <br />


                {/*
                    TODO - add onclick event that sends form data using AJAX $ajaxSubmit or similar
                    more information: http://stackoverflow.com/questions/1960240/jquery-ajax-submit-form
                    or use react router form
                    https://github.com/insin/react-router-form
                    http://stackoverflow.com/questions/31079158/how-to-handle-post-request-in-isomorphic-react-react-router-application
                    https://github.com/ReactTraining/react-router/blob/c3cd9675bd8a31368f87da74ac588981cbd6eae7/examples/auth-flow/app.js
                    https://facebook.github.io/react/docs/refs-and-the-dom.html
                 */}

                <input type="submit" className="btn btn-primary" value="Search" />
            </form>

        )
    }
}