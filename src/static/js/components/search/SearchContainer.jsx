import * as React from "react";
import { InputForm } from "./InputForm";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export class SearchContainer extends React.Component<any, {}> {

    handleTap = () => {
        alert('tap!');
    }

    render() {

        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: deepOrange500
            }
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id="mainSearchCover" className="filmSearch">
                    <span id="mainTitle">The Film Search Engine</span><br />
                    <span id="names"> by Dr. John Hunter, Justin Eyster, and Dale Hartman<br />
                      at Bucknell University</span><br />
                    <br />
                    Use the search box below to analyze the usage of a word/phrase <br /> within a
                             database of 90 movies released after the year 1996. <br />

                    <br />

                    <div id="inputForm">
                        <InputForm/>
                    </div>

                    <br />
                    <p><a className="hyperlink" href="/moviesearch/compare">OR Graph Two Keywords/Phrases</a></p>
                    <br />
                    <p>This site is a work in progress:</p>
                    <p><a className="hyperlink" href="/moviesearch/feedback">Comments Or Suggestions? Please Contact Us</a></p>
                </div>
            </MuiThemeProvider>
        );
    }
}