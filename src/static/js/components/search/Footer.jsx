import * as React from "react";
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const projectIcon = <FontIcon className="material-icons"></FontIcon>;
const aboutUsIcon = <FontIcon className="material-icons"></FontIcon>;
const githubIcon = <FontIcon className="material-icons"></FontIcon>;


export default class Footer extends React.Component {

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
            margin: 6
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
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <div id="about">
                        <BottomNavigationItem
                            label="About the Project"
                            icon={projectIcon}
                            onTouchTap={() => this.handleOpenProject(0)}
                        />
                        <BottomNavigationItem
                            label="About Us"
                            icon={aboutUsIcon}
                            onTouchTap={() => this.handleOpenAbout(1)}
                        />
                        <BottomNavigationItem
                            label="GitHub"
                            icon={githubIcon}
                            onTouchTap={() => Footer.handleOpenGithub()}
                        />
                        <RaisedButton label="Contact Us!" style={feedbackStyle} onTouchTap={() => Footer.handleOpenFeedback()} />
                    </div>


                        <Dialog
                            title="About the Project"
                            actions={projectActions}
                            modal={false}
                            open={this.state.openProject}
                            autoScrollBodyContent={true}
                            onRequestClose={this.handleCloseProject}
                        >
                            <br/>
                                This project was started as a new way to conduct film and media studies research. By allowing
                            users to see quickly what was happening when a line of dialogue was said, they can gain deeper meaning
                            than just textual context. With the addition of being able to search for images which have a similar amount
                            of color, users can now find scenes in films which are visually similar and more easily draw conclusions
                            about similarities between the two films.
                            <br/>
                            <br/>
                                The project is still a work in progress as more films are added to the database. If there is a film
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
                            This project was started by Professor John Hunter from Bucknell University.
                        Students Dale Hartman and Justi Eyster began the project with the construction of the film database
                        and the back-end logic. The senior design team, Team Endframe, comprised of Anmol Singh, Devon Wasson, Elliot Radsliff, and Nadeem Nasimi,
                        went on the design and build the user interface.
                    </Dialog>

                </BottomNavigation>
        );
    }
}