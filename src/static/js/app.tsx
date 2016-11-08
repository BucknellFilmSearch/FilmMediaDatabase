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

import { Router, Route, hashHistory } from 'react-router'


import { ScreenshotWithCaption } from "components/ScreenshotWithCaption";
import { SearchContainer } from "components/SearchContainer";

export let DEBUG_MODE:boolean = true;

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
