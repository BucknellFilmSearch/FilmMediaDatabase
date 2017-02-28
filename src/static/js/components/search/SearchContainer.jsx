import * as React from "react";
import InputForm from "./InputForm.jsx";
import Footer from "./Footer.jsx";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



export default class SearchContainer extends React.Component {

    constructor() {
        super();
        this.state = {openText: false, openPhoto: false};
        this.handleOpenText = this.handleOpenText.bind(this);
        this.handleCloseText = this.handleCloseText.bind(this);
        this.handleOpenPhoto = this.handleOpenPhoto.bind(this);
        this.handleClosePhoto = this.handleClosePhoto.bind(this);
    }

    handleOpenText() {
        this.setState({openText: true});
    };

    handleCloseText() {
        this.setState({openText: false});
    };

    handleOpenPhoto() {
        this.setState({openPhoto: true});
    };

    handleClosePhoto() {
        this.setState({openPhoto: false});
    };





    render() {

        // Actions for the text box modle
        const textActions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleCloseText}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={this.handleCloseText}
        />,
        ];

        // actions for the photo box modle
        const photoActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClosePhoto}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClosePhoto}
            />,
        ];

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
                    <span id="names"> by Dr. Devon Wasson, Devon Wasson, and Devon Wasson<br />
                      at Bucknell University</span><br />
                    <br />
                    <img src="/static/imageFiles/textIcon.jpg" onTouchTap={this.handleOpenText}></img>
                    <img src="/static/imageFiles/photoIcon.jpg" onTouchTap={this.handleOpenPhoto}></img>


                    <Dialog
                        title="Dialog With Actions"
                        actions={textActions}
                        modal={false}
                        open={this.state.openText}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseText}
                    >
                        Text Test
                        <div id="inputForm">
                            <InputForm/>
                        </div>
                    </Dialog>


                    <Dialog
                        title="Dialog With Actions"
                        actions={photoActions}
                        modal={false}
                        open={this.state.openPhoto}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleClosePhoto}
                    >
                        Photo Test
                        <div id="inputForm">
                            <InputForm/>
                        </div>
                    </Dialog>


                    <div id="frontFoot">
                        <Footer/>
                    </div>

                </div>

            </MuiThemeProvider>
        );
    }
}