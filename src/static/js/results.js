/// <reference path="require.d.ts"/>
/// <reference path="react.d.ts" />
/// <reference path="react-dom.d.ts" />
require(['require', 'react', 'react-dom', 'jquery'], function (require, React, ReactDOM, $) {
    var Greeting = React.createClass({
        render: function () {
            return (React.createElement("p", null, "Hello, University!"));
        }
    });
    var ScreenshotWithCaption = React.createClass({
        render: function () {
            console.log(this.props.screenshotsWithCaptions);
            return (React.createElement("div", null, this.props.screenshotsWithCaptions.results.map(function (object) {
                return (React.createElement("a", {href: "/moviesearch/context/168630200/659/phone/All/1996/2016/2", class: "list-group-item"}, React.createElement("img", {class: 'thumbnail', src: "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + "" + "/" + object.movieLineNumber + ".png", width: '720', height: '480'}), React.createElement("p", {class: "list-group-item-text"}, "Line #", object.movieLineNumber), React.createElement("p", {class: "list-group-item-text"}, "From ", object.movieStartTimeStamp, " to ", object.movieEndTimeStamp), React.createElement("p", {class: "list-group-item-text"}, " ", object.movieLineText, " ")));
            })));
        }
    });
    var FilmMetadata = React.createClass({
        render: function () {
            return (React.createElement("a", {href: "/moviesearch/context/168630200/624/phone/All/1996/2016/2", class: "list-group-item"}, React.createElement("img", {class: "thumbnail", src: "http://www.filmtvsearch.net/static/imageFiles/" + this.props.metadata.movieOclcId + ".gif", width: "140", height: "197"}), React.createElement("h4", {class: "list-group-item-heading"}, this.props.metadata.movieTitle), React.createElement("p", {class: "list-group-item-text"}, "OCLC ID: ", this.props.metadata.movieOclcId), React.createElement("p", {class: "list-group-item-text"}, " ", this.props.metadata.dvdReleaseYear, " version of ", this.props.metadata.movieReleaseYear, " release")));
        }
    });
    var IndividualFilmResults = React.createClass({
        render: function () {
            return (React.createElement("div", {class: "list-group"}, React.createElement(FilmMetadata, {metadata: this.props.individualFilm}), React.createElement(ScreenshotWithCaption, {screenshotsWithCaptions: this.props.individualFilm})));
        }
    });
    var AllFilms = React.createClass({
        getInitialState: function () {
            return {
                films: []
            };
        },
        componentDidMount: function () {
            var that = this;
            var filmJSON = $.getJSON('http://localhost:8080/moviesearch/phone/All/1996/2016/1', function (data) {
                that.setState({
                    films: data.results
                });
                console.log(data);
            });
        },
        render: function () {
            return (React.createElement("div", null, this.state.films.map(function (object) {
                return React.createElement(IndividualFilmResults, {individualFilm: object});
            })));
        }
    });
    ReactDOM.render(React.createElement(AllFilms, null), document.getElementById('filmData'));
});
//# sourceMappingURL=results.js.map