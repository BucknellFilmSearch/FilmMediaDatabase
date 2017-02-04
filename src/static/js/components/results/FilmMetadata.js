var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "../../app"], function (require, exports, React, app_1) {
    "use strict";
    var FilmMetadata = (function (_super) {
        __extends(FilmMetadata, _super);
        function FilmMetadata() {
            _super.apply(this, arguments);
        }
        FilmMetadata.prototype.render = function () {
            return (React.createElement("a", {className: "list-group-item"}, React.createElement("img", {className: "thumbnail", style: { margin: "auto" }, src: app_1.DEBUG_MODE ? "/static/imageFiles/140x197.jpg" : "http://www.filmtvsearch.net/static/imageFiles/" + this.props.metadata.movieOclcId + ".gif", width: "140", height: "197"}), React.createElement("h4", {className: "list-group-item-heading"}, this.props.metadata.movieTitle), React.createElement("p", {className: "list-group-item-text"}, "OCLC ID: ", this.props.metadata.movieOclcId), React.createElement("p", {className: "list-group-item-text"}, " ", this.props.metadata.dvdReleaseYear, " version of ", this.props.metadata.movieReleaseYear, " release")));
        };
        return FilmMetadata;
    }(React.Component));
    exports.FilmMetadata = FilmMetadata;
});
//# sourceMappingURL=FilmMetadata.js.map