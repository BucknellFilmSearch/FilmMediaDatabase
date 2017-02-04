var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", 'react-router'], function (require, exports, React, react_router_1) {
    "use strict";
    var GENRES = ["Action", "Thriller", "Comedy", "Family", "Adventure", "Mystery", "Romance", "Sci-Fi", "Horror",
        "Drama", "Biography", "Fantasy", "Crime", "War", "Animation", "History", "Musical"];
    var EARLIEST_RELEASE_YEAR = "1996";
    var LATEST_RELEASE_YEAR = "2016";
    var InputForm = (function (_super) {
        __extends(InputForm, _super);
        function InputForm(props) {
            _super.call(this, props);
            this.handleFormSubmission = this.handleFormSubmission.bind(this);
        }
        /**
         * Retrieve form data and push the new URL to the router
         * @param event Used to prevent default form submission behavior
         */
        InputForm.prototype.handleFormSubmission = function (event) {
            // stop default form submission behavior
            event.preventDefault();
            // get the form data
            var keywordOrPhrase = this.refs.keywordOrPhrase.value;
            var genre = this.refs.genre.value;
            var earliestReleaseYear = this.refs.earliestReleaseYear.value || EARLIEST_RELEASE_YEAR;
            var latestReleaseYear = this.refs.latestReleaseYear.value || LATEST_RELEASE_YEAR;
            // TODO - sanitize url
            // update the URL
            var newPath = "/" + keywordOrPhrase + "/" + genre + "/" + earliestReleaseYear + "/" + latestReleaseYear;
            react_router_1.hashHistory.push(newPath);
        };
        InputForm.prototype.render = function () {
            var _this = this;
            return (React.createElement("form", {id: "searchCriteria", onSubmit: this.handleFormSubmission}, React.createElement("input", {onChange: function (e) { return _this.setState({ keywordOrPhrase: e.target.value }); }, ref: "keywordOrPhrase", type: "text", placeholder: "Keyword/phrase...", required: true, oninvalid: "this.setCustomValidity('A keyword or phrase is required')", oninput: "setCustomValidity('')"}), React.createElement("br", null), "Limit results to a specific genre:", React.createElement("select", {ref: "genre"}, React.createElement("option", {selected: true, value: "All"}, "All Genres"), GENRES.map(function (value) { return React.createElement("option", {value: value}, value); })), React.createElement("br", null), "Limit results to movies originally released between:", React.createElement("br", null), React.createElement("input", {ref: "earliestReleaseYear", type: "number", placeholder: EARLIEST_RELEASE_YEAR, min: EARLIEST_RELEASE_YEAR, max: LATEST_RELEASE_YEAR}), "and", React.createElement("input", {ref: "latestReleaseYear", type: "number", placeholder: LATEST_RELEASE_YEAR, min: EARLIEST_RELEASE_YEAR, max: LATEST_RELEASE_YEAR}), React.createElement("br", null), React.createElement("input", {type: "submit", className: "btn btn-primary", to: "/phone/All/1996/2016", value: "Search"})));
        };
        return InputForm;
    }(React.Component));
    exports.InputForm = InputForm;
});
//# sourceMappingURL=InputForm.js.map