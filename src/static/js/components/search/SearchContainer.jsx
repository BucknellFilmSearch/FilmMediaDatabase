import * as React from "react";
import TextInputModal from "./TextInputModal.jsx";
import PhotoInputModal from "./PhotoInputModal.jsx";
import Footer from "./Footer.jsx";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class SearchContainer extends React.Component {

    render() {
        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: deepOrange500
            }
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id="mainSearchCover" className="filmSearch">
                    <span id="name">The Film Search Engine</span><br />
                    <span id="mainHeader">Research films like never before.</span><br />
                    <span id="names">Find out what was happening in a film when a specific phrase was said using the text search.</span><br />
                    <span id="names">Use the color search to find scenes in films with similar colors to images you upload.</span><br />
                    <span id="names">Click on one of the options below to get started.</span><br />
                    <div id="searchIcons">
                        <div id="textIcon">
                            <TextInputModal/>
                        </div>
                        <div id="photoIcon">
                            <PhotoInputModal/>
                        </div>
                    </div>
                    <Footer/>
                </div>

            </MuiThemeProvider>
        );
    }
}