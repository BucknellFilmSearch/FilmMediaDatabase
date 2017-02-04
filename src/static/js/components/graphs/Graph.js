/// <amd-dependency path="static/js/jquery.flot.min.js" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "static/js/jquery.flot.min.js"], function (require, exports, React) {
    "use strict";
    //import $ = require("jquery");
    // import * as $ from "jquery.flot.min.js";
    var Graph = (function (_super) {
        __extends(Graph, _super);
        function Graph() {
            _super.apply(this, arguments);
        }
        Graph.prototype.componentDidMount = function () {
            this.loadData(this.props.location.pathname);
        };
        Graph.prototype.loadData = function (pathname) {
            $.getJSON('http://localhost:8080/moviesearchgraph' + pathname, function (data) {
                $.plot("#placeholder", [data.results], {
                    lines: { show: true },
                    points: { show: true },
                    xaxis: { tickDecimals: 0, tickSize: 1, color: '#fff', tickColor: '#fff', font: '#fff' },
                    yaxis: { min: 0, max: 100, tickDecimals: 0, tickSize: 10, color: '#fff', tickColor: '#fff', font: '#fff' }
                });
            });
            // var d1 = [[1996,100],[1997,0],[1998,0],[1999,0],[2000,0],[2001,100],[2002,100],[2003,100],[2004,100],[2005,100],[2006,100],[2007,100],[2008,87],[2009,66],[2010,80],[2011,83],[2012,100],[2013,61],[2014,72],[2015,0],[2016,0]];
        };
        Graph.prototype.render = function () {
            return (React.createElement("div", {id: "graph"}, React.createElement("div", {id: "content"}, React.createElement("div", null, React.createElement("p", {class: "inner cover"}, React.createElement("p", {class: "lead"}, React.createElement("div", {id: "header"}, React.createElement("h4", null, "Percentage Of Movies Containing Your Search Term (By Original Release Year)")), React.createElement("div", {id: "placeholder"})))))));
        };
        return Graph;
    }(React.Component));
    exports.Graph = Graph;
});
//# sourceMappingURL=Graph.js.map