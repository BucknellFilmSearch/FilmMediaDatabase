import * as React from "react";
import TextInputModal from "./TextInputModal.jsx";
import PhotoInputModal from "./PhotoInputModal.jsx";
import Footer from "./Footer.jsx";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';





export default class SearchContainer extends React.Component {

    render() {

        // ?
        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: deepOrange500
            }
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id="mainSearchCover" className="filmSearch">
                    <span id="mainTitle">The Film Search Engine</span><br />
                    <span id="names"> A collaborative effort from Bucknell University</span><br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div id="textIcon">
                        <TextInputModal/>
                    </div>
                    <div id="photoIcon">
                        <PhotoInputModal/>
                    </div>

                    <div id="frontFoot">
                        <Footer/>
                    </div>

                </div>

            </MuiThemeProvider>
        );
    }
}