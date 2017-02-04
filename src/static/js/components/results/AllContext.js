var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./IndividualFilmResults"], function (require, exports, React, IndividualFilmResults_1) {
    "use strict";
    var AllContext = (function (_super) {
        __extends(AllContext, _super);
        function AllContext() {
            _super.call(this);
            this.state = null;
        }
        AllContext.prototype.loadData = function (pathname) {
            var _this = this;
            $.getJSON('http://localhost:8080/moviesearch' + pathname, function (data) {
                _this.setState({
                    // get only the first element because only one film is returned for context
                    context: data.results[0]
                });
                console.log(_this.state.context);
            });
        };
        AllContext.prototype.componentDidMount = function () {
            this.loadData(this.props.location.pathname);
        };
        // TODO - implement this method in case new search terms are submitted and this component needs to rerendered
        AllContext.prototype.componentWillReceiveProps = function (nextProps) {
            if (this.props.location.pathname !== nextProps.location.pathname) {
                this.loadData(nextProps.props.location.pathname);
            }
        };
        AllContext.prototype.render = function () {
            if (this.state) {
                return (React.createElement("div", {className: "list-group"}, React.createElement(IndividualFilmResults_1.IndividualFilmResults, {individualFilm: this.state.context, fromContext: true})));
            }
            else {
                return (React.createElement("div", null, React.createElement("h2", null, "Loading Context...")));
            }
        };
        return AllContext;
    }(React.Component));
    exports.AllContext = AllContext;
});
//# sourceMappingURL=AllContext.js.map