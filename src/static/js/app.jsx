// Library imports
import injectTapEventPlugin from 'react-tap-event-plugin'; // temporary dependency for material-ui
import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

// React component imports
import { SearchContainer } from "./components/search/SearchContainer.jsx";
import { ConnectedAllFilms } from "./components/results/AllFilms.jsx";

// Global settings
export let DEBUG_MODE = true;

injectTapEventPlugin();


export const reducer = (state = {search: null, context: [], sortType: 1, genre: 'All'}, action) => {
    console.log(action);
    switch (action.type) {
        case 'MOUSE_ENTER_SCREENSHOT':
            return {
                ...state,
                hoverMovieOclcId: action.movieOclcId,
                hoverMovieLineNumber: action.movieLineNumber
            };
        case 'MOUSE_LEAVE_SCREENSHOT':
            return {
                ...state,
                hoverMovieOclcId: null,
                hoverMovieLineNumber: null
            };
        case 'CLICK_SCREENSHOT':
            return {
                ...state,
                clickedScreenshotMovieOclcId: action.movieOclcId,
                currentContextMovieLineNumber: action.movieLineNumber
            };
        case 'SLIDE_SCREENSHOT':
            return {
                ...state,
                currentContextMovieLineNumber: action.newMovieLineNumber
            };
        case 'CLOSE_CONTEXT_DIALOG':
            return {
                ...state,
                clickedScreenshotMovieOclcId: null,
                currentContextMovieLineNumber: null
            };
        case 'RECEIVE_CONTEXT':
            // remap context screenshots to include key
            let newContextScreenshots = action.context.map(screenshot =>
                    ({...screenshot, key: `oclc${action.movieOclcId}line${screenshot.movieLineNumber}`})
                // filter out films that are already in the context
                ).filter(newScreenshot =>
                    state.context.find(contextScreenshot => newScreenshot.key == contextScreenshot.key) === undefined
                );

            return {
                ...state,
                context: state.context.concat(newContextScreenshots)
            };
        case 'REQUEST_NEW_SEARCH_TERM':
            return {
                ...state,
                search: {
                    status: "loading",
                    response: null
                }
            };
        case 'RECEIVE_NEW_SEARCH_TERM':

            // flatten 2D list containing screenshots for each film to a 1D list
            let newSearchResultsScreenshots = action.response.map(film =>
                    // collect screenshots from each film
                    film.results.map(screenshot =>
                        ({...screenshot, key: `oclc${film.movieOclcId}line${screenshot.movieLineNumber}`})
                    )
                // flatten list of screenshots
                ).reduce(
                    ((screenshots, filmScreenshots) => screenshots.concat(filmScreenshots)), []
                // filter out films that are already in the context
                ).filter(newScreenshot =>
                    state.context.find(contextScreenshot => newScreenshot.key == contextScreenshot.key) === undefined
                );

            return {
                ...state,
                search: {
                    status: "loaded",
                    response: action.response,
                    searchType: "text"
                },
                context: state.context.concat(newSearchResultsScreenshots)
            };
        case 'SCROLL_INTO_FILM':
            return {
                ...state,
                currentMovieOclcId: action.movieOclcId
            }
        case 'SELECT_SORT_TYPE':
            return {
                ...state,
                sortType: action.sortType
            }
        case 'SELECT_GENRE':
            return {
                ...state,
                genre: action.genre
            }
        default:
            return state
    }
};

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware) // lets us dispatch() functions
);


ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
                <IndexRoute component={SearchContainer}/>
                <Route path=":term" component={ConnectedAllFilms} />
                {/*<Route path="context/:oclc/:line" component={AllContext} />*/}
            </Route>
        </Router>
    </Provider>
), document.getElementById('appContainer'));
