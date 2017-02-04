var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./FilmMetadata", "./ScreenshotWithCaption", "react-router"], function (require, exports, React, FilmMetadata_1, ScreenshotWithCaption_1, react_router_1) {
    "use strict";
    var IndividualFilmResults = (function (_super) {
        __extends(IndividualFilmResults, _super);
        function IndividualFilmResults() {
            _super.apply(this, arguments);
        }
        IndividualFilmResults.prototype.getScreenshotsWithCaption = function () {
            var _this = this;
            return this.props.individualFilm.results.map(function (object) {
                var screenshotWithCaption = React.createElement(ScreenshotWithCaption_1.ScreenshotWithCaption, {screenshotWithCaption: object, movieOclcId: object});
                return _this.props.fromContext ? (React.createElement("a", {className: "list-group-item"}, screenshotWithCaption)) : (React.createElement(react_router_1.Link, {to: "/context/" + _this.props.individualFilm.movieOclcId + "/" + object.movieLineNumber, className: "list-group-item"}, screenshotWithCaption));
            });
        };
        IndividualFilmResults.prototype.render = function () {
            return (React.createElement("div", {className: "list-group"}, React.createElement(FilmMetadata_1.FilmMetadata, {metadata: this.props.individualFilm}), this.getScreenshotsWithCaption()));
        };
        return IndividualFilmResults;
    }(React.Component));
    exports.IndividualFilmResults = IndividualFilmResults;
});
//# sourceMappingURL=IndividualFilmResults.js.map