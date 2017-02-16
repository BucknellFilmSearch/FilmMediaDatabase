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
import { AllContext } from "./components/results/AllContext.jsx";

// Global settings
export let DEBUG_MODE = true;

injectTapEventPlugin();


export const reducer = (state = {search: null, context: []}, action) => {
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
        case 'CLOSE_CONTEXT_DIALOG':
            return {
                ...state,
                clickedScreenshotMovieOclcId: null,
                clickedScreenshotMovieLineNumber: null
            };
        case 'RECEIVE_CONTEXT':
            // // if new search is being requested, context is no longer relevant
            // if (state.search.status == "loading") {
            //     return {
            //         ...state
            //     }
            // }state.search.find())
            //
            // let currentFilm = state.search.response.
            //
            // // filter out elements already loaded into the context
            // let filteredContext = action.context.filter(newScreenshot =>
            //     state.search.response.find(existingScreenshot =>
            //         newScreenshot.movieLineNumber == existingScreenshot.movieLineNumber
            //     )
            // );
            //
            // console.log(filteredContext)

            // return new context
            return {
                ...state
            };
        case 'REQUEST_NEW_SEARCH_TERM':
            return {
                ...state,
                search: {
                    "status": "loading",
                    "response": null
                }
            };
        case 'RECEIVE_NEW_SEARCH_TERM':

            // find films that are already in the context list and add new screenshots
            let newContext = state.context.map(contextFilm => {
                    // search for current context film in response object
                    let filmInResponse = action.response.find(
                        searchResultsFilm => searchResultsFilm.movieOclcId == contextFilm.movieOclcId
                    );

                    // return unmodified context film if the film is not in the response; otherwise add new screenshots
                    return filmInResponse == undefined ?
                        // TODO - remove duplicates here from concat
                        contextFilm : contextFilm.screenshots.concat(filmInResponse.results);
                }
            )
            // append films to the context list that aren't already in the context list
            .concat(
                // filter films that are not in the context
                action.response.filter(searchResultsFilm =>
                    state.context.find(contextFilm => contextFilm.oclc == searchResultsFilm.movieOclcId) === undefined
                )
                // remap these films so they can be added to the context list
                .map(filmToAddToContext => ({
                    movieOclcId: filmToAddToContext.movieOclcId,
                    screenshots: filmToAddToContext.results
                }))
            );

            return {
                ...state,
                search: {
                    "status": "loaded",
                    "response": action.response
                    //     .map((film) => ({
                    //     ...film,
                    //     // initialize context to be the film results, load in other context as needed
                    //     context: [...film.results]
                    // }))
                },
                context: contextWithNewFilms
            };
        case 'SCROLL_INTO_FILM':
            return {
                ...state,
                currentMovieOclcId: action.movieOclcId
            }
        default:
            return state
    }
};

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware) // lets us dispatch() functions
);

// http://stackoverflow.com/questions/32846337/how-to-fetch-the-new-data-in-response-to-react-router-change-with-redux
// https://github.com/reactjs/redux/issues/227
ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
                <IndexRoute component={SearchContainer}/>
                <Route path=":term/:genre/:startYear/:endYear" component={ConnectedAllFilms} />
                <Route path="context/:oclc/:line" component={AllContext} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('appContainer'));
