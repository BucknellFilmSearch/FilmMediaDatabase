/// <reference path="ts/require.d.ts"/>
/// <reference path="ts/react.d.ts" />
/// <reference path="ts/react-dom.d.ts" />
/// <reference path="ts/jquery.d.ts" />
/// <reference path="ts/Interfaces.d.ts" />
/// <reference path="ts/react-router.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="react" />
/// <amd-dependency path="react-dom" />
/// <amd-dependency path="react-router" />

// Library imports
import $ = require("jquery");
import React = require("react");
import ReactDOM = require("react-dom");
import { Router, Route, hashHistory } from 'react-router'

// React component imports
import { SearchContainer } from "./components/search/SearchContainer";
import { AllFilms } from "./components/results/AllFilms";


// Global settings
export let DEBUG_MODE:boolean = true;


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={SearchContainer}>
            {/*<Route path="users" component={Users}>*/}
                {/*<Route path="/user/:userId" component={User}/>*/}
            {/*</Route>*/}
            {/*<Route path="*" component={NoMatch}/>*/}
        </Route>
        <Route path="/phone/All/1996/2016/1" component={AllFilms} />
    </Router>
), document.getElementById('appContainer'));
