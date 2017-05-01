/**
 * This file adds a footer to the homepage.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


/**
 * The footer contains four buttons that link to additional information
 * and an option to provide feedback.
 */
export default class Footer extends React.Component {

    /**
     * Binds event handlers to the class and initializes state to keep track of open dialogs.
     */
    constructor() {
        super();
        this.state = {selectedIndex: -1, openProject: false, openAbout: false};
        this.handleOpenProject = this.handleOpenProject.bind(this);
        this.handleCloseProject = this.handleCloseProject.bind(this);
        this.handleOpenAbout = this.handleOpenAbout.bind(this);
        this.handleCloseAbout = this.handleCloseAbout.bind(this);
        Footer.handleOpenGithub = Footer.handleOpenGithub.bind(this);
        Footer.handleOpenFeedback = Footer.handleOpenFeedback.bind(this);
    }

    handleOpenProject(index) {
        this.setState({selectedIndex: index, openProject: true});
    };

    handleCloseProject(index) {
        this.setState({selectedIndex: index, openProject: false});
    };

    handleOpenAbout(index) {
        this.setState({selectedIndex: index, openAbout: true});
    };

    handleCloseAbout(index) {
        this.setState({selectedIndex: index, openAbout: false});
    };

    static handleOpenGithub() {
        window.open('http://www.github.com');
    };

    static handleOpenFeedback() {
        window.open('/moviesearch/feedback');
    };


    /**
     * Renders the buttons and dialogs to the homepage using Material-UI components.
     */
    render() {
        // actions for the project box modal
        const projectActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseProject}
            />
        ];

        const feedbackStyle = {
            margin: 6,
            padding: 0
        };

        // actions for the about box modal
        const aboutActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseAbout}
            />
        ];

        return (
                <div id="footer">
                    <RaisedButton label="About the Project" style={feedbackStyle} onTouchTap={() => this.handleOpenProject(0)} />
                    <RaisedButton label="About Us" style={feedbackStyle} onTouchTap={() => this.handleOpenAbout(1)} />
                    <RaisedButton label="GitHub" style={feedbackStyle} onTouchTap={() => Footer.handleOpenGithub()} />
                    <RaisedButton label="Contact Us!" style={feedbackStyle} primary={true} onTouchTap={() => Footer.handleOpenFeedback()} />


                    <Dialog
                        title="About the Project"
                        actions={projectActions}
                        modal={false}
                        open={this.state.openProject}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseProject}
                    >
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This project was started as a new way to conduct film and media studies research. By allowing
                        users to see quickly what was happening when a line of dialogue was said, they can gain deeper meaning
                        than just textual context. With the addition of being able to search for images which have a similar amount
                        of color, users can now find scenes in films which are visually similar and more easily draw conclusions
                        about similarities between the two films.
                        <br/>
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The project is still a work in progress as more films are added to the database. If there is a film
                        you would like to see added, if you have any new feature suggestions, or if you encounter any bugs, please
                        feel free to use the feedback button on this page. We will review your request and act upon it as quickly as possible.
                    </Dialog>

                    <Dialog
                        title="About Us"
                        actions={aboutActions}
                        modal={false}
                        open={this.state.openAbout}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseAbout}
                    >
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This project was started by Professor John Hunter from Bucknell University.
                        Students Dale Hartman and Justin Eyster began the project with the construction of the film database
                        and the back-end logic. The senior design team, Team Endframe, comprised of Anmol Singh, Devon Wasson, Elliot Radsliff, and Nadeem Nasimi,
                        went on the design and build the user interface.
                    </Dialog>

                </div>
        );
    }
}