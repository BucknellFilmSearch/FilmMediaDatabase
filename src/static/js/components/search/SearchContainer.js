var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./InputForm"], function (require, exports, React, InputForm_1) {
    "use strict";
    var SearchContainer = (function (_super) {
        __extends(SearchContainer, _super);
        function SearchContainer() {
            _super.apply(this, arguments);
        }
        SearchContainer.prototype.render = function () {
            return (React.createElement("div", {id: "mainSearchCover", class: "filmSearch"}, React.createElement("span", {id: "mainTitle"}, "The Film Search Engine"), React.createElement("br", null), React.createElement("span", {id: "names"}, " by Dr. John Hunter, Justin Eyster, and Dale Hartman", React.createElement("br", null), "at Bucknell University"), React.createElement("br", null), React.createElement("br", null), "Use the search box below to analyze the usage of a word/phrase ", React.createElement("br", null), " within a" + ' ' + "database of 90 movies released after the year 1996. ", React.createElement("br", null), React.createElement("br", null), React.createElement("div", {id: "inputForm"}, React.createElement(InputForm_1.InputForm, null)), React.createElement("br", null), React.createElement("p", null, React.createElement("a", {class: "hyperlink", href: "/moviesearch/compare"}, "OR Graph Two Keywords/Phrases")), React.createElement("br", null), React.createElement("p", null, "This site is a work in progress:"), React.createElement("p", null, React.createElement("a", {class: "hyperlink", href: "/moviesearch/feedback"}, "Comments Or Suggestions? Please Contact Us"))));
        };
        return SearchContainer;
    }(React.Component));
    exports.SearchContainer = SearchContainer;
});
//# sourceMappingURL=SearchContainer.js.map