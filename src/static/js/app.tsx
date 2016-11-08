/// <reference path="ts/require.d.ts"/>
/// <reference path="ts/react.d.ts" />
/// <reference path="ts/react-dom.d.ts" />
/// <reference path="ts/jquery.d.ts" />
/// <reference path="ts/Interfaces.d.ts" />
/// <reference path="ts/react-router.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="react" />
/// <amd-dependency path="react-dom" />
/// <amd-dependency path="react-router" />

import $ = require("jquery");
import React = require("react");
import ReactDOM = require("react-dom");

import { Router, Route, Link, hashHistory } from 'react-router'


import { ScreenshotWithCaption } from "components/ScreenshotWithCaption";

export let DEBUG_MODE:boolean = true;

var GENRES = ["Action", "Thriller", "Comedy", "Family", "Adventure", "Mystery", "Romance", "Sci-Fi", "Horror",
    "Drama", "Biography", "Fantasy", "Crime", "War", "Animation", "History", "Musical"];

var InputForm = React.createClass({
    render: function() {
        return (
            <div>
                <input name="keywordOrPhrase" type="text" value="phone" placeholder ="Keyword/phrase..." required
                       oninvalid="this.setCustomValidity('A keyword or phrase is required')"
                       oninput="setCustomValidity('')"/>
                <br />
                Limit results to a specific genre:
                <select name="genre">
                    {GENRES.map(function(value, index)
                        {return (
                            index == 0 ? <option selected={"selected"} value="All">All Genres</option> :
                                <option value={value}>{value}</option>
                        )}
                    )}
                </select>
                <br />
                Limit results to movies originally released between:
                <br />

                <input name="earliestReleaseYear" type="number" placeholder="1996" min="1996" max="2016" />
                and
                <input name="latestReleaseYear" type="number" placeholder="2016" min="1996" max="2016" />
                <br />
                {/*<input value="Search" type="submit" />*/}
                <Link to={"/phone/All/1996/2016/1"} >Search</Link>
            </div>

        )
    },

    componentDidMount: function() {
        // create event listener
        // $("input[value='Search']").on('click', function(){
        //     // TODO - use form data to actually render results input
        //     ReactDOM.render(
        //         <AllFilms />,
        //         document.getElementById('appContainer')
        //     );
        //
        //     $("#inputForm").remove();
        // });
    },

    componentWillUnmount: function() {
        // remove event listener
        // $("input[value='search']").off('click');
    }

});

var SearchContainer = React.createClass({
    render: function() {
        var containerStyle = {
            "text-align": "center",
            "padding-top":"150px",
            "padding-bottom":"150px"
        };
        var titleStyle = {
            "font-size":"22px",
            "font-weight": "bold"
        };
        var nameStyle = {
            "font-size":"15px",
            "font-weight": "bold"
        };

        return (
            <div style={containerStyle} class="filmSearch">
                <span style={titleStyle}>The Film Search Engine</span><br />
                <span style={nameStyle}> by Dr. John Hunter, Justin Eyster, and Dale Hartman<br />
              at Bucknell University</span><br />
                <br />
                Use the search box below to analyze the usage of a word/phrase <br /> within a
                     database of 90 movies released after the year 1996. <br />

                <br />

                    <div id="inputForm">
                        <InputForm/>
                    </div>

                    <br />
                    <p><a class="hyperlink" href="/moviesearch/compare">OR Graph Two Keywords/Phrases</a></p>
                    <br />
                    <p>This site is a work in progress:</p>
                    <p><a class="hyperlink" href="/moviesearch/feedback">Comments Or Suggestions? Please Contact Us</a></p>
            </div>
        );
    }
});


var FilmMetadata = React.createClass({
    render: function() {
        return (
            <a href="/moviesearch/context/168630200/624/phone/All/1996/2016/2" className="list-group-item">
                <img className="thumbnail" style={{margin: "auto"}} src={DEBUG_MODE? "/static/imageFiles/140x197.jpg" : "http://www.filmtvsearch.net/static/imageFiles/" + this.props.metadata.movieOclcId + ".gif"} width="140" height="197" />
                <h4 className="list-group-item-heading">{ this.props.metadata.movieTitle }</h4>
                <p className ="list-group-item-text">OCLC ID: { this.props.metadata.movieOclcId }</p>
                <p className ="list-group-item-text"> { this.props.metadata.dvdReleaseYear } version of { this.props.metadata.movieReleaseYear } release</p>
            </a>
        )
    }
});


var IndividualFilmResults = React.createClass({
    render: function() {
        return (
            <div className="list-group">
                <FilmMetadata metadata={this.props.individualFilm} />
                <ScreenshotWithCaption screenshotsWithCaptions={this.props.individualFilm} />
            </div>
        )
    }
});

var AllFilms = React.createClass({
    getInitialState: function() {
        return {
            films: []
        };
    },

    componentDidMount: function(){
        var that = this;
        $.getJSON('http://localhost:8080/moviesearch/phone/All/1996/2016/1', function (data: FilmResultsDataWrapperI) {
            that.setState({
                films: data.results
            });
        });
    },

    render: function() {

        return (
            <div>
                {this.state.films.map(function(object: IndividualFilmDataI)
                    {
                        return <IndividualFilmResults individualFilm={object} />;
                    }
                )}
            </div>
        );
    }
});

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={SearchContainer}>
            {/*<Route path="users" component={Users}>*/}
                {/*<Route path="/user/:userId" component={User}/>*/}
            {/*</Route>*/}
            {/*<Route path="*" component={NoMatch}/>*/}
        </Route>
        <Route path="/phone/All/1996/2016/1" component={AllFilms} />
    </Router>
), document.getElementById('appContainer'));
