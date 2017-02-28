import * as React from "react";
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const projectIcon = <FontIcon className="material-icons"></FontIcon>;
const aboutUsIcon = <FontIcon className="material-icons"></FontIcon>;
const githubIcon = <FontIcon className="material-icons"></FontIcon>;
//const githubIcon = <img src="/static/imageFiles/github.jpg" style="width:25"></img>;



export default class Footer extends React.Component {

    constructor() {
        super();
        this.state = {selectedIndex: -1, openProject: false, openAbout: false, openGithub: false};
        this.handleOpenProject = this.handleOpenProject.bind(this);
        this.handleCloseProject = this.handleCloseProject.bind(this);
        this.handleOpenAbout = this.handleOpenAbout.bind(this);
        this.handleCloseAbout = this.handleCloseAbout.bind(this);
        this.handleOpenGithub = this.handleOpenGithub.bind(this);
        this.handleCloseGithub = this.handleCloseGithub.bind(this);
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

    handleOpenGithub(index) {
        this.setState({selectedIndex: index, openGithub: true});
        window.open('http://www.github.com');
    };



    render() {

        // actions for the project box modle
        const projectActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseProject}
            />
        ];

        // actions for the about box modle
        const aboutActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseAbout}
            />
        ];

        return (
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
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
                        onTouchTap={() => this.handleOpenGithub(2)}
                    />

                    <Dialog
                        title="Dialog With Actions"
                        actions={projectActions}
                        modal={false}
                        open={this.state.openProject}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseProject}
                    >
                        Text Project
                    </Dialog>

                    <Dialog
                        title="Dialog With Actions"
                        actions={aboutActions}
                        modal={false}
                        open={this.state.openAbout}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseAbout}
                    >
                        Text About Us
                    </Dialog>

                </BottomNavigation>
        );
    }
}