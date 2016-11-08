import * as React from "react";
import { InputForm } from "./InputForm";


export class SearchContainer extends React.Component<any, {}> {
    render() {
        var containerStyle = {
            "text-align": "center",
            "padding-top":"50px",
            "padding-bottom":"150px"
        };
        var titleStyle = {
            "font-size":"22px",
            "font-weight": "bold"
        };
        var nameStyle = {
            "font-size":"15px",
            "font-weight": "bold"
        };

        return (
            <div style={containerStyle} class="filmSearch">
                <span style={titleStyle}>The Film Search Engine</span><br />
                <span style={nameStyle}> by Dr. John Hunter, Justin Eyster, and Dale Hartman<br />
                  at Bucknell University</span><br />
                <br />
                Use the search box below to analyze the usage of a word/phrase <br /> within a
                         database of 90 movies released after the year 1996. <br />

                <br />

                <div id="inputForm">
                    <InputForm/>
                </div>

                <br />
                <p><a class="hyperlink" href="/moviesearch/compare">OR Graph Two Keywords/Phrases</a></p>
                <br />
                <p>This site is a work in progress:</p>
                <p><a class="hyperlink" href="/moviesearch/feedback">Comments Or Suggestions? Please Contact Us</a></p>
            </div>
        );
    }
}