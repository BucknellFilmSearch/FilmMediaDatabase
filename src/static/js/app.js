/// <reference path="ts/require.d.ts"/>
/// <reference path="ts/react.d.ts" />
/// <reference path="ts/react-dom.d.ts" />
/// <reference path="ts/jquery.d.ts" />
/// <reference path="ts/Interfaces.d.ts" />
/// <reference path="ts/react-router.d.ts" />
/// <reference path="ts/jquery.flot.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="react" />
/// <amd-dependency path="react-dom" />
/// <amd-dependency path="react-router" />
define(["require", "exports", "react", "react-dom", 'react-router', "./components/search/SearchContainer", "./components/results/AllFilms", "./components/results/AllContext", "jquery", "react", "react-dom", "react-router"], function (require, exports, React, ReactDOM, react_router_1, SearchContainer_1, AllFilms_1, AllContext_1) {
    "use strict";
    // Global settings
    exports.DEBUG_MODE = true;
    // http://stackoverflow.com/questions/32846337/how-to-fetch-the-new-data-in-response-to-react-router-change-with-redux
    // https://github.com/reactjs/redux/issues/227
    ReactDOM.render((React.createElement(react_router_1.Router, {history: react_router_1.hashHistory}, React.createElement(react_router_1.Route, {path: "/"}, React.createElement(react_router_1.IndexRoute, {component: SearchContainer_1.SearchContainer}), React.createElement(react_router_1.Route, {path: ":term/:genre/:startYear/:endYear", component: AllFilms_1.AllFilms}), React.createElement(react_router_1.Route, {path: "context/:oclc/:line", component: AllContext_1.AllContext})))), document.getElementById('appContainer'));
});
//# sourceMappingURL=app.js.map