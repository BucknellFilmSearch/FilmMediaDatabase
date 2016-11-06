/// <reference path="require.d.ts"/>
/// <reference path="react.d.ts" />
/// <reference path="react-dom.d.ts" />

require(['require', 'react', 'react-dom', 'jquery'], function(require, React, ReactDOM, $) {
    var DEBUG_MODE = true;

    var ScreenshotWithCaption = React.createClass({
       render: function() {
           var movieOclcId = this.props.screenshotsWithCaptions.movieOclcId;
            return (
                <div>
                    {this.props.screenshotsWithCaptions.results.map(function(object)
                        {
                            return (<a href="/moviesearch/context/168630200/659/phone/All/1996/2016/2" className="list-group-item">
                                <img className='thumbnail' style={{margin: "auto"}} src={DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + object.movieLineNumber + ".png"} width='720' height='480' />
                                <p className="list-group-item-text">Line #{ object.movieLineNumber }</p>
                                <p className="list-group-item-text">From { object.movieStartTimeStamp } to { object.movieEndTimeStamp }</p>
                                <p className="list-group-item-text"> { object.movieLineText } </p>
                            </a>)
                        }
                    )}
                </div>
            )
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
            $.getJSON('http://localhost:8080/moviesearch/phone/All/1996/2016/1', function (data) {
                that.setState({
                    films: data.results
                });
            });
        },

        render: function() {

            return (
                <div>
                    {this.state.films.map(function(object)
                        {
                            return <IndividualFilmResults individualFilm={object} />;
                        }
                    )}
                </div>
            );
        }
    });

    ReactDOM.render(
        <AllFilms />,
        document.getElementById('filmData')
    );
});

