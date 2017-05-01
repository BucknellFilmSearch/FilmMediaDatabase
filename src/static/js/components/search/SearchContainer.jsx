/**
 * This file includes components from all other files from the search folder to render the homepage.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */


import * as React from "react";
import TextInputModal from "./TextInputModal.jsx";
import PhotoInputModal from "./PhotoInputModal.jsx";
import Footer from "./Footer.jsx";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


/**
 * Renders the homepage for the web site. Includes TextInputModal and PhotoInputModal.
 */
export default class SearchContainer extends React.Component {

    render() {
        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: deepOrange500
            }
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id="frontPage">
                    <div id="mainHeader">
                        <span>Research films like never before.</span><br />
                    </div>
                    <div id="subText" className="filmSearch">
                        <span>Find out what was happening in a film when a specific phrase was said using the text search.</span><br />
                        <span>Use the color search to find scenes in films with similar colors to images you upload.</span><br />
                        <span>Click on one of the options below to get started.</span><br />
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
                    <img src="/static/imageFiles/logo.jpg" id="logo" />
                </div>
            </MuiThemeProvider>
        );
    }
}