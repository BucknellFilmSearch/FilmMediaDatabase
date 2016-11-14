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

// Library imports
import $ = require("jquery");
import React = require("react");
import ReactDOM = require("react-dom");
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

// React component imports
import { SearchContainer } from "./components/search/SearchContainer";
import { AllFilms } from "./components/results/AllFilms";
import { AllContext } from "./components/results/AllContext";


// Global settings
export let DEBUG_MODE:boolean = true;


// http://stackoverflow.com/questions/32846337/how-to-fetch-the-new-data-in-response-to-react-router-change-with-redux
// https://github.com/reactjs/redux/issues/227
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={SearchContainer}/>
            <Route path=":term/:genre/:startYear/:endYear" component={AllFilms} />
            <Route path="context/:oclc/:line" component={AllContext} />
        </Route>
    </Router>
), document.getElementById('appContainer'));
