// Library imports
import * as injectTapEventPlugin from 'react-tap-event-plugin'; // temporary dependency for material-ui
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

// React component imports
import { SearchContainer } from "./components/search/SearchContainer";
import { AllFilms } from "./components/results/AllFilms";
import { AllContext } from "./components/results/AllContext";

// Global settings
export let DEBUG_MODE:boolean = true;

injectTapEventPlugin();

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
