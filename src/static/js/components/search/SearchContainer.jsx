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

    constructor() {
        super();
        this.state = {
            textSearchModalOpen: false,
        };
    }

    openTextSearchModal() {
        console.log(1);
        this.setState({textSearchModalOpen: true})
        console.log(2);
    }

    closeTextSearchModal() {
        this.setState({textSearchModalOpen: false})
    }

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
                        <div style={{ 'marginTop':'30px', 'height': '150px' }} >
                            <img src='/static/imageFiles/logo.svg' id="logo" fill={'blue'} style={{ 'height':'150px', 'position':'relative' }} />
                        </div>
                        Research films like never before. 
                    </div>
                    <div id="subText" className="filmSearch">
                        <span>Find out what was happening in a film when a specific phrase was said using the text search.</span><br />
                        <span>Use the color search to find scenes in films with similar colors to images you upload.</span><br />
                        <span>Click on one of the options below to get started.</span><br />
                        <div id="searchIcons">
                            <div id="textIcon">
                                <svg height="200" width="200" onTouchTap={() => this.openTextSearchModal()}>
                                    <text x="0" y="100" fontSize="160px" >Aa</text>
                                    <text x="0" y="170" fontSize="30px" >Text Search</text>
                                </svg>
                                <TextInputModal open={this.state.textSearchModalOpen}
                                  closeFcn={() =>this.closeTextSearchModal()}
                                  />
                            </div>
                            <div id="photoIcon">
                                <PhotoInputModal/>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                    
                </div>
            </MuiThemeProvider>
        );
    }
}