/**
 * This file adds a footer to the homepage.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from 'react';
import { Dialog, FlatButton, RaisedButton, Snackbar, TextField, IconButton } from 'material-ui';
import ActionHelp from 'material-ui/svg-icons/action/help';

const styles = {
  button: {
    margin: 6,
    padding: 0
  },
  feedback: {
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    message: {
      width: '100%'
    }
  }
};

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
    this.state = {
      selectedIndex: -1,
      snackbar: {
        open: false,
        msg: ''
      },
      openProject: false,
      openAbout: false,
      openContact: false,
      contact: {
        email: '',
        msg: '',
        err: ''
      }
    };
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleOpenProject = this.handleOpenProject.bind(this);
    this.handleCloseProject = this.handleCloseProject.bind(this);
    this.handleOpenAbout = this.handleOpenAbout.bind(this);
    this.handleCloseAbout = this.handleCloseAbout.bind(this);
    this.handleOpenContact = this.handleOpenContact.bind(this);
    this.handleContactCancel = this.handleContactCancel.bind(this);
    this.handleContactSend = this.handleContactSend.bind(this);
    Footer.handleOpenGithub = Footer.handleOpenGithub.bind(this);
  }

  handleSnackbarClose() {
    this.setState({
      snackbar: {
        open: false,
        msg: ''
      }
    });
  }

  handleOpenProject() {
    this.setState({
      openProject: true
    });
  }

  handleCloseProject() {
    this.setState({
      openProject: false
    });
  }

  handleOpenAbout() {
    this.setState({
      openAbout: true
    });
  }

  handleCloseAbout() {
    this.setState({
      openAbout: false
    });
  }

  handleOpenContact() {
    this.setState({
      openContact: true
    });
  }

  handleContactCancel() {
    this.setState({
      contact: {
        email: '',
        msg: ''
      },
      openContact: false
    });
  }

  handleContactSend() {
    if (this.state.contact.msg === '') {
      this.setState({
        contact: {
          ...this.state.contact,
          err: 'Field required'
        }
      });
    } else {
      fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        body: JSON.stringify(this.state.contact),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then(res => {
        if (res.success === true) {
          console.log('Yay');
          this.setState({
            snackbar: {
              open: true,
              msg: 'Message sent successfully'
            }
          }, () => this.handleContactCancel());
        } else {
          this.setState({
            snackbar: {
              open: true,
              msg: 'Message failed to send. Please try again later'
            }
          });
        }
      });
    }
  }

  static handleOpenGithub() {
    window.open('http://www.github.com');
  }

  getDefaultActions(handler = () => {}) {
    return [
      <FlatButton key='actionClose' label='Close' primary={ true } onTouchTap={ handler } />
    ];
  }

  getContactActions() {
    return [
      <FlatButton key='actionCancel' label='Cancel' onTouchTap={ this.handleContactCancel } />,
      <FlatButton key='actionSend' label='Send' primary={ true } onTouchTap={ this.handleContactSend } />
    ];
  }

  /**
   * Renders the buttons and dialogs to the homepage using Material-UI components.
   */
  render() {
    // actions for the project box modal
    return (
      <div id='footer'>
        <RaisedButton label='About the Project' style={ styles.button } onTouchTap={ this.handleOpenProject } />
        <RaisedButton label='About Us' style={ styles.button } onTouchTap={ this.handleOpenAbout } />
        <RaisedButton label='GitHub' style={ styles.button } onTouchTap={ Footer.handleOpenGithub } />
        <RaisedButton label='Contact Us!' style={ styles.button } primary={ true } onTouchTap={ this.handleOpenContact } />
        <Dialog title='About the Project' actions={this.getDefaultActions(this.handleCloseProject)} modal={ false } open={ this.state.openProject } autoScrollBodyContent={ true }
          onRequestClose={ this.handleCloseProject }>
          <br/>      This project was started as a new way to conduct film and media studies research. By allowing users to see quickly what was happening when a line of dialogue
          was said, they can gain deeper meaning than just textual context. With the addition of being able to search for images which have a similar amount of color,
          users can now find scenes in films which are visually similar and more easily draw conclusions about similarities between the two films.
          <br/>
          <br/>      The project is still a work in progress as more films are added to the database. If there is a film you would like to see added, if you have any new feature
          suggestions, or if you encounter any bugs, please feel free to use the feedback button on this page. We will review your request and act upon it as quickly as
          possible.
        </Dialog>
        <Dialog title='About Us' actions={this.getDefaultActions(this.handleCloseAbout)} modal={ false } open={ this.state.openAbout } autoScrollBodyContent={ true } onRequestClose={ this.handleCloseAbout }>
          <br/>      This project was started by Professor John Hunter from Bucknell University. Students Dale Hartman and Justin Eyster began the project with the construction
          of the film database and the back-end logic. The senior design team, Team Endframe, comprised of Anmol Singh, Devon Wasson, Elliot Radsliff, and Nadeem Nasimi,
          went on the design and build the user interface.
        </Dialog>
        <Dialog title='Contact Us!' actions={this.getContactActions()} modal={ false } open={ this.state.openContact } autoScrollBodyContent={ true } onRequestClose={ this.handleContactCancel }>
          
            <div style={styles.feedback.form}>
              <TextField
                onChange={(event, text) => this.setState({ contact: { ...this.state.contact, email: text }})}
                value={this.state.contact.email}
                floatingLabelText="Email Address"
              />
              <IconButton
                tooltipPosition='bottom-center'
                tooltip='Enter email to hear back'
                iconStyle={{ width: 16, height: 16, color: '#bbb'}}
              >
                <ActionHelp />
              </IconButton>
            </div>
            <TextField
              onChange={(event, text) => this.setState({ contact: { ...this.state.contact, msg: text, err: '' }})}
              value={this.state.contact.msg}
              style={styles.feedback.message}
              floatingLabelText="Enter your message"
              errorText={this.state.contact.err}
              multiLine={true}
              rows={4}
            />
        </Dialog>
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.msg}
          autoHideDuration={3000}
          action="OK"
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}
