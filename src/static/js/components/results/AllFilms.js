var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./IndividualFilmResults", "../graphs/Graph"], function (require, exports, React, IndividualFilmResults_1, Graph_1) {
    "use strict";
    var AllFilms = (function (_super) {
        __extends(AllFilms, _super);
        function AllFilms() {
            _super.call(this);
            this.state = null;
        }
        AllFilms.prototype.loadData = function (pathname) {
            var _this = this;
            $.getJSON('http://localhost:8080/moviesearch' + pathname, function (data) {
                _this.setState({
                    films: data.results
                });
            });
        };
        AllFilms.prototype.componentDidMount = function () {
            this.loadData(this.props.location.pathname);
        };
        // TODO - implement this method in case new search terms are submitted and this component needs to rerendered
        AllFilms.prototype.componentWillReceiveProps = function (nextProps) {
            if (this.props.location.pathname !== nextProps.location.pathname) {
                this.loadData(nextProps.props.location.pathname);
            }
        };
        AllFilms.prototype.render = function () {
            if (this.state) {
                return (React.createElement("div", null, React.createElement(Graph_1.Graph, null), this.state.films.map(function (object) {
                    return React.createElement(IndividualFilmResults_1.IndividualFilmResults, {individualFilm: object});
                })));
            }
            else {
                return (React.createElement("div", null, React.createElement("h2", null, "Loading Relevant Films...")));
            }
        };
        return AllFilms;
    }(React.Component));
    exports.AllFilms = AllFilms;
});
//# sourceMappingURL=AllFilms.js.map